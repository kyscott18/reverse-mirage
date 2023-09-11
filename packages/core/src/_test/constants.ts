import { foundry } from "viem/chains";
import { getAddress, getContractAddress } from "viem/utils";
import type { ERC20Permit } from "../erc20/types.js";
import type { NativeCurrency } from "../native/types.js";
import type { Token } from "../types.js";

// Test accounts
export const ACCOUNTS = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
] as const;

// Named accounts
export const [ALICE, BOB] = ACCOUNTS;

const mockERC20Address = getAddress(
  getContractAddress({ from: ALICE, nonce: 0n }),
);

export const mockToken = {
  type: "token",
  chainID: foundry.id,
  name: "Mock ERC20",
  symbol: "MOCK",
} as const satisfies Token;

export const mockERC20 = {
  type: "erc20Permit",
  chainID: foundry.id,
  address: mockERC20Address,
  decimals: 18,
  name: "Mock ERC20",
  symbol: "MOCK",
  version: "1",
} as const satisfies ERC20Permit;

export const anvilEther = {
  type: "nativeCurrency",
  chainID: foundry.id,
  decimals: 18,
  name: "Anvil Ether",
  symbol: "ETH",
} as const satisfies NativeCurrency;
