import { ALICE, localHttpUrl, localWsUrl } from "./constants.js";
import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  http,
} from "viem";
import { localhost, mainnet } from "viem/chains";
import type { Chain } from "viem/chains";

export const anvil = {
  ...localhost,
  id: 1,
  contracts: mainnet.contracts,
  rpcUrls: {
    default: {
      http: [localHttpUrl],
      webSocket: [localWsUrl],
    },
    public: {
      http: [localHttpUrl],
      webSocket: [localWsUrl],
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
