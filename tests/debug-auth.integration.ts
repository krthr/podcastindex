/**
 * Integration test: verify authentication against the live PodcastIndex API
 * with debug logging enabled.
 *
 * Usage:
 *   PODCAST_INDEX_API_KEY=... PODCAST_INDEX_API_SECRET=... npx tsx tests/debug-auth.integration.ts
 */

import { PodcastIndex } from "../src/index.js";

const key = process.env.PODCAST_INDEX_API_KEY;
const secret = process.env.PODCAST_INDEX_API_SECRET;

if (!key || !secret) {
  console.error(
    "Set PODCAST_INDEX_API_KEY and PODCAST_INDEX_API_SECRET environment variables",
  );
  process.exit(1);
}

const client = new PodcastIndex({
  key,
  secret,
  debug: true, // Enable full debug output
});

async function main() {
  console.log("=== Testing authenticated endpoint (search) ===\n");
  try {
    const results = await client.search.byTerm({ q: "podcasting 2.0" });
    console.log(
      `\n✓ Search returned ${results.feeds.length} feeds (status: ${results.status})\n`,
    );
  } catch (err) {
    console.error("\n✗ Search failed:", err);
    process.exit(1);
  }

  console.log("=== Testing unauthenticated endpoint (value) ===\n");
  try {
    const value = await client.value.byFeedId({ id: 920666 });
    console.log(`\n✓ Value query succeeded (status: ${value.status})\n`);
  } catch (err) {
    console.error("\n✗ Value query failed:", err);
    process.exit(1);
  }

  console.log("=== Testing stats endpoint ===\n");
  try {
    const stats = await client.stats.current();
    console.log(
      `\n✓ Stats returned (feedCountTotal: ${stats.stats.feedCountTotal})\n`,
    );
  } catch (err) {
    console.error("\n✗ Stats failed:", err);
    process.exit(1);
  }

  console.log("=== Testing podcast lookup by RSS URL ===\n");
  try {
    const podcast = await client.podcasts.byFeedUrl({
      url: "https://feeds.theincomparable.com/batmanuniversity",
    });
    console.log(
      `\n✓ Podcast by RSS URL returned "${podcast.feed.title}" (id: ${podcast.feed.id})\n`,
    );
  } catch (err) {
    console.error("\n✗ Podcast by RSS URL failed:", err);
    process.exit(1);
  }

  console.log("All integration tests passed!");
}

main();
