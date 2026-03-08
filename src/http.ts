import type { ZodSchema } from "zod";
import type { AuthProvider } from "./auth.js";
import { PodcastIndexError } from "./errors.js";

export interface HttpClientConfig {
  baseUrl: string;
  auth?: AuthProvider;
  userAgent: string;
}

export interface RequestOptions {
  path: string;
  params?: Record<string, unknown>;
  auth?: boolean;
}

export class HttpClient {
  constructor(private config: HttpClientConfig) {}

  async request<T>(options: RequestOptions, schema: ZodSchema<T>): Promise<T> {
    const { path, params, auth = true } = options;

    if (auth && !this.config.auth) {
      throw new PodcastIndexError(
        "Authentication required but no credentials provided",
      );
    }

    const url = new URL(this.config.baseUrl + path);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      "User-Agent": this.config.userAgent,
    };

    if (auth && this.config.auth) {
      Object.assign(headers, this.config.auth.getHeaders());
    }

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      let errorBody: Record<string, unknown> | undefined;
      try {
        errorBody = (await response.json()) as Record<string, unknown>;
      } catch {
        throw new PodcastIndexError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
        );
      }
      throw new PodcastIndexError(
        (errorBody?.description as string) ?? `HTTP ${response.status}`,
        response.status,
        errorBody?.code as number | undefined,
        errorBody?.description as string | undefined,
      );
    }

    const json: unknown = await response.json();
    return schema.parse(json);
  }
}
