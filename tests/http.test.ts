import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { z } from "zod";
import { HttpClient } from "../src/http.js";
import { AuthProvider } from "../src/auth.js";
import { PodcastIndexError } from "../src/errors.js";

const testSchema = z.object({
  status: z.string(),
  data: z.string(),
});

function mockFetch(body: unknown, status = 200) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

describe("HttpClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("makes GET request with correct URL and params", async () => {
    const spy = mockFetch({ status: "true", data: "hello" });
    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
    });

    await client.request(
      { path: "/search/byterm", params: { q: "test", max: 10 } },
      testSchema,
    );

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/search/byterm");
    expect(url.searchParams.get("q")).toBe("test");
    expect(url.searchParams.get("max")).toBe("10");
  });

  it("includes auth headers when auth is true", async () => {
    const spy = mockFetch({ status: "true", data: "ok" });
    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "mykey", secret: "mysecret" }),
      userAgent: "test/1.0",
    });

    await client.request({ path: "/test" }, testSchema);

    const headers = spy.mock.calls[0][1]?.headers as Record<string, string>;
    expect(headers["X-Auth-Key"]).toBe("mykey");
    expect(headers["X-Auth-Date"]).toBeDefined();
    expect(headers["Authorization"]).toBeDefined();
    expect(headers["User-Agent"]).toBe("test/1.0");
  });

  it("omits auth headers when auth is false", async () => {
    const spy = mockFetch({ status: "true", data: "ok" });
    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      userAgent: "test/1.0",
    });

    await client.request({ path: "/test", auth: false }, testSchema);

    const headers = spy.mock.calls[0][1]?.headers as Record<string, string>;
    expect(headers["X-Auth-Key"]).toBeUndefined();
    expect(headers["User-Agent"]).toBe("test/1.0");
  });

  it("throws PodcastIndexError when auth required but no credentials", async () => {
    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      userAgent: "test/1.0",
    });

    await expect(
      client.request({ path: "/test" }, testSchema),
    ).rejects.toThrow(PodcastIndexError);
  });

  it("throws PodcastIndexError on non-ok response", async () => {
    mockFetch({ description: "Not found", code: 404 }, 404);
    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
    });

    await expect(
      client.request({ path: "/test" }, testSchema),
    ).rejects.toThrow(PodcastIndexError);
  });

  it("validates response with Zod schema", async () => {
    mockFetch({ status: "true", data: "valid" });
    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
    });

    const result = await client.request({ path: "/test" }, testSchema);
    expect(result).toEqual({ status: "true", data: "valid" });
  });

  it("throws ZodError on schema mismatch", async () => {
    mockFetch({ wrong: "shape" });
    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
    });

    await expect(
      client.request({ path: "/test" }, testSchema),
    ).rejects.toThrow();
  });

  it("skips undefined and null params", async () => {
    const spy = mockFetch({ status: "true", data: "ok" });
    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
    });

    await client.request(
      { path: "/test", params: { a: "yes", b: undefined, c: null } },
      testSchema,
    );

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.searchParams.get("a")).toBe("yes");
    expect(url.searchParams.has("b")).toBe(false);
    expect(url.searchParams.has("c")).toBe(false);
  });
});
