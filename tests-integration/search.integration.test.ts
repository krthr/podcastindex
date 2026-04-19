import { describe, expect, it } from "vitest";
import {
  searchByPersonResponseSchema,
  searchByTermResponseSchema,
} from "../src/schemas/responses.js";
import { fetchRaw, makeClient } from "./helpers/client.js";
import { assertNoDrift } from "./helpers/drift.js";
import { STATIC_FIXTURES } from "./helpers/fixtures.js";

describe("search", () => {
  const client = makeClient();
  const q = STATIC_FIXTURES.searchTerm;
  const person = STATIC_FIXTURES.searchPersonQuery;
  const musicQ = STATIC_FIXTURES.musicSearchTerm;
  const musicTitle = STATIC_FIXTURES.musicTitleQuery;
  const musicPerson = STATIC_FIXTURES.musicPersonQuery;

  it("byTerm: smoke", async () => {
    const res = await client.search.byTerm({ q, max: 5 });
    expect(Array.isArray(res.feeds)).toBe(true);
    expect(typeof res.count).toBe("number");
  });

  it("byTerm: drift", async () => {
    const raw = await fetchRaw("/search/byterm", { q, max: 5 });
    assertNoDrift(searchByTermResponseSchema, "/search/byterm", raw);
  });

  it("byTitle: smoke", async () => {
    const res = await client.search.byTitle({ q, max: 5 });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("byTitle: drift", async () => {
    const raw = await fetchRaw("/search/bytitle", { q, max: 5 });
    assertNoDrift(searchByTermResponseSchema, "/search/bytitle", raw);
  });

  it("byPerson: smoke", async () => {
    const res = await client.search.byPerson({ q: person, max: 5 });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("byPerson: drift", async () => {
    const raw = await fetchRaw("/search/byperson", { q: person, max: 5 });
    assertNoDrift(searchByPersonResponseSchema, "/search/byperson", raw);
  });

  it("musicByTerm: smoke", async () => {
    const res = await client.search.musicByTerm({ q: musicQ, max: 5 });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("musicByTerm: drift", async () => {
    const raw = await fetchRaw("/search/music/byterm", { q: musicQ, max: 5 });
    assertNoDrift(searchByTermResponseSchema, "/search/music/byterm", raw);
  });

  it("musicByTitle: smoke", async () => {
    const res = await client.search.musicByTitle({ q: musicTitle, max: 5 });
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("musicByTitle: drift", async () => {
    const raw = await fetchRaw("/search/music/bytitle", {
      q: musicTitle,
      max: 5,
    });
    assertNoDrift(searchByTermResponseSchema, "/search/music/bytitle", raw);
  });

  it("musicByPerson: smoke", async () => {
    const res = await client.search.musicByPerson({ q: musicPerson, max: 5 });
    expect(Array.isArray(res.items)).toBe(true);
  });

  it("musicByPerson: drift", async () => {
    const raw = await fetchRaw("/search/music/byperson", {
      q: musicPerson,
      max: 5,
    });
    assertNoDrift(searchByPersonResponseSchema, "/search/music/byperson", raw);
  });
});
