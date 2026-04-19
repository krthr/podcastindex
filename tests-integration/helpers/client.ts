import { AuthProvider } from "../../src/auth.js";
import { PodcastIndex } from "../../src/index.js";

export const BASE_URL = "https://api.podcastindex.org/api/1.0";
export const USER_AGENT = "podcastindex-js-integration/1.0";

export interface Creds {
  key: string;
  secret: string;
}

function creds(): Creds {
  const key = process.env.PODCAST_INDEX_API_KEY;
  const secret = process.env.PODCAST_INDEX_API_SECRET;
  if (!key || !secret) {
    throw new Error(
      "Integration tests require PODCAST_INDEX_API_KEY and PODCAST_INDEX_API_SECRET",
    );
  }
  return { key, secret };
}

export function makeClient(): PodcastIndex {
  const c = creds();
  return new PodcastIndex({ key: c.key, secret: c.secret });
}

let authProvider: AuthProvider | null = null;
function getAuthProvider(): AuthProvider {
  if (!authProvider) {
    authProvider = new AuthProvider(creds());
  }
  return authProvider;
}

export async function fetchRaw(
  path: string,
  params?: Record<string, unknown>,
  auth = true,
): Promise<unknown> {
  const url = new URL(BASE_URL + path);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, String(v));
      }
    }
  }

  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  if (auth) {
    Object.assign(headers, getAuthProvider().getHeaders());
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} ${res.statusText} for ${path}: ${await res
        .text()
        .catch(() => "")}`,
    );
  }
  return res.json() as Promise<unknown>;
}
