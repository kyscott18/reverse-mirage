import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig([
  {
    out: "examples/next-interface/generated.ts",
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
        project: "contracts/",
        include: ["MockERC20.sol/**"],
      }),
      foundry({
        project: "contracts/lib/solmate/",
        include: ["ERC20.sol/**"],
      }),
    ],
  },
]);
