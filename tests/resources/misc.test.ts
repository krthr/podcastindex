import { describe, it, expect, vi, afterEach } from "vitest";
import { PodcastIndex } from "../../src/client.js";
import { PodcastIndexError } from "../../src/errors.js";

function mockFetch(body: unknown) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), { status: 200 }),
  );
}

describe("StatsResource", () => {
  afterEach(() => vi.restoreAllMocks());

  const client = new PodcastIndex({ key: "k", secret: "s" });

  it("current", async () => {
    const spy = mockFetch({
      status: "true",
      stats: {
        feedCountTotal: 4300000,
        episodeCountTotal: 130000000,
        feedsWithNewEpisodes: 100000,
      },
    });
    const result = await client.stats.current();

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/stats/current");
    expect(result.stats.feedCountTotal).toBe(4300000);
  });
});

describe("CategoriesResource", () => {
  afterEach(() => vi.restoreAllMocks());

  const client = new PodcastIndex({ key: "k", secret: "s" });

  it("list", async () => {
    const spy = mockFetch({
      status: "true",
      feeds: [
        { id: 1, name: "Arts" },
        { id: 2, name: "Business" },
      ],
      count: 2,
    });
    const result = await client.categories.list();

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/categories/list");
    expect(result.feeds).toHaveLength(2);
  });
});

describe("HubResource", () => {
  afterEach(() => vi.restoreAllMocks());

  const client = new PodcastIndex();

  it("pubNotify (no auth)", async () => {
    const spy = mockFetch({ status: "true", description: "OK" });
    await client.hub.pubNotify({ id: 75075 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/hub/pubnotify");

    const headers = spy.mock.calls[0][1]?.headers as Record<string, string>;
    expect(headers["X-Auth-Key"]).toBeUndefined();
  });
});

describe("AddResource", () => {
  afterEach(() => vi.restoreAllMocks());

  const client = new PodcastIndex({ key: "k", secret: "s" });

  it("byFeedUrl", async () => {
    const spy = mockFetch({
      status: "true",
      feedId: 999,
      description: "Added",
    });
    const result = await client.add.byFeedUrl({
      url: "https://example.com/new.xml",
    });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/add/byfeedurl");
    expect(result.feedId).toBe(999);
  });

  it("batchByFeedUrl", async () => {
    const spy = mockFetch({
      status: "true",
      feeds: [{ feedId: 1, url: "https://x.com/a.xml" }],
    });
    await client.add.batchByFeedUrl({
      url: "https://x.com/a.xml|https://x.com/b.xml",
    });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/add/batch/byfeedurl");
  });
});

describe("PodcastIndex client", () => {
  afterEach(() => vi.restoreAllMocks());

  it("throws when calling auth endpoint without credentials", async () => {
    const client = new PodcastIndex();
    await expect(client.search.byTerm({ q: "test" })).rejects.toThrow(
      PodcastIndexError,
    );
  });

  it("has all resource namespaces", () => {
    const client = new PodcastIndex({ key: "k", secret: "s" });
    expect(client.search).toBeDefined();
    expect(client.podcasts).toBeDefined();
    expect(client.episodes).toBeDefined();
    expect(client.recent).toBeDefined();
    expect(client.value).toBeDefined();
    expect(client.stats).toBeDefined();
    expect(client.categories).toBeDefined();
    expect(client.hub).toBeDefined();
    expect(client.add).toBeDefined();
  });
});
