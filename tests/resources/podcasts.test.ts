import { describe, it, expect, vi, afterEach } from "vitest";
import { PodcastIndex } from "../../src/client.js";

const singleFeedResponse = {
  status: "true",
  feed: { id: 75075, title: "No Agenda", url: "https://example.com/feed.xml" },
  description: "Found",
};

const multiFeedResponse = {
  status: "true",
  feeds: [
    { id: 1, title: "Feed 1", url: "https://example.com/1.xml" },
    { id: 2, title: "Feed 2", url: "https://example.com/2.xml" },
  ],
  count: 2,
  description: "Found",
};

const trendingResponse = {
  status: "true",
  feeds: [
    { id: 1, title: "Trending", url: "https://example.com/t.xml", trendScore: 100 },
  ],
  count: 1,
  description: "Found",
};

function mockFetch(body: unknown) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), { status: 200 }),
  );
}

describe("PodcastsResource", () => {
  afterEach(() => vi.restoreAllMocks());

  const client = new PodcastIndex({ key: "k", secret: "s" });

  it("byFeedId", async () => {
    const spy = mockFetch(singleFeedResponse);
    const result = await client.podcasts.byFeedId({ id: 75075 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/podcasts/byfeedid");
    expect(url.searchParams.get("id")).toBe("75075");
    expect(result.feed.id).toBe(75075);
  });

  it("byFeedIds (batch)", async () => {
    const spy = mockFetch(multiFeedResponse);
    const result = await client.podcasts.byFeedIds({ id: "1,2" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.searchParams.get("id")).toBe("1,2");
    expect(result.feeds).toHaveLength(2);
  });

  it("byFeedUrl", async () => {
    const spy = mockFetch(singleFeedResponse);
    await client.podcasts.byFeedUrl({ url: "https://example.com/feed.xml" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/podcasts/byfeedurl");
  });

  it("byItunesId", async () => {
    const spy = mockFetch(singleFeedResponse);
    await client.podcasts.byItunesId({ id: 12345 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/podcasts/byitunesid");
  });

  it("byGuid", async () => {
    const spy = mockFetch(singleFeedResponse);
    await client.podcasts.byGuid({ guid: "abc-123" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/podcasts/byguid");
  });

  it("byTag", async () => {
    const spy = mockFetch(multiFeedResponse);
    await client.podcasts.byTag();

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/podcasts/bytag");
  });

  it("byMedium", async () => {
    const spy = mockFetch(multiFeedResponse);
    await client.podcasts.byMedium({ medium: "music" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/podcasts/bymedium");
    expect(url.searchParams.get("medium")).toBe("music");
  });

  it("trending", async () => {
    const spy = mockFetch(trendingResponse);
    const result = await client.podcasts.trending({ max: 10, lang: "en" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/podcasts/trending");
    expect(result.feeds[0].trendScore).toBe(100);
  });

  it("dead", async () => {
    const spy = mockFetch(multiFeedResponse);
    await client.podcasts.dead();

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/podcasts/dead");
  });
});
