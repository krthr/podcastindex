import type { HttpClient } from "../http.js";
import type {
  RecentDataParams,
  RecentEpisodesParams,
  RecentFeedsParams,
  RecentNewFeedsParams,
  RecentNewValueFeedsParams,
  RecentSoundbitesParams,
} from "../types.js";
import {
  recentDataResponseSchema,
  recentEpisodesResponseSchema,
  recentFeedsResponseSchema,
  recentNewFeedsResponseSchema,
  recentNewValueFeedsResponseSchema,
  recentSoundbitesResponseSchema,
} from "../schemas/responses.js";

export class RecentResource {
  constructor(private http: HttpClient) {}

  episodes(params?: RecentEpisodesParams) {
    return this.http.request(
      { path: "/recent/episodes", params },
      recentEpisodesResponseSchema,
    );
  }

  feeds(params?: RecentFeedsParams) {
    return this.http.request(
      { path: "/recent/feeds", params },
      recentFeedsResponseSchema,
    );
  }

  newFeeds(params?: RecentNewFeedsParams) {
    return this.http.request(
      { path: "/recent/newfeeds", params },
      recentNewFeedsResponseSchema,
    );
  }

  data(params?: RecentDataParams) {
    return this.http.request(
      { path: "/recent/data", params },
      recentDataResponseSchema,
    );
  }

  soundbites(params?: RecentSoundbitesParams) {
    return this.http.request(
      { path: "/recent/soundbites", params },
      recentSoundbitesResponseSchema,
    );
  }

  newValueFeeds(params?: RecentNewValueFeedsParams) {
    return this.http.request(
      { path: "/recent/newvaluefeeds", params },
      recentNewValueFeedsResponseSchema,
    );
  }
}
