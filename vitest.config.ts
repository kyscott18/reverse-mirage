import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    setupFiles: ["src/test/setup.ts"],
    testTimeout: 10_000,
    globalSetup: ["src/test/globalSetup.ts"],
  },
});
