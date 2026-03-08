import type { HttpClient } from "../http.js";
import type { AddBatchByFeedUrlParams, AddByFeedUrlParams } from "../types.js";
import {
  addBatchResponseSchema,
  addResponseSchema,
} from "../schemas/responses.js";

export class AddResource {
  constructor(private http: HttpClient) {}

  byFeedUrl(params: AddByFeedUrlParams) {
    return this.http.request(
      { path: "/add/byfeedurl", params },
      addResponseSchema,
    );
  }

  batchByFeedUrl(params: AddBatchByFeedUrlParams) {
    return this.http.request(
      { path: "/add/batch/byfeedurl", params },
      addBatchResponseSchema,
    );
  }
}
