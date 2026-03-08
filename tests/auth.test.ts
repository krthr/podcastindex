import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AuthProvider } from "../src/auth.js";

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("generates correct auth headers", () => {
    const auth = new AuthProvider({ key: "TESTKEY", secret: "TESTSECRET" });
    const headers = auth.getHeaders();

    expect(headers["X-Auth-Key"]).toBe("TESTKEY");
    expect(headers["X-Auth-Date"]).toBe(
      String(Math.floor(new Date("2024-01-15T12:00:00Z").getTime() / 1000)),
    );
    expect(headers["Authorization"]).toBeDefined();
    expect(typeof headers["Authorization"]).toBe("string");
    expect(headers["Authorization"]).toHaveLength(40); // SHA-1 hex digest
  });

  it("produces deterministic hash for same timestamp", () => {
    const auth = new AuthProvider({ key: "mykey", secret: "mysecret" });
    const h1 = auth.getHeaders();
    const h2 = auth.getHeaders();

    expect(h1["Authorization"]).toBe(h2["Authorization"]);
    expect(h1["X-Auth-Date"]).toBe(h2["X-Auth-Date"]);
  });

  it("produces different hash for different credentials", () => {
    const auth1 = new AuthProvider({ key: "key1", secret: "secret1" });
    const auth2 = new AuthProvider({ key: "key2", secret: "secret2" });

    expect(auth1.getHeaders()["Authorization"]).not.toBe(
      auth2.getHeaders()["Authorization"],
    );
  });

  it("uses SHA-1 of key+secret+timestamp", async () => {
    const { createHash } = await import("node:crypto");
    const ts = Math.floor(Date.now() / 1000);
    const expected = createHash("sha1")
      .update("TESTKEY" + "TESTSECRET" + ts)
      .digest("hex");

    const auth = new AuthProvider({ key: "TESTKEY", secret: "TESTSECRET" });
    const headers = auth.getHeaders();

    expect(headers["Authorization"]).toBe(expected);
  });
});
