export class PodcastIndexError extends Error {
  override name = "PodcastIndexError";

  constructor(
    message: string,
    public status?: number,
    public code?: number,
    public description?: string,
  ) {
    super(message);
  }
}
