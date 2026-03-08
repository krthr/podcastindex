import { describe, it, expect, vi, afterEach } from "vitest";
import { PodcastIndex } from "../../src/client.js";

const episodesResponse = {
  status: "true",
  items: [{ id: 1, title: "Episode 1" }, { id: 2, title: "Episode 2" }],
  count: 2,
  description: "Found",
};

const episodeResponse = {
  status: "true",
  episode: { id: 1, title: "Episode 1" },
  description: "Found",
};

const randomResponse = {
  status: "true",
  episodes: [{ id: 1, title: "Random Episode" }],
  count: 1,
  description: "Found",
};

function mockFetch(body: unknown) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), { status: 200 }),
  );
}

describe("EpisodesResource", () => {
  afterEach(() => vi.restoreAllMocks());

  const client = new PodcastIndex({ key: "k", secret: "s" });

  it("byFeedId", async () => {
    const spy = mockFetch(episodesResponse);
    const result = await client.episodes.byFeedId({ id: 75075 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/episodes/byfeedid");
    expect(result.items).toHaveLength(2);
  });

  it("byFeedUrl", async () => {
    const spy = mockFetch(episodesResponse);
    await client.episodes.byFeedUrl({ url: "https://example.com/feed.xml" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/episodes/byfeedurl");
  });

  it("byPodcastGuid", async () => {
    const spy = mockFetch(episodesResponse);
    await client.episodes.byPodcastGuid({ guid: "abc-123" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/episodes/bypodcastguid");
  });

  it("byItunesId", async () => {
    const spy = mockFetch(episodesResponse);
    await client.episodes.byItunesId({ id: 12345 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/episodes/byitunesid");
  });

  it("byId", async () => {
    const spy = mockFetch(episodeResponse);
    const result = await client.episodes.byId({ id: 1 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/episodes/byid");
    expect(result.episode.id).toBe(1);
  });

  it("byGuid", async () => {
    const spy = mockFetch(episodeResponse);
    await client.episodes.byGuid({ guid: "ep-guid-123" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/episodes/byguid");
  });

  it("live", async () => {
    const spy = mockFetch(episodesResponse);
    await client.episodes.live({ max: 5 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/episodes/live");
  });

  it("random", async () => {
    const spy = mockFetch(randomResponse);
    const result = await client.episodes.random({ max: 1, lang: "en" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/episodes/random");
    expect(result.episodes).toHaveLength(1);
  });
});
