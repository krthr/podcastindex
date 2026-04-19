import { beforeAll, describe, expect, it } from "vitest";
import {
  valueBatchResponseSchema,
  valueResponseSchema,
} from "../src/schemas/responses.js";
import { fetchRaw, makeClient } from "./helpers/client.js";
import { assertNoDrift } from "./helpers/drift.js";
import { resolveFixtures, type ResolvedFixtures } from "./helpers/fixtures.js";

describe("value", () => {
  const client = makeClient();
  let f: ResolvedFixtures;

  beforeAll(async () => {
    f = await resolveFixtures();
  });

  it("byFeedId: smoke", async () => {
    const res = await client.value.byFeedId({ id: f.batmanFeedId });
    expect(res.value).toBeDefined();
  });

  it("byFeedId: drift", async () => {
    const raw = await fetchRaw(
      "/value/byfeedid",
      { id: f.batmanFeedId },
      false,
    );
    assertNoDrift(valueResponseSchema, "/value/byfeedid", raw);
  });

  it("byFeedUrl: smoke", async () => {
    const res = await client.value.byFeedUrl({ url: f.batmanFeedUrl });
    expect(res.value).toBeDefined();
  });

  it("byFeedUrl: drift", async () => {
    const raw = await fetchRaw(
      "/value/byfeedurl",
      { url: f.batmanFeedUrl },
      false,
    );
    assertNoDrift(valueResponseSchema, "/value/byfeedurl", raw);
  });

  it("byPodcastGuid: smoke", async () => {
    const res = await client.value.byPodcastGuid({
      guid: f.batmanPodcastGuid,
    });
    expect(res.value).toBeDefined();
  });

  it("byPodcastGuid: drift", async () => {
    const raw = await fetchRaw(
      "/value/bypodcastguid",
      { guid: f.batmanPodcastGuid },
      false,
    );
    assertNoDrift(valueResponseSchema, "/value/bypodcastguid", raw);
  });

  it("byEpisodeGuid: smoke", async () => {
    const res = await client.value.byEpisodeGuid({
      guid: f.batmanEpisodeGuid,
      feedguid: f.batmanPodcastGuid,
    });
    expect(res.value).toBeDefined();
  });

  it("byEpisodeGuid: drift", async () => {
    const raw = await fetchRaw(
      "/value/byepisodeguid",
      { guid: f.batmanEpisodeGuid, feedguid: f.batmanPodcastGuid },
      false,
    );
    assertNoDrift(valueResponseSchema, "/value/byepisodeguid", raw);
  });

  it("batchByFeedId: smoke", async () => {
    const res = await client.value.batchByFeedId({ id: f.batmanFeedIdsCsv });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("batchByFeedId: drift", async () => {
    const raw = await fetchRaw(
      "/value/batch/byfeedid",
      { id: f.batmanFeedIdsCsv },
      false,
    );
    assertNoDrift(valueBatchResponseSchema, "/value/batch/byfeedid", raw);
  });
});
