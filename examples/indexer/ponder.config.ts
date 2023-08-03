import type { Config } from "@ponder/core";

export const config: Config = {
  networks: [
    { name: "mainnet", chainId: 1, rpcUrl: process.env.PONDER_RPC_URL_1 },
  ],
  contracts: [
    {
      name: "ExampleContract",
      network: "mainnet",
      address: "0x0",
      abi: "./abis/ExampleContract.json",
      startBlock: 1234567,
    },
  ],
};
