import type { Config } from "@ponder/core";

export const config: Config = {
  networks: [
    { name: "foundry", chainId: 31337, rpcUrl: "http://127.0.0.1:8545" },
  ],
  contracts: [
    {
      name: "ERC20",
      network: "foundry",
      address: "0x0",
      abi: "./abis/ExampleContract.json",
      startBlock: 1234567,
    },
  ],
};
