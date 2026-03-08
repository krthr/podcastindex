import { z } from "zod";

export const valueDestinationSchema = z
  .object({
    name: z.string().optional(),
    address: z.string().optional(),
    type: z.string().optional(),
    split: z.number().optional(),
    fee: z.boolean().optional(),
    customKey: z.string().optional(),
    customValue: z.string().optional(),
  })
  .passthrough();

export const valueModelSchema = z
  .object({
    type: z.string().optional(),
    method: z.string().optional(),
    suggested: z.string().optional(),
  })
  .passthrough();

export const valueBlockSchema = z
  .object({
    model: valueModelSchema.optional(),
    destinations: z.array(valueDestinationSchema).optional(),
  })
  .passthrough();

export const feedSchema = z
  .object({
    id: z.number(),
    podcastGuid: z.string().optional(),
    title: z.string(),
    url: z.string(),
    originalUrl: z.string().optional(),
    link: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    ownerName: z.string().optional(),
    image: z.string().optional(),
    artwork: z.string().optional(),
    lastUpdateTime: z.number().optional(),
    lastCrawlTime: z.number().optional(),
    lastParseTime: z.number().optional(),
    lastGoodHttpStatusTime: z.number().optional(),
    contentType: z.string().nullable().optional(),
    itunesId: z.number().nullable().optional(),
    generator: z.string().nullable().optional(),
    language: z.string().optional(),
    type: z.number().optional(),
    dead: z.number().optional(),
    episodeCount: z.number().optional(),
    crawlErrors: z.number().optional(),
    parseErrors: z.number().optional(),
    categories: z.record(z.string(), z.string()).nullable().optional(),
    locked: z.number().optional(),
    explicit: z.boolean().optional(),
    medium: z.string().optional(),
    newestItemPubdate: z.number().optional(),
    oldestItemPubdate: z.number().optional(),
    funding: z
      .object({
        url: z.string().optional(),
        message: z.string().optional(),
      })
      .passthrough()
      .nullable()
      .optional(),
    value: valueBlockSchema.nullable().optional(),
  })
  .passthrough();

export const personSchema = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    role: z.string().optional(),
    group: z.string().optional(),
    href: z.string().optional(),
    img: z.string().optional(),
  })
  .passthrough();

export const transcriptSchema = z
  .object({
    url: z.string(),
    type: z.string().optional(),
    language: z.string().optional(),
  })
  .passthrough();

export const soundbiteSchema = z
  .object({
    title: z.string().optional(),
    startTime: z.number().optional(),
    duration: z.number().optional(),
    enclosureUrl: z.string().optional(),
    feedId: z.number().optional(),
    feedTitle: z.string().optional(),
    episodeId: z.number().optional(),
    episodeTitle: z.string().optional(),
  })
  .passthrough();

export const episodeSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    link: z.string().optional(),
    description: z.string().optional(),
    guid: z.string().optional(),
    datePublished: z.number().optional(),
    datePublishedPretty: z.string().optional(),
    dateCrawled: z.number().optional(),
    enclosureUrl: z.string().optional(),
    enclosureType: z.string().optional(),
    enclosureLength: z.number().optional(),
    duration: z.number().nullable().optional(),
    explicit: z.number().optional(),
    episode: z.number().nullable().optional(),
    episodeType: z.string().nullable().optional(),
    season: z.number().nullable().optional(),
    image: z.string().optional(),
    feedItunesId: z.number().nullable().optional(),
    feedImage: z.string().optional(),
    feedId: z.number().optional(),
    feedLanguage: z.string().optional(),
    feedUrl: z.string().optional(),
    feedTitle: z.string().optional(),
    feedDead: z.number().optional(),
    chaptersUrl: z.string().nullable().optional(),
    transcriptUrl: z.string().nullable().optional(),
    transcripts: z.array(transcriptSchema).optional(),
    persons: z.array(personSchema).optional(),
    soundbite: soundbiteSchema.optional(),
    soundbites: z.array(soundbiteSchema).optional(),
    value: valueBlockSchema.nullable().optional(),
  })
  .passthrough();

export const categorySchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .passthrough();

export const statsSchema = z
  .object({
    feedCountTotal: z.number(),
    episodeCountTotal: z.number(),
    feedsWithNewEpisodes: z.number(),
    feedsWithValueBlocks: z.number().optional(),
  })
  .passthrough();

export const trendingFeedSchema = feedSchema
  .extend({
    trendScore: z.number().optional(),
    newestItemPubdate: z.number().optional(),
  })
  .passthrough();

export const recentFeedSchema = z
  .object({
    id: z.number(),
    url: z.string(),
    title: z.string(),
    newestItemPublishTime: z.number().optional(),
    oldestItemPublishTime: z.number().optional(),
    itunesId: z.number().nullable().optional(),
    language: z.string().optional(),
    categories: z.record(z.string(), z.string()).nullable().optional(),
  })
  .passthrough();

export const newFeedSchema = z
  .object({
    id: z.number(),
    url: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    newestItemPublishTime: z.number().optional(),
    language: z.string().optional(),
  })
  .passthrough();

export const dataItemSchema = z
  .object({
    feedId: z.number().optional(),
    feedTitle: z.string().optional(),
    feedUrl: z.string().optional(),
    feedImage: z.string().optional(),
    episodeId: z.number().optional(),
    episodeTitle: z.string().optional(),
    episodeImage: z.string().optional(),
  })
  .passthrough();
