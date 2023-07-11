import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/test/generated.ts",
  contracts: [],
  plugins: [
    foundry({
      project: "contracts/",
    }),
  ],
});
