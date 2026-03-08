import type { HttpClient } from "../http.js";
import type {
  PodcastByFeedIdParams,
  PodcastByFeedUrlParams,
  PodcastByGuidParams,
  PodcastByItunesIdParams,
  PodcastsByFeedIdsParams,
  PodcastsByMediumParams,
  PodcastsByTagParams,
  TrendingParams,
} from "../types.js";
import {
  deadResponseSchema,
  podcastResponseSchema,
  podcastsResponseSchema,
  trendingResponseSchema,
} from "../schemas/responses.js";

export class PodcastsResource {
  constructor(private http: HttpClient) {}

  byFeedId(params: PodcastByFeedIdParams) {
    return this.http.request(
      { path: "/podcasts/byfeedid", params },
      podcastResponseSchema,
    );
  }

  byFeedIds(params: PodcastsByFeedIdsParams) {
    return this.http.request(
      { path: "/podcasts/byfeedid", params },
      podcastsResponseSchema,
    );
  }

  byFeedUrl(params: PodcastByFeedUrlParams) {
    return this.http.request(
      { path: "/podcasts/byfeedurl", params },
      podcastResponseSchema,
    );
  }

  byItunesId(params: PodcastByItunesIdParams) {
    return this.http.request(
      { path: "/podcasts/byitunesid", params },
      podcastResponseSchema,
    );
  }

  byGuid(params: PodcastByGuidParams) {
    return this.http.request(
      { path: "/podcasts/byguid", params },
      podcastResponseSchema,
    );
  }

  byTag(params?: PodcastsByTagParams) {
    return this.http.request(
      { path: "/podcasts/bytag", params },
      podcastsResponseSchema,
    );
  }

  byMedium(params: PodcastsByMediumParams) {
    return this.http.request(
      { path: "/podcasts/bymedium", params },
      podcastsResponseSchema,
    );
  }

  trending(params?: TrendingParams) {
    return this.http.request(
      { path: "/podcasts/trending", params },
      trendingResponseSchema,
    );
  }

  dead() {
    return this.http.request(
      { path: "/podcasts/dead" },
      deadResponseSchema,
    );
  }
}
