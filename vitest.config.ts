import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.test.ts"],
    setupFiles: ["./test/setup.ts"],
    testTimeout: 10_000,
    globalSetup: ["./test/globalSetup.ts"],
  },
});
