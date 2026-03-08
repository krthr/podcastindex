import type { HttpClient } from "../http.js";
import type { HubPubNotifyParams } from "../types.js";
import { hubResponseSchema } from "../schemas/responses.js";

export class HubResource {
  constructor(private http: HttpClient) {}

  pubNotify(params: HubPubNotifyParams) {
    return this.http.request(
      { path: "/hub/pubnotify", params, auth: false },
      hubResponseSchema,
    );
  }
}
