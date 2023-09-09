import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    testTimeout: 10_000,
    globalSetup: ["src/_test/globalSetup.ts"],
    coverage: {
      reporter: process.env.CI ? ["lcov"] : ["text", "json", "html"],
      exclude: [
        "**/errors/utils.ts",
        "**/dist/**",
        "**/*.test.ts",
        "**/_test/**",
        "src/generated.ts",
      ],
    },
  },
});
