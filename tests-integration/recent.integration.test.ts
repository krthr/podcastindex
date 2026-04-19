import { describe, expect, it } from "vitest";
import {
  recentDataResponseSchema,
  recentEpisodesResponseSchema,
  recentFeedsResponseSchema,
  recentNewFeedsResponseSchema,
  recentNewValueFeedsResponseSchema,
  recentSoundbitesResponseSchema,
} from "../src/schemas/responses.js";
import { fetchRaw, makeClient } from "./helpers/client.js";
import { assertNoDrift } from "./helpers/drift.js";

describe("recent", () => {
  const client = makeClient();

  it("episodes: smoke", async () => {
    const res = await client.recent.episodes({ max: 5 });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("episodes: drift", async () => {
    const raw = await fetchRaw("/recent/episodes", { max: 5 });
    assertNoDrift(recentEpisodesResponseSchema, "/recent/episodes", raw);
  });

  it("feeds: smoke", async () => {
    const res = await client.recent.feeds({ max: 5 });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("feeds: drift", async () => {
    const raw = await fetchRaw("/recent/feeds", { max: 5 });
    assertNoDrift(recentFeedsResponseSchema, "/recent/feeds", raw);
  });

  it("newFeeds: smoke", async () => {
    const res = await client.recent.newFeeds({ max: 5 });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("newFeeds: drift", async () => {
    const raw = await fetchRaw("/recent/newfeeds", { max: 5 });
    assertNoDrift(recentNewFeedsResponseSchema, "/recent/newfeeds", raw);
  });

  it("data: smoke", async () => {
    const res = await client.recent.data({ max: 5 });
    expect(typeof res.status !== "undefined").toBe(true);
  });

  it("data: drift", async () => {
    const raw = await fetchRaw("/recent/data", { max: 5 });
    assertNoDrift(recentDataResponseSchema, "/recent/data", raw);
  });

  it("soundbites: smoke", async () => {
    const res = await client.recent.soundbites({ max: 5 });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("soundbites: drift", async () => {
    const raw = await fetchRaw("/recent/soundbites", { max: 5 });
    assertNoDrift(recentSoundbitesResponseSchema, "/recent/soundbites", raw);
  });

  it("newValueFeeds: smoke", async () => {
    const res = await client.recent.newValueFeeds({ max: 5 });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("newValueFeeds: drift", async () => {
    const raw = await fetchRaw("/recent/newvaluefeeds", { max: 5 });
    assertNoDrift(
      recentNewValueFeedsResponseSchema,
      "/recent/newvaluefeeds",
      raw,
    );
  });
});
