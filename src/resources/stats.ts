import type { HttpClient } from "../http.js";
import { statsResponseSchema } from "../schemas/responses.js";

export class StatsResource {
  constructor(private http: HttpClient) {}

  current() {
    return this.http.request(
      { path: "/stats/current" },
      statsResponseSchema,
    );
  }
}
