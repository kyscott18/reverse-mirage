import {
  http,
  createPublicClient,
  createTestClient,
  createWalletClient,
} from "viem";
import { foundry } from "viem/chains";
import type { Chain } from "viem/chains";
import { ALICE } from "./constants.js";

export const pool = Number(process.env.VITEST_POOL_ID ?? 1);
export const anvil = {
  ...foundry, // We are using a mainnet fork for testing.
  id: foundry.id,
  rpcUrls: {
    // These rpc urls are automatically used in the transports.
    default: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:8545/${pool}`],
      webSocket: [`ws://127.0.0.1:8545/${pool}`],
    },
    public: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:8545/${pool}`],
      webSocket: [`ws://127.0.0.1:8545/${pool}`],
    },
  },
} as const satisfies Chain;

export const testClient = createTestClient({
  chain: anvil,
  mode: "anvil",
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: anvil,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: anvil,
  transport: http(),
  account: ALICE,
});
