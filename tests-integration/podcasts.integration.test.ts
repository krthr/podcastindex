import { beforeAll, describe, expect, it } from "vitest";
import {
  deadResponseSchema,
  podcastResponseSchema,
  podcastsResponseSchema,
  trendingResponseSchema,
} from "../src/schemas/responses.js";
import { fetchRaw, makeClient } from "./helpers/client.js";
import { assertNoDrift } from "./helpers/drift.js";
import {
  resolveFixtures,
  STATIC_FIXTURES,
  type ResolvedFixtures,
} from "./helpers/fixtures.js";

describe("podcasts", () => {
  const client = makeClient();
  let f: ResolvedFixtures;

  beforeAll(async () => {
    f = await resolveFixtures();
  });

  it("byFeedId: smoke", async () => {
    const res = await client.podcasts.byFeedId({ id: f.batmanFeedId });
    expect(res.feed.id).toBe(f.batmanFeedId);
  });

  it("byFeedId: drift", async () => {
    const raw = await fetchRaw("/podcasts/byfeedid", { id: f.batmanFeedId });
    assertNoDrift(podcastResponseSchema, "/podcasts/byfeedid", raw);
  });

  it("byFeedIds: smoke", async () => {
    const res = await client.podcasts.byFeedIds({ id: f.batmanFeedIdsCsv });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("byFeedIds: drift", async () => {
    const raw = await fetchRaw("/podcasts/byfeedid", {
      id: f.batmanFeedIdsCsv,
    });
    assertNoDrift(
      podcastsResponseSchema,
      "/podcasts/byfeedid (batch)",
      raw,
    );
  });

  it("byFeedUrl: smoke", async () => {
    const res = await client.podcasts.byFeedUrl({ url: f.batmanFeedUrl });
    expect(res.feed.id).toBe(f.batmanFeedId);
  });

  it("byFeedUrl: drift", async () => {
    const raw = await fetchRaw("/podcasts/byfeedurl", { url: f.batmanFeedUrl });
    assertNoDrift(podcastResponseSchema, "/podcasts/byfeedurl", raw);
  });

  it("byItunesId: smoke", async () => {
    const res = await client.podcasts.byItunesId({ id: f.batmanItunesId });
    expect(typeof res.feed.id).toBe("number");
  });

  it("byItunesId: drift", async () => {
    const raw = await fetchRaw("/podcasts/byitunesid", {
      id: f.batmanItunesId,
    });
    assertNoDrift(podcastResponseSchema, "/podcasts/byitunesid", raw);
  });

  it("byGuid: smoke", async () => {
    const res = await client.podcasts.byGuid({ guid: f.batmanPodcastGuid });
    expect(res.feed.id).toBe(f.batmanFeedId);
  });

  it("byGuid: drift", async () => {
    const raw = await fetchRaw("/podcasts/byguid", {
      guid: f.batmanPodcastGuid,
    });
    assertNoDrift(podcastResponseSchema, "/podcasts/byguid", raw);
  });

  it("byTag: smoke", async () => {
    const res = await client.podcasts.byTag({
      val: STATIC_FIXTURES.tagFilter,
      max: 5,
    });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("byTag: drift", async () => {
    const raw = await fetchRaw("/podcasts/bytag", {
      val: STATIC_FIXTURES.tagFilter,
      max: 5,
    });
    assertNoDrift(podcastsResponseSchema, "/podcasts/bytag", raw);
  });

  it("byMedium: smoke", async () => {
    const res = await client.podcasts.byMedium({
      medium: STATIC_FIXTURES.medium,
      max: 5,
    });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("byMedium: drift", async () => {
    const raw = await fetchRaw("/podcasts/bymedium", {
      medium: STATIC_FIXTURES.medium,
      max: 5,
    });
    assertNoDrift(podcastsResponseSchema, "/podcasts/bymedium", raw);
  });

  it("trending: smoke", async () => {
    const res = await client.podcasts.trending({ max: 5 });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("trending: drift", async () => {
    const raw = await fetchRaw("/podcasts/trending", { max: 5 });
    assertNoDrift(trendingResponseSchema, "/podcasts/trending", raw);
  });

  it("dead: smoke", async () => {
    const res = await client.podcasts.dead();
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("dead: drift", async () => {
    const raw = await fetchRaw("/podcasts/dead");
    assertNoDrift(deadResponseSchema, "/podcasts/dead", raw);
  });
});
