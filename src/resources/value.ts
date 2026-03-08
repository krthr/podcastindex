import type { HttpClient } from "../http.js";
import type {
  ValueBatchByFeedIdParams,
  ValueByEpisodeGuidParams,
  ValueByFeedIdParams,
  ValueByFeedUrlParams,
  ValueByPodcastGuidParams,
} from "../types.js";
import {
  valueBatchResponseSchema,
  valueResponseSchema,
} from "../schemas/responses.js";

export class ValueResource {
  constructor(private http: HttpClient) {}

  byFeedId(params: ValueByFeedIdParams) {
    return this.http.request(
      { path: "/value/byfeedid", params, auth: false },
      valueResponseSchema,
    );
  }

  byFeedUrl(params: ValueByFeedUrlParams) {
    return this.http.request(
      { path: "/value/byfeedurl", params, auth: false },
      valueResponseSchema,
    );
  }

  byPodcastGuid(params: ValueByPodcastGuidParams) {
    return this.http.request(
      { path: "/value/bypodcastguid", params, auth: false },
      valueResponseSchema,
    );
  }

  byEpisodeGuid(params: ValueByEpisodeGuidParams) {
    return this.http.request(
      { path: "/value/byepisodeguid", params, auth: false },
      valueResponseSchema,
    );
  }

  batchByFeedId(params: ValueBatchByFeedIdParams) {
    return this.http.request(
      { path: "/value/batch/byfeedid", params, auth: false },
      valueBatchResponseSchema,
    );
  }
}
