import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig([
  {
    out: "test/generated.ts",
    contracts: [],
    plugins: [
      foundry({
        project: "contracts/",
        include: ["MockERC20.sol/**"],
      }),
    ],
  },
  {
    out: "packages/core/src/generated.ts",
    contracts: [],
    plugins: [
      foundry({
        project: "contracts/lib/solmate/",
        include: ["ERC20.sol/**"],
      }),
    ],
  },
]);
