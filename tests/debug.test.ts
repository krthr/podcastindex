import { describe, it, expect, vi, afterEach } from "vitest";
import { z } from "zod";
import { HttpClient } from "../src/http.js";
import { AuthProvider } from "../src/auth.js";

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

describe("Debug logging", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs request and response when debug is enabled", async () => {
    mockFetch({ status: "true", data: "ok" });
    const logger = vi.fn();

    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
      debug: { logger },
    });

    await client.request({ path: "/test" }, testSchema);

    expect(logger).toHaveBeenCalledTimes(2);
    expect(logger.mock.calls[0][0]).toBe("[request]");
    expect(logger.mock.calls[1][0]).toBe("[response] success");
  });

  it("logs error responses", async () => {
    mockFetch({ description: "Not found", code: 404 }, 404);
    const logger = vi.fn();

    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
      debug: { logger },
    });

    await expect(
      client.request({ path: "/test" }, testSchema),
    ).rejects.toThrow();

    expect(logger).toHaveBeenCalledTimes(2);
    expect(logger.mock.calls[1][0]).toBe("[response] error");
  });

  it("does not log when debug is not set", async () => {
    const spy = vi.spyOn(console, "error");
    mockFetch({ status: "true", data: "ok" });

    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
    });

    await client.request({ path: "/test" }, testSchema);

    expect(spy).not.toHaveBeenCalled();
  });

  it("can disable request logging while keeping response logging", async () => {
    mockFetch({ status: "true", data: "ok" });
    const logger = vi.fn();

    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
      debug: { request: false, logger },
    });

    await client.request({ path: "/test" }, testSchema);

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger.mock.calls[0][0]).toBe("[response] success");
  });

  it("sanitizes Authorization header in request logs", async () => {
    mockFetch({ status: "true", data: "ok" });
    const logger = vi.fn();

    const client = new HttpClient({
      baseUrl: "https://api.example.com/api/1.0",
      auth: new AuthProvider({ key: "k", secret: "s" }),
      userAgent: "test/1.0",
      debug: { response: false, logger },
    });

    await client.request({ path: "/test" }, testSchema);

    expect(logger).toHaveBeenCalledTimes(1);
    const loggedHeaders = logger.mock.calls[0][1].headers;
    expect(loggedHeaders["Authorization"]).toMatch(/^.{8}\.\.\.$/);
  });

  it("AuthProvider logs when debug logger is set", () => {
    const logger = vi.fn();
    const auth = new AuthProvider({ key: "TESTKEY", secret: "TESTSECRET" });
    auth.setDebugLogger(logger);

    auth.getHeaders();

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger.mock.calls[0][0]).toBe("[auth] generating headers");
    expect(logger.mock.calls[0][1]).toHaveProperty("key", "TESTKEY");
    expect(logger.mock.calls[0][1]).toHaveProperty("hash");
    expect(logger.mock.calls[0][1]).toHaveProperty("timestamp");
  });

  it("AuthProvider does not log without debug logger", () => {
    const spy = vi.spyOn(console, "error");
    const auth = new AuthProvider({ key: "k", secret: "s" });

    auth.getHeaders();

    expect(spy).not.toHaveBeenCalled();
  });
});
