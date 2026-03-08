import { z } from "zod";
import {
  categorySchema,
  dataItemSchema,
  episodeSchema,
  feedSchema,
  newFeedSchema,
  recentFeedSchema,
  soundbiteSchema,
  statsSchema,
  trendingFeedSchema,
  valueBlockSchema,
} from "./entities.js";

export const baseResponseSchema = z
  .object({
    status: z.union([z.string(), z.boolean(), z.number()]),
    description: z.string().optional(),
  })
  .passthrough();

// --- Search ---

export const searchByTermResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(feedSchema),
    count: z.number(),
  })
  .passthrough();

export const searchByPersonResponseSchema = baseResponseSchema
  .extend({
    items: z.array(episodeSchema),
    count: z.number(),
  })
  .passthrough();

// --- Podcasts ---

export const podcastResponseSchema = baseResponseSchema
  .extend({
    feed: feedSchema,
    query: z.unknown().optional(),
  })
  .passthrough();

export const podcastsResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(feedSchema),
    count: z.number(),
  })
  .passthrough();

export const trendingResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(trendingFeedSchema),
    count: z.number(),
    max: z.number().optional(),
    since: z.number().optional(),
  })
  .passthrough();

export const deadResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(feedSchema),
    count: z.number(),
  })
  .passthrough();

// --- Episodes ---

export const episodesResponseSchema = baseResponseSchema
  .extend({
    items: z.array(episodeSchema),
    count: z.number(),
  })
  .passthrough();

export const episodeResponseSchema = baseResponseSchema
  .extend({
    episode: episodeSchema,
  })
  .passthrough();

export const liveEpisodesResponseSchema = baseResponseSchema
  .extend({
    items: z.array(episodeSchema),
    count: z.number(),
  })
  .passthrough();

export const randomEpisodesResponseSchema = baseResponseSchema
  .extend({
    episodes: z.array(episodeSchema),
    count: z.number(),
  })
  .passthrough();

// --- Recent ---

export const recentEpisodesResponseSchema = baseResponseSchema
  .extend({
    items: z.array(episodeSchema),
    count: z.number(),
    max: z.number().optional(),
  })
  .passthrough();

export const recentFeedsResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(recentFeedSchema),
    count: z.number(),
    max: z.number().optional(),
    since: z.number().optional(),
  })
  .passthrough();

export const recentNewFeedsResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(newFeedSchema),
    count: z.number(),
    max: z.number().optional(),
    since: z.number().optional(),
  })
  .passthrough();

export const recentDataResponseSchema = baseResponseSchema
  .extend({
    data: z
      .object({
        feeds: z.array(dataItemSchema).optional(),
        episodes: z.array(dataItemSchema).optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const recentSoundbitesResponseSchema = baseResponseSchema
  .extend({
    items: z.array(soundbiteSchema),
    count: z.number(),
  })
  .passthrough();

export const recentNewValueFeedsResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(feedSchema),
    count: z.number(),
  })
  .passthrough();

// --- Value ---

export const valueResponseSchema = baseResponseSchema
  .extend({
    value: valueBlockSchema,
  })
  .passthrough();

export const valueBatchResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(
      z
        .object({
          id: z.number().optional(),
          url: z.string().optional(),
          value: valueBlockSchema.optional(),
        })
        .passthrough(),
    ),
  })
  .passthrough();

// --- Stats ---

export const statsResponseSchema = baseResponseSchema
  .extend({
    stats: statsSchema,
  })
  .passthrough();

// --- Categories ---

export const categoriesResponseSchema = baseResponseSchema
  .extend({
    feeds: z.array(categorySchema),
    count: z.number(),
  })
  .passthrough();

// --- Hub ---

export const hubResponseSchema = baseResponseSchema.passthrough();

// --- Add ---

export const addResponseSchema = baseResponseSchema
  .extend({
    feedId: z.number().optional(),
  })
  .passthrough();

export const addBatchResponseSchema = baseResponseSchema
  .extend({
    feeds: z
      .array(
        z
          .object({
            feedId: z.number().optional(),
            url: z.string().optional(),
            status: z.union([z.string(), z.number()]).optional(),
          })
          .passthrough(),
      )
      .optional(),
  })
  .passthrough();
