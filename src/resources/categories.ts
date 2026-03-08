import type { HttpClient } from "../http.js";
import { categoriesResponseSchema } from "../schemas/responses.js";

export class CategoriesResource {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.request(
      { path: "/categories/list" },
      categoriesResponseSchema,
    );
  }
}
