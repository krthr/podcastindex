import { createHash } from "node:crypto";

export interface AuthCredentials {
  key: string;
  secret: string;
}

export type DebugLogger = (message: string, ...args: unknown[]) => void;

export class AuthProvider {
  private logger?: DebugLogger;

  constructor(private credentials: AuthCredentials) {}

  setDebugLogger(logger: DebugLogger): void {
    this.logger = logger;
  }

  getHeaders(): Record<string, string> {
    const ts = Math.floor(Date.now() / 1000);
    const hash = createHash("sha1")
      .update(this.credentials.key + this.credentials.secret + ts)
      .digest("hex");

    if (this.logger) {
      this.logger("[auth] generating headers", {
        key: this.credentials.key,
        timestamp: ts,
        hash,
      });
    }

    return {
      "X-Auth-Key": this.credentials.key,
      "X-Auth-Date": String(ts),
      Authorization: hash,
    };
  }
}
