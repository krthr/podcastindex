import { describe, it, expect, vi, afterEach } from "vitest";
import { PodcastIndex } from "../../src/client.js";

const baseFeed = {
  id: 1,
  title: "Test Podcast",
  url: "https://example.com/feed.xml",
};

const baseResponse = {
  status: "true",
  description: "Found",
  feeds: [baseFeed],
  count: 1,
};

const personResponse = {
  status: "true",
  description: "Found",
  items: [{ id: 1, title: "Test Episode" }],
  count: 1,
};

function mockFetch(body: unknown) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

describe("SearchResource", () => {
  afterEach(() => vi.restoreAllMocks());

  const client = new PodcastIndex({ key: "k", secret: "s" });

  it("byTerm calls correct endpoint", async () => {
    const spy = mockFetch(baseResponse);
    const result = await client.search.byTerm({ q: "javascript" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/search/byterm");
    expect(url.searchParams.get("q")).toBe("javascript");
    expect(result.feeds).toHaveLength(1);
    expect(result.count).toBe(1);
  });

  it("byTitle calls correct endpoint", async () => {
    const spy = mockFetch(baseResponse);
    await client.search.byTitle({ q: "tech" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/search/bytitle");
    expect(url.searchParams.get("q")).toBe("tech");
  });

  it("byPerson calls correct endpoint", async () => {
    const spy = mockFetch(personResponse);
    const result = await client.search.byPerson({ q: "adam curry" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/search/byperson");
    expect(result.items).toHaveLength(1);
  });

  it("musicByTerm calls correct endpoint", async () => {
    const spy = mockFetch(baseResponse);
    await client.search.musicByTerm({ q: "jazz" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/search/music/byterm");
  });

  it("musicByTitle calls correct endpoint", async () => {
    const spy = mockFetch(baseResponse);
    await client.search.musicByTitle({ q: "blues" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/search/music/bytitle");
  });

  it("musicByPerson calls correct endpoint", async () => {
    const spy = mockFetch(personResponse);
    await client.search.musicByPerson({ q: "miles" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/search/music/byperson");
  });

  it("passes optional params", async () => {
    const spy = mockFetch(baseResponse);
    await client.search.byTerm({ q: "test", max: 5, fulltext: true, val: "lightning" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.searchParams.get("max")).toBe("5");
    expect(url.searchParams.get("fulltext")).toBe("true");
    expect(url.searchParams.get("val")).toBe("lightning");
  });
});
