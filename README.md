# podcastindex

TypeScript client for the [PodcastIndex.org](https://podcastindex.org/) API. Covers all 9 endpoint groups (39 methods) with Zod runtime response validation.

- ESM + CJS dual build
- Native `fetch` (Node.js 18+, Bun, Deno)
- Zod v4 schemas for all responses
- Stripe-style namespaced API
- Direct `.ts` source exports for Bun and Deno

## Install

```bash
npm install podcastindex
```

## Quick start

Get your free API credentials at [api.podcastindex.org](https://api.podcastindex.org/).

```ts
import { PodcastIndex } from "podcastindex";

const client = new PodcastIndex({
  key: "YOUR_API_KEY",
  secret: "YOUR_API_SECRET",
});

// Search podcasts
const results = await client.search.byTerm({ q: "javascript" });
console.log(results.feeds);

// Get a podcast by feed ID
const podcast = await client.podcasts.byFeedId({ id: 75075 });
console.log(podcast.feed.title);

// Get episodes
const episodes = await client.episodes.byFeedId({ id: 75075, max: 5 });
console.log(episodes.items);

// Trending podcasts
const trending = await client.podcasts.trending({ max: 10, lang: "en" });
console.log(trending.feeds);
```

## API

### Configuration

```ts
const client = new PodcastIndex({
  key: "...",          // API key (optional for unauthenticated endpoints)
  secret: "...",       // API secret
  baseUrl: "...",      // Override base URL (default: https://api.podcastindex.org/api/1.0)
  userAgent: "...",    // Custom User-Agent header
});
```

### Resources

All methods return promises with Zod-validated responses.

#### `client.search`

| Method | Endpoint |
|---|---|
| `byTerm({ q, max?, fulltext?, val?, clean? })` | `GET /search/byterm` |
| `byTitle({ q, max?, fulltext?, val?, clean?, similar? })` | `GET /search/bytitle` |
| `byPerson({ q, max?, fulltext? })` | `GET /search/byperson` |
| `musicByTerm({ q, max?, fulltext?, val?, clean? })` | `GET /search/music/byterm` |
| `musicByTitle({ q, max?, fulltext?, val?, clean? })` | `GET /search/music/bytitle` |
| `musicByPerson({ q, max?, fulltext? })` | `GET /search/music/byperson` |

#### `client.podcasts`

| Method | Endpoint |
|---|---|
| `byFeedId({ id })` | `GET /podcasts/byfeedid` |
| `byFeedIds({ id })` | `GET /podcasts/byfeedid` (comma-separated IDs) |
| `byFeedUrl({ url })` | `GET /podcasts/byfeedurl` |
| `byItunesId({ id })` | `GET /podcasts/byitunesid` |
| `byGuid({ guid })` | `GET /podcasts/byguid` |
| `byTag({ val?, clean?, max?, fulltext? })` | `GET /podcasts/bytag` |
| `byMedium({ medium, max?, val?, clean?, fulltext? })` | `GET /podcasts/bymedium` |
| `trending({ max?, lang?, since?, cat?, notcat? })` | `GET /podcasts/trending` |
| `dead()` | `GET /podcasts/dead` |

#### `client.episodes`

| Method | Endpoint |
|---|---|
| `byFeedId({ id, since?, max?, fulltext? })` | `GET /episodes/byfeedid` |
| `byFeedUrl({ url, since?, max?, fulltext? })` | `GET /episodes/byfeedurl` |
| `byPodcastGuid({ guid, since?, max?, fulltext? })` | `GET /episodes/bypodcastguid` |
| `byItunesId({ id, since?, max?, fulltext? })` | `GET /episodes/byitunesid` |
| `byId({ id, fulltext? })` | `GET /episodes/byid` |
| `byGuid({ guid, feedurl?, feedid?, fulltext? })` | `GET /episodes/byguid` |
| `live({ max? })` | `GET /episodes/live` |
| `random({ max?, lang?, cat?, notcat?, fulltext? })` | `GET /episodes/random` |

#### `client.recent`

| Method | Endpoint |
|---|---|
| `episodes({ max?, excludeString?, before?, fulltext?, lang?, cat?, notcat? })` | `GET /recent/episodes` |
| `feeds({ max?, since?, lang?, cat?, notcat? })` | `GET /recent/feeds` |
| `newFeeds({ max?, since?, feedid?, desc? })` | `GET /recent/newfeeds` |
| `data({ max? })` | `GET /recent/data` |
| `soundbites({ max? })` | `GET /recent/soundbites` |
| `newValueFeeds({ max?, since? })` | `GET /recent/newvaluefeeds` |

#### `client.value` (no auth required)

| Method | Endpoint |
|---|---|
| `byFeedId({ id })` | `GET /value/byfeedid` |
| `byFeedUrl({ url })` | `GET /value/byfeedurl` |
| `byPodcastGuid({ guid })` | `GET /value/bypodcastguid` |
| `byEpisodeGuid({ guid, feedguid? })` | `GET /value/byepisodeguid` |
| `batchByFeedId({ id })` | `GET /value/batch/byfeedid` |

#### `client.stats`

| Method | Endpoint |
|---|---|
| `current()` | `GET /stats/current` |

#### `client.categories`

| Method | Endpoint |
|---|---|
| `list()` | `GET /categories/list` |

#### `client.hub` (no auth required)

| Method | Endpoint |
|---|---|
| `pubNotify({ id?, url? })` | `GET /hub/pubnotify` |

#### `client.add`

| Method | Endpoint |
|---|---|
| `byFeedUrl({ url, chash?, itunesid? })` | `GET /add/byfeedurl` |
| `batchByFeedUrl({ url })` | `GET /add/batch/byfeedurl` |

### Unauthenticated usage

Value and hub endpoints work without credentials:

```ts
const client = new PodcastIndex();
const value = await client.value.byFeedId({ id: 920666 });
```

### Error handling

```ts
import { PodcastIndex, PodcastIndexError } from "podcastindex";

try {
  await client.search.byTerm({ q: "test" });
} catch (err) {
  if (err instanceof PodcastIndexError) {
    console.error(err.message, err.status, err.code);
  }
}
```

### Types and schemas

All types are inferred from Zod schemas and exported:

```ts
import type { Feed, Episode, ValueBlock } from "podcastindex";
import { feedSchema, episodeSchema } from "podcastindex";
```

## License

MIT
