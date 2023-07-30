import type { Amount } from "../amountUtils.js";
import type { Token } from "../types.js";
import type { Hex } from "viem";
import type { Address } from "viem/accounts";

export type ERC20 = Token<"erc20"> & {
  address: Address;
  decimals: number;
};

export type ERC20Permit = ERC20 & { domainSeparator: Hex };

export type ERC20Data<TERC20 extends ERC20> = Amount<TERC20>;

export type ERC20Amount<TERC20 extends ERC20> = ERC20Data<TERC20>;

export type ERC20PermitData<TERC20 extends ERC20> = ERC20Data<TERC20> & {
  nonce: bigint;
};

export type ERC20PermitAmount<TERC20 extends ERC20> = ERC20PermitData<TERC20>;
