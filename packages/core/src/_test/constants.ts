import { foundry } from "viem/chains";
import type { NativeCurrency } from "../native/types.js";
import type { Token } from "../types/token.js";

// Test accounts
export const ACCOUNTS = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
] as const;

// Named accounts
export const [ALICE, BOB] = ACCOUNTS;

export const mockToken = {
  type: "token",
  chainID: foundry.id,
} as const satisfies Token;

export const anvilEther = {
  type: "nativeCurrency",
  chainID: foundry.id,
  decimals: 18,
  name: "Anvil Ether",
  symbol: "ETH",
} as const satisfies NativeCurrency;
