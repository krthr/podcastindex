import { describe, it, expect, vi, afterEach } from "vitest";
import { PodcastIndex } from "../../src/client.js";

const valueResponse = {
  status: "true",
  value: {
    model: { type: "lightning", method: "keysend" },
    destinations: [{ name: "Host", address: "abc", split: 90 }],
  },
  description: "Found",
};

const batchResponse = {
  status: "true",
  feeds: [
    { id: 1, url: "https://x.com/f.xml", value: { model: {}, destinations: [] } },
  ],
  description: "Found",
};

function mockFetch(body: unknown) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), { status: 200 }),
  );
}

describe("ValueResource", () => {
  afterEach(() => vi.restoreAllMocks());

  // No auth required — create client without credentials
  const client = new PodcastIndex();

  it("byFeedId (no auth)", async () => {
    const spy = mockFetch(valueResponse);
    const result = await client.value.byFeedId({ id: 75075 });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/value/byfeedid");

    const headers = spy.mock.calls[0][1]?.headers as Record<string, string>;
    expect(headers["X-Auth-Key"]).toBeUndefined();
    expect(result.value.model?.type).toBe("lightning");
  });

  it("byFeedUrl (no auth)", async () => {
    const spy = mockFetch(valueResponse);
    await client.value.byFeedUrl({ url: "https://example.com/feed.xml" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/value/byfeedurl");
  });

  it("byPodcastGuid (no auth)", async () => {
    const spy = mockFetch(valueResponse);
    await client.value.byPodcastGuid({ guid: "abc-123" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/value/bypodcastguid");
  });

  it("byEpisodeGuid (no auth)", async () => {
    const spy = mockFetch(valueResponse);
    await client.value.byEpisodeGuid({ guid: "ep-123" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/value/byepisodeguid");
  });

  it("batchByFeedId (no auth)", async () => {
    const spy = mockFetch(batchResponse);
    const result = await client.value.batchByFeedId({ id: "1,2,3" });

    const url = new URL(spy.mock.calls[0][0] as string);
    expect(url.pathname).toBe("/api/1.0/value/batch/byfeedid");
    expect(result.feeds).toHaveLength(1);
  });
});
