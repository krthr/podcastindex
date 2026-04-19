import { beforeAll, describe, expect, it } from "vitest";
import {
  episodeResponseSchema,
  episodesResponseSchema,
  liveEpisodesResponseSchema,
  randomEpisodesResponseSchema,
} from "../src/schemas/responses.js";
import { fetchRaw, makeClient } from "./helpers/client.js";
import { assertNoDrift } from "./helpers/drift.js";
import { resolveFixtures, type ResolvedFixtures } from "./helpers/fixtures.js";

describe("episodes", () => {
  const client = makeClient();
  let f: ResolvedFixtures;

  beforeAll(async () => {
    f = await resolveFixtures();
  });

  it("byFeedId: smoke", async () => {
    const res = await client.episodes.byFeedId({ id: f.batmanFeedId, max: 5 });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("byFeedId: drift", async () => {
    const raw = await fetchRaw("/episodes/byfeedid", {
      id: f.batmanFeedId,
      max: 5,
    });
    assertNoDrift(episodesResponseSchema, "/episodes/byfeedid", raw);
  });

  it("byFeedUrl: smoke", async () => {
    const res = await client.episodes.byFeedUrl({
      url: f.batmanFeedUrl,
      max: 5,
    });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("byFeedUrl: drift", async () => {
    const raw = await fetchRaw("/episodes/byfeedurl", {
      url: f.batmanFeedUrl,
      max: 5,
    });
    assertNoDrift(episodesResponseSchema, "/episodes/byfeedurl", raw);
  });

  it("byPodcastGuid: smoke", async () => {
    const res = await client.episodes.byPodcastGuid({
      guid: f.batmanPodcastGuid,
      max: 5,
    });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("byPodcastGuid: drift", async () => {
    const raw = await fetchRaw("/episodes/bypodcastguid", {
      guid: f.batmanPodcastGuid,
      max: 5,
    });
    assertNoDrift(episodesResponseSchema, "/episodes/bypodcastguid", raw);
  });

  it("byItunesId: smoke", async () => {
    const res = await client.episodes.byItunesId({
      id: f.batmanItunesId,
      max: 5,
    });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("byItunesId: drift", async () => {
    const raw = await fetchRaw("/episodes/byitunesid", {
      id: f.batmanItunesId,
      max: 5,
    });
    assertNoDrift(episodesResponseSchema, "/episodes/byitunesid", raw);
  });

  it("byId: smoke", async () => {
    const res = await client.episodes.byId({ id: f.batmanEpisodeId });
    expect(res.episode.id).toBe(f.batmanEpisodeId);
  });

  it("byId: drift", async () => {
    const raw = await fetchRaw("/episodes/byid", { id: f.batmanEpisodeId });
    assertNoDrift(episodeResponseSchema, "/episodes/byid", raw);
  });

  it("byGuid: smoke", async () => {
    const res = await client.episodes.byGuid({
      guid: f.batmanEpisodeGuid,
      feedid: f.batmanFeedId,
    });
    expect(res.episode.id).toBeDefined();
  });

  it("byGuid: drift", async () => {
    const raw = await fetchRaw("/episodes/byguid", {
      guid: f.batmanEpisodeGuid,
      feedid: f.batmanFeedId,
    });
    assertNoDrift(episodeResponseSchema, "/episodes/byguid", raw);
  });

  it("live: smoke", async () => {
    const res = await client.episodes.live({ max: 5 });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("live: drift", async () => {
    const raw = await fetchRaw("/episodes/live", { max: 5 });
    assertNoDrift(liveEpisodesResponseSchema, "/episodes/live", raw);
  });

  it("random: smoke", async () => {
    const res = await client.episodes.random({ max: 5 });
    expect(Array.isArray(res.episodes)).toBe(true);
  });

  it("random: drift", async () => {
    const raw = await fetchRaw("/episodes/random", { max: 5 });
    assertNoDrift(randomEpisodesResponseSchema, "/episodes/random", raw);
  });
});
