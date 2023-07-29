import type { ERC20 } from "./types.js";
import { type Address, getAddress } from "viem";

export const createErc20 = (
  address: Address,
  name: string,
  symbol: string,
  decimals: number,
  chainID: number,
): ERC20 => ({
  type: "erc20",
  address: getAddress(address),
  name,
  symbol,
  decimals,
  chainID,
});
