import { AuthProvider } from "./auth.js";
import { HttpClient } from "./http.js";
import type { DebugOptions, PodcastIndexConfig } from "./types.js";
import {
  SearchResource,
  PodcastsResource,
  EpisodesResource,
  RecentResource,
  ValueResource,
  StatsResource,
  CategoriesResource,
  HubResource,
  AddResource,
} from "./resources/index.js";

const DEFAULT_BASE_URL = "https://api.podcastindex.org/api/1.0";
const DEFAULT_USER_AGENT = "podcastindex-js/1.0.0";

export class PodcastIndex {
  readonly search: SearchResource;
  readonly podcasts: PodcastsResource;
  readonly episodes: EpisodesResource;
  readonly recent: RecentResource;
  readonly value: ValueResource;
  readonly stats: StatsResource;
  readonly categories: CategoriesResource;
  readonly hub: HubResource;
  readonly add: AddResource;

  constructor(config: PodcastIndexConfig = {}) {
    const auth =
      config.key && config.secret
        ? new AuthProvider({ key: config.key, secret: config.secret })
        : undefined;

    // Resolve debug options
    const debugOpts = resolveDebugOptions(config.debug);
    const debugLogger = debugOpts?.logger;

    if (auth && debugOpts?.auth !== false && debugLogger) {
      auth.setDebugLogger(debugLogger);
    }

    const http = new HttpClient({
      baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
      auth,
      userAgent: config.userAgent ?? DEFAULT_USER_AGENT,
      debug: debugLogger
        ? {
            request: debugOpts?.request,
            response: debugOpts?.response,
            logger: debugLogger,
          }
        : undefined,
    });

    this.search = new SearchResource(http);
    this.podcasts = new PodcastsResource(http);
    this.episodes = new EpisodesResource(http);
    this.recent = new RecentResource(http);
    this.value = new ValueResource(http);
    this.stats = new StatsResource(http);
    this.categories = new CategoriesResource(http);
    this.hub = new HubResource(http);
    this.add = new AddResource(http);
  }
}

function resolveDebugOptions(
  debug: boolean | DebugOptions | undefined,
): (DebugOptions & { logger: NonNullable<DebugOptions["logger"]> }) | undefined {
  if (!debug) return undefined;
  if (debug === true) {
    return { request: true, response: true, auth: true, logger: console.error };
  }
  return {
    request: debug.request ?? true,
    response: debug.response ?? true,
    auth: debug.auth ?? true,
    logger: debug.logger ?? console.error,
  };
}
