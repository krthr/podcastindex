import type { HttpClient } from "../http.js";
import type { SearchByPersonParams, SearchByTermParams, SearchByTitleParams } from "../types.js";
import { searchByPersonResponseSchema, searchByTermResponseSchema } from "../schemas/responses.js";

export class SearchResource {
  constructor(private http: HttpClient) {}

  byTerm(params: SearchByTermParams) {
    return this.http.request(
      { path: "/search/byterm", params },
      searchByTermResponseSchema,
    );
  }

  byTitle(params: SearchByTitleParams) {
    return this.http.request(
      { path: "/search/bytitle", params },
      searchByTermResponseSchema,
    );
  }

  byPerson(params: SearchByPersonParams) {
    return this.http.request(
      { path: "/search/byperson", params },
      searchByPersonResponseSchema,
    );
  }

  musicByTerm(params: SearchByTermParams) {
    return this.http.request(
      { path: "/search/music/byterm", params },
      searchByTermResponseSchema,
    );
  }

  musicByTitle(params: SearchByTitleParams) {
    return this.http.request(
      { path: "/search/music/bytitle", params },
      searchByTermResponseSchema,
    );
  }

  musicByPerson(params: SearchByPersonParams) {
    return this.http.request(
      { path: "/search/music/byperson", params },
      searchByPersonResponseSchema,
    );
  }
}
