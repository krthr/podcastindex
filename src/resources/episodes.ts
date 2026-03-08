import type { HttpClient } from "../http.js";
import type {
  EpisodeByGuidParams,
  EpisodeByIdParams,
  EpisodesByFeedIdParams,
  EpisodesByFeedUrlParams,
  EpisodesByItunesIdParams,
  EpisodesByPodcastGuidParams,
  LiveEpisodesParams,
  RandomEpisodesParams,
} from "../types.js";
import {
  episodeResponseSchema,
  episodesResponseSchema,
  liveEpisodesResponseSchema,
  randomEpisodesResponseSchema,
} from "../schemas/responses.js";

export class EpisodesResource {
  constructor(private http: HttpClient) {}

  byFeedId(params: EpisodesByFeedIdParams) {
    return this.http.request(
      { path: "/episodes/byfeedid", params },
      episodesResponseSchema,
    );
  }

  byFeedUrl(params: EpisodesByFeedUrlParams) {
    return this.http.request(
      { path: "/episodes/byfeedurl", params },
      episodesResponseSchema,
    );
  }

  byPodcastGuid(params: EpisodesByPodcastGuidParams) {
    return this.http.request(
      { path: "/episodes/bypodcastguid", params },
      episodesResponseSchema,
    );
  }

  byItunesId(params: EpisodesByItunesIdParams) {
    return this.http.request(
      { path: "/episodes/byitunesid", params },
      episodesResponseSchema,
    );
  }

  byId(params: EpisodeByIdParams) {
    return this.http.request(
      { path: "/episodes/byid", params },
      episodeResponseSchema,
    );
  }

  byGuid(params: EpisodeByGuidParams) {
    return this.http.request(
      { path: "/episodes/byguid", params },
      episodeResponseSchema,
    );
  }

  live(params?: LiveEpisodesParams) {
    return this.http.request(
      { path: "/episodes/live", params },
      liveEpisodesResponseSchema,
    );
  }

  random(params?: RandomEpisodesParams) {
    return this.http.request(
      { path: "/episodes/random", params },
      randomEpisodesResponseSchema,
    );
  }
}
