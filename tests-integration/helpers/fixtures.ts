import { makeClient } from "./client.js";

export const STATIC_FIXTURES = {
  batmanFeedId: 920666,
  batmanFeedUrl: "https://feeds.theincomparable.com/batmanuniversity",
  searchPersonQuery: "adam curry",
  searchTerm: "podcasting 2.0",
  musicSearchTerm: "lofi",
  musicPersonQuery: "daft punk",
  musicTitleQuery: "satisfaction",
  tagFilter: "podcast-value",
  medium: "music",
  fallbackItunesId: 201671138,
} as const;

export interface ResolvedFixtures {
  batmanFeedId: number;
  batmanFeedUrl: string;
  batmanPodcastGuid: string;
  batmanItunesId: number;
  batmanEpisodeId: number;
  batmanEpisodeGuid: string;
  batmanFeedIdsCsv: string;
}

let cached: ResolvedFixtures | null = null;

export async function resolveFixtures(): Promise<ResolvedFixtures> {
  if (cached) return cached;

  const client = makeClient();
  const feedId = STATIC_FIXTURES.batmanFeedId;

  const podcastRes = await client.podcasts.byFeedId({ id: feedId });
  const feed = podcastRes.feed;
  if (!feed || feed.id !== feedId) {
    throw new Error(`Fixture bootstrap: unexpected feed for id ${feedId}`);
  }

  const podcastGuid = feed.podcastGuid;
  if (!podcastGuid) {
    throw new Error(`Fixture bootstrap: feed ${feedId} has no podcastGuid`);
  }

  const itunesId =
    typeof feed.itunesId === "number"
      ? feed.itunesId
      : STATIC_FIXTURES.fallbackItunesId;

  const episodesRes = await client.episodes.byFeedId({
    id: feedId,
    max: 1,
  });
  const ep = episodesRes.items?.[0];
  if (!ep || !ep.guid) {
    throw new Error(
      `Fixture bootstrap: feed ${feedId} has no episodes with guids`,
    );
  }

  cached = {
    batmanFeedId: feedId,
    batmanFeedUrl: STATIC_FIXTURES.batmanFeedUrl,
    batmanPodcastGuid: podcastGuid,
    batmanItunesId: itunesId,
    batmanEpisodeId: ep.id,
    batmanEpisodeGuid: ep.guid,
    batmanFeedIdsCsv: String(feedId),
  };
  return cached;
}
