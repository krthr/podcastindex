import type { z } from "zod";
import type {
  categorySchema,
  dataItemSchema,
  episodeSchema,
  feedSchema,
  newFeedSchema,
  personSchema,
  recentFeedSchema,
  soundbiteSchema,
  statsSchema,
  transcriptSchema,
  trendingFeedSchema,
  valueBlockSchema,
  valueDestinationSchema,
  valueModelSchema,
} from "./schemas/entities.js";
import type {
  addBatchResponseSchema,
  addResponseSchema,
  categoriesResponseSchema,
  deadResponseSchema,
  episodeResponseSchema,
  episodesResponseSchema,
  hubResponseSchema,
  liveEpisodesResponseSchema,
  podcastResponseSchema,
  podcastsResponseSchema,
  randomEpisodesResponseSchema,
  recentDataResponseSchema,
  recentEpisodesResponseSchema,
  recentFeedsResponseSchema,
  recentNewFeedsResponseSchema,
  recentNewValueFeedsResponseSchema,
  recentSoundbitesResponseSchema,
  searchByPersonResponseSchema,
  searchByTermResponseSchema,
  statsResponseSchema,
  trendingResponseSchema,
  valueBatchResponseSchema,
  valueResponseSchema,
} from "./schemas/responses.js";
import type {
  addBatchByFeedUrlParamsSchema,
  addByFeedUrlParamsSchema,
  episodeByGuidParamsSchema,
  episodeByIdParamsSchema,
  episodesByFeedIdParamsSchema,
  episodesByFeedUrlParamsSchema,
  episodesByItunesIdParamsSchema,
  episodesByPodcastGuidParamsSchema,
  hubPubNotifyParamsSchema,
  liveEpisodesParamsSchema,
  podcastByFeedIdParamsSchema,
  podcastByFeedUrlParamsSchema,
  podcastByGuidParamsSchema,
  podcastByItunesIdParamsSchema,
  podcastsByFeedIdsParamsSchema,
  podcastsByMediumParamsSchema,
  podcastsByTagParamsSchema,
  randomEpisodesParamsSchema,
  recentDataParamsSchema,
  recentEpisodesParamsSchema,
  recentFeedsParamsSchema,
  recentNewFeedsParamsSchema,
  recentNewValueFeedsParamsSchema,
  recentSoundbitesParamsSchema,
  searchByPersonParamsSchema,
  searchByTermParamsSchema,
  searchByTitleParamsSchema,
  trendingParamsSchema,
  valueBatchByFeedIdParamsSchema,
  valueByEpisodeGuidParamsSchema,
  valueByFeedIdParamsSchema,
  valueByFeedUrlParamsSchema,
  valueByPodcastGuidParamsSchema,
} from "./schemas/params.js";

// --- Entity types ---

export type Feed = z.infer<typeof feedSchema>;
export type Episode = z.infer<typeof episodeSchema>;
export type TrendingFeed = z.infer<typeof trendingFeedSchema>;
export type RecentFeed = z.infer<typeof recentFeedSchema>;
export type NewFeed = z.infer<typeof newFeedSchema>;
export type DataItem = z.infer<typeof dataItemSchema>;
export type ValueBlock = z.infer<typeof valueBlockSchema>;
export type ValueModel = z.infer<typeof valueModelSchema>;
export type ValueDestination = z.infer<typeof valueDestinationSchema>;
export type Person = z.infer<typeof personSchema>;
export type Transcript = z.infer<typeof transcriptSchema>;
export type Soundbite = z.infer<typeof soundbiteSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Stats = z.infer<typeof statsSchema>;

// --- Param types ---

export type SearchByTermParams = z.infer<typeof searchByTermParamsSchema>;
export type SearchByTitleParams = z.infer<typeof searchByTitleParamsSchema>;
export type SearchByPersonParams = z.infer<typeof searchByPersonParamsSchema>;
export type PodcastByFeedIdParams = z.infer<typeof podcastByFeedIdParamsSchema>;
export type PodcastsByFeedIdsParams = z.infer<typeof podcastsByFeedIdsParamsSchema>;
export type PodcastByFeedUrlParams = z.infer<typeof podcastByFeedUrlParamsSchema>;
export type PodcastByItunesIdParams = z.infer<typeof podcastByItunesIdParamsSchema>;
export type PodcastByGuidParams = z.infer<typeof podcastByGuidParamsSchema>;
export type PodcastsByTagParams = z.infer<typeof podcastsByTagParamsSchema>;
export type PodcastsByMediumParams = z.infer<typeof podcastsByMediumParamsSchema>;
export type TrendingParams = z.infer<typeof trendingParamsSchema>;
export type EpisodesByFeedIdParams = z.infer<typeof episodesByFeedIdParamsSchema>;
export type EpisodesByFeedUrlParams = z.infer<typeof episodesByFeedUrlParamsSchema>;
export type EpisodesByPodcastGuidParams = z.infer<typeof episodesByPodcastGuidParamsSchema>;
export type EpisodesByItunesIdParams = z.infer<typeof episodesByItunesIdParamsSchema>;
export type EpisodeByIdParams = z.infer<typeof episodeByIdParamsSchema>;
export type EpisodeByGuidParams = z.infer<typeof episodeByGuidParamsSchema>;
export type LiveEpisodesParams = z.infer<typeof liveEpisodesParamsSchema>;
export type RandomEpisodesParams = z.infer<typeof randomEpisodesParamsSchema>;
export type RecentEpisodesParams = z.infer<typeof recentEpisodesParamsSchema>;
export type RecentFeedsParams = z.infer<typeof recentFeedsParamsSchema>;
export type RecentNewFeedsParams = z.infer<typeof recentNewFeedsParamsSchema>;
export type RecentDataParams = z.infer<typeof recentDataParamsSchema>;
export type RecentSoundbitesParams = z.infer<typeof recentSoundbitesParamsSchema>;
export type RecentNewValueFeedsParams = z.infer<typeof recentNewValueFeedsParamsSchema>;
export type ValueByFeedIdParams = z.infer<typeof valueByFeedIdParamsSchema>;
export type ValueByFeedUrlParams = z.infer<typeof valueByFeedUrlParamsSchema>;
export type ValueByPodcastGuidParams = z.infer<typeof valueByPodcastGuidParamsSchema>;
export type ValueByEpisodeGuidParams = z.infer<typeof valueByEpisodeGuidParamsSchema>;
export type ValueBatchByFeedIdParams = z.infer<typeof valueBatchByFeedIdParamsSchema>;
export type HubPubNotifyParams = z.infer<typeof hubPubNotifyParamsSchema>;
export type AddByFeedUrlParams = z.infer<typeof addByFeedUrlParamsSchema>;
export type AddBatchByFeedUrlParams = z.infer<typeof addBatchByFeedUrlParamsSchema>;

// --- Response types ---

export type SearchByTermResponse = z.infer<typeof searchByTermResponseSchema>;
export type SearchByPersonResponse = z.infer<typeof searchByPersonResponseSchema>;
export type PodcastResponse = z.infer<typeof podcastResponseSchema>;
export type PodcastsResponse = z.infer<typeof podcastsResponseSchema>;
export type TrendingResponse = z.infer<typeof trendingResponseSchema>;
export type DeadResponse = z.infer<typeof deadResponseSchema>;
export type EpisodesResponse = z.infer<typeof episodesResponseSchema>;
export type EpisodeResponse = z.infer<typeof episodeResponseSchema>;
export type LiveEpisodesResponse = z.infer<typeof liveEpisodesResponseSchema>;
export type RandomEpisodesResponse = z.infer<typeof randomEpisodesResponseSchema>;
export type RecentEpisodesResponse = z.infer<typeof recentEpisodesResponseSchema>;
export type RecentFeedsResponse = z.infer<typeof recentFeedsResponseSchema>;
export type RecentNewFeedsResponse = z.infer<typeof recentNewFeedsResponseSchema>;
export type RecentDataResponse = z.infer<typeof recentDataResponseSchema>;
export type RecentSoundbitesResponse = z.infer<typeof recentSoundbitesResponseSchema>;
export type RecentNewValueFeedsResponse = z.infer<typeof recentNewValueFeedsResponseSchema>;
export type ValueResponse = z.infer<typeof valueResponseSchema>;
export type ValueBatchResponse = z.infer<typeof valueBatchResponseSchema>;
export type StatsResponse = z.infer<typeof statsResponseSchema>;
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;
export type HubResponse = z.infer<typeof hubResponseSchema>;
export type AddResponse = z.infer<typeof addResponseSchema>;
export type AddBatchResponse = z.infer<typeof addBatchResponseSchema>;

// --- Config ---

export interface PodcastIndexConfig {
  key?: string;
  secret?: string;
  baseUrl?: string;
  userAgent?: string;
}
