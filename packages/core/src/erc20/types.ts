import type { Address } from "viem/accounts";
import type { Amount } from "../amountUtils.js";
import type { Token, TokenData } from "../types.js";

export type ERC20 = Token<"erc20"> & {
  address: Address;
  decimals: number;
};

export type ERC20Permit = Token<"erc20Permit"> & {
  address: Address;
  decimals: number;
  version: string;
};

export type ERC20Data<TERC20 extends ERC20 | ERC20Permit> = Amount<
  TERC20,
  `${TERC20["type"]}Amount`
>;

export type ERC20Amount<TERC20 extends ERC20 | ERC20Permit> = Amount<
  TERC20,
  `${TERC20["type"]}Amount`
>;

export type ERC20PermitData<TERC20 extends ERC20Permit> = TokenData<
  TERC20,
  `${TERC20["type"]}Data`,
  { amount: bigint; nonce: bigint }
>;
