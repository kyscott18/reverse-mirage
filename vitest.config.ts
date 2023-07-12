import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    benchmark: {
      outputFile: "./bench/report.json",
      reporters: process.env.CI ? ["json"] : ["verbose"],
    },
    environment: "node",
    include: ["**/*.test.ts"],
    setupFiles: ["src/test/setup.ts"],
    testTimeout: 10_000,
    globalSetup: ["src/test/globalSetup.ts"],
  },
});
