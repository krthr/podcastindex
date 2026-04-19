import { describe, expect, it } from "vitest";
import {
  categoriesResponseSchema,
  statsResponseSchema,
} from "../src/schemas/responses.js";
import { fetchRaw, makeClient } from "./helpers/client.js";
import { assertNoDrift } from "./helpers/drift.js";

describe("stats", () => {
  const client = makeClient();

  it("current: smoke", async () => {
    const res = await client.stats.current();
    expect(typeof res.stats.feedCountTotal).toBe("number");
  });

  it("current: drift", async () => {
    const raw = await fetchRaw("/stats/current");
    assertNoDrift(statsResponseSchema, "/stats/current", raw);
  });
});

describe("categories", () => {
  const client = makeClient();

  it("list: smoke", async () => {
    const res = await client.categories.list();
    expect(Array.isArray(res.feeds)).toBe(true);
  });

  it("list: drift", async () => {
    const raw = await fetchRaw("/categories/list");
    assertNoDrift(categoriesResponseSchema, "/categories/list", raw);
  });
});
