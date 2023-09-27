import { type Address } from "viem";
import { getAddress } from "viem/utils";
import type { WETH } from "./types.js";

/**
 * Creates an {@link WETH}
 */
export const createWETH = (
  address: Address,
  name: string,
  symbol: string,
  decimals: number,
  chainID: number,
  blockCreated = 0n,
): WETH => ({
  type: "weth",
  address: getAddress(address),
  name,
  symbol,
  decimals,
  chainID,
  blockCreated,
});
