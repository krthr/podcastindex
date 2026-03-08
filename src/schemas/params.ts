import { z } from "zod";

// --- Shared ---

const paginationSchema = z.object({
  max: z.number().optional(),
});

const fulltextSchema = z.object({
  fulltext: z.boolean().optional(),
});

const filterSchema = z.object({
  val: z.string().optional(),
  clean: z.boolean().optional(),
});

// --- Search ---

export const searchByTermParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .merge(filterSchema)
  .extend({
    q: z.string(),
    similar: z.boolean().optional(),
  });

export const searchByTitleParamsSchema = searchByTermParamsSchema;

export const searchByPersonParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .extend({
    q: z.string(),
  });

// --- Podcasts ---

export const podcastByFeedIdParamsSchema = z.object({
  id: z.number(),
});

export const podcastsByFeedIdsParamsSchema = z.object({
  id: z.string(),
});

export const podcastByFeedUrlParamsSchema = z.object({
  url: z.string(),
});

export const podcastByItunesIdParamsSchema = z.object({
  id: z.number(),
});

export const podcastByGuidParamsSchema = z.object({
  guid: z.string(),
});

export const podcastsByTagParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .merge(filterSchema);

export const podcastsByMediumParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .merge(filterSchema)
  .extend({
    medium: z.string(),
  });

export const trendingParamsSchema = paginationSchema.extend({
  lang: z.string().optional(),
  since: z.number().optional(),
  cat: z.string().optional(),
  notcat: z.string().optional(),
});

// --- Episodes ---

export const episodesByFeedIdParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .extend({
    id: z.number(),
    since: z.number().optional(),
  });

export const episodesByFeedUrlParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .extend({
    url: z.string(),
    since: z.number().optional(),
  });

export const episodesByPodcastGuidParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .extend({
    guid: z.string(),
    since: z.number().optional(),
  });

export const episodesByItunesIdParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .extend({
    id: z.number(),
    since: z.number().optional(),
  });

export const episodeByIdParamsSchema = fulltextSchema.extend({
  id: z.number(),
});

export const episodeByGuidParamsSchema = fulltextSchema.extend({
  guid: z.string(),
  feedurl: z.string().optional(),
  feedid: z.number().optional(),
});

export const liveEpisodesParamsSchema = paginationSchema;

export const randomEpisodesParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .extend({
    lang: z.string().optional(),
    cat: z.string().optional(),
    notcat: z.string().optional(),
  });

// --- Recent ---

export const recentEpisodesParamsSchema = paginationSchema
  .merge(fulltextSchema)
  .extend({
    excludeString: z.string().optional(),
    before: z.number().optional(),
    lang: z.string().optional(),
    cat: z.string().optional(),
    notcat: z.string().optional(),
  });

export const recentFeedsParamsSchema = paginationSchema.extend({
  since: z.number().optional(),
  lang: z.string().optional(),
  cat: z.string().optional(),
  notcat: z.string().optional(),
});

export const recentNewFeedsParamsSchema = paginationSchema.extend({
  since: z.number().optional(),
  feedid: z.number().optional(),
  desc: z.boolean().optional(),
});

export const recentDataParamsSchema = paginationSchema;

export const recentSoundbitesParamsSchema = paginationSchema;

export const recentNewValueFeedsParamsSchema = paginationSchema.extend({
  since: z.number().optional(),
});

// --- Value ---

export const valueByFeedIdParamsSchema = z.object({
  id: z.number(),
});

export const valueByFeedUrlParamsSchema = z.object({
  url: z.string(),
});

export const valueByPodcastGuidParamsSchema = z.object({
  guid: z.string(),
});

export const valueByEpisodeGuidParamsSchema = z.object({
  guid: z.string(),
  feedguid: z.string().optional(),
});

export const valueBatchByFeedIdParamsSchema = z.object({
  id: z.string(),
});

// --- Hub ---

export const hubPubNotifyParamsSchema = z.object({
  id: z.number().optional(),
  url: z.string().optional(),
});

// --- Add ---

export const addByFeedUrlParamsSchema = z.object({
  url: z.string(),
  chash: z.string().optional(),
  itunesid: z.number().optional(),
});

export const addBatchByFeedUrlParamsSchema = z.object({
  url: z.string(),
});
