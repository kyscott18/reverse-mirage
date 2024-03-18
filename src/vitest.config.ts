import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    testTimeout: 10_000,
    globalSetup: ["_test/globalSetup.ts"],
    coverage: {
      reporter: process.env.CI ? ["lcov"] : ["text", "json", "html"],
      exclude: [
        "**/dist/**",
        "**/chains/**",
        "**/*.test.ts",
        "**/*.bench.ts",
        "**/index.ts",
        "**/*.test-d.ts",
        "**/_test/**",
        "generated.ts",
      ],
    },
  },
});
