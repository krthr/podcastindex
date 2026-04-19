import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests-integration/**/*.integration.test.ts"],
    testTimeout: 30_000,
    hookTimeout: 60_000,
    bail: 0,
    reporters: ["verbose"],
    sequence: {
      concurrent: false,
    },
    fileParallelism: false,
  },
});
