import type { Address } from "viem/accounts";
import type { Amount } from "../amount/types.js";
import type { Token, TokenData } from "../types/token.js";

export type BaseERC20<TType extends string = string> = Token<TType> & {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  blockCreated: bigint;
};

export type ERC20 = BaseERC20<"erc20">;

export type ERC20Permit = BaseERC20<"erc20Permit"> & {
  version: string;
};

export type ERC20Data<TERC20 extends BaseERC20> = Amount<
  TERC20,
  `${TERC20["type"]}Amount`
>;

export type ERC20Amount<TERC20 extends BaseERC20> = Amount<
  TERC20,
  `${TERC20["type"]}Amount`
>;

export type ERC20PermitData<TERC20 extends ERC20Permit> = TokenData<
  TERC20,
  `${TERC20["type"]}Data`,
  { amount: bigint; nonce: bigint }
>;
