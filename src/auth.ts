import { createHash } from "node:crypto";

export interface AuthCredentials {
  key: string;
  secret: string;
}

export class AuthProvider {
  constructor(private credentials: AuthCredentials) {}

  getHeaders(): Record<string, string> {
    const ts = Math.floor(Date.now() / 1000);
    const hash = createHash("sha1")
      .update(this.credentials.key + this.credentials.secret + ts)
      .digest("hex");

    return {
      "X-Auth-Key": this.credentials.key,
      "X-Auth-Date": String(ts),
      Authorization: hash,
    };
  }
}
