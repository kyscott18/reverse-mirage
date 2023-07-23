import type { Token, TokenData } from "../types.js";
import type { Address } from "viem/accounts";

export type ERC20 = Token<"erc20"> & {
  address: Address;
  decimals: number;
};

export type ERC20Amount<TERC20 extends ERC20> = TokenData<
  TERC20,
  { amount: bigint }
>;
