import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    benchmark: {
      outputFile: "./bench/report.json",
      reporters: process.env.CI ? ["json"] : ["verbose"],
    },
    environment: "node",
    include: ["**/*.test.ts"],
    testTimeout: 10_000,
    globalSetup: ["src/test/globalSetup.ts"],
  },
});
