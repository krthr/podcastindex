import { describe, it, expect, vi, afterEach } from "vitest";
import { PodcastIndex } from "../../src/client.js";

function mockFetch(body: unknown) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), { status: 200 }),
  );
}

describe("RecentResource", () => {
  afterEach(() => vi.restoreAllMocks());

  const client = new PodcastIndex({ key: "k", secret: "s" });

  it("episodes", async () => {
    const spy = mockFetch({
      status: "true",
      items: [{ id: 1, title: "Ep" }],
      count: 1,
    });
    const result = await client.recent.episodes({ max: 5 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/recent/episodes");
    expect(result.items).toHaveLength(1);
  });

  it("feeds", async () => {
    const spy = mockFetch({
      status: "true",
      feeds: [{ id: 1, url: "https://x.com/f.xml", title: "F" }],
      count: 1,
    });
    await client.recent.feeds({ max: 10 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/recent/feeds");
  });

  it("newFeeds", async () => {
    const spy = mockFetch({
      status: "true",
      feeds: [{ id: 1, url: "https://x.com/f.xml" }],
      count: 1,
    });
    await client.recent.newFeeds();

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/recent/newfeeds");
  });

  it("data", async () => {
    const spy = mockFetch({ status: "true", data: {} });
    await client.recent.data();

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/recent/data");
  });

  it("soundbites", async () => {
    const spy = mockFetch({ status: "true", items: [], count: 0 });
    await client.recent.soundbites();

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/recent/soundbites");
  });

  it("newValueFeeds", async () => {
    const spy = mockFetch({
      status: "true",
      feeds: [{ id: 1, title: "V", url: "https://x.com/v.xml" }],
      count: 1,
    });
    await client.recent.newValueFeeds();

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/recent/newvaluefeeds");
  });
});
