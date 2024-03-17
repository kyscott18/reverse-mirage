import { type Address } from "viem";
import { getAddress } from "viem/utils";
import {
  createAmountFromFraction,
  createAmountFromRaw,
  createAmountFromString,
} from "../amount/utils.js";
import type { Fraction } from "../fraction/types.js";
import type { ERC20, ERC20Permit, ERC20PermitData } from "./types.js";

/**
 * Creates an {@link ERC20}
 */
export const createERC20 = (
  address: Address,
  name: string,
  symbol: string,
  decimals: number,
  chainID: number,
  blockCreated = 0n,
): ERC20 => ({
  type: "erc20",
  address: getAddress(address),
  name,
  symbol,
  decimals,
  chainID,
  blockCreated,
});

/**
 * Creates an {@link ERC20Permit}
 */
export const createERC20Permit = (
  address: Address,
  name: string,
  symbol: string,
  decimals: number,
  version: string,
  chainID: number,
  blockCreated = 0n,
): ERC20Permit => ({
  type: "erc20Permit",
  address: getAddress(address),
  name,
  symbol,
  decimals,
  version,
  chainID,
  blockCreated,
});

/**
 * Creates a {@link ERC20PermitData} from a {@link erc20Permit}, a string, and a {@link nonce}
 */
export const createERC20PermitDataFromString = <TERC20 extends ERC20Permit>(
  erc20Permit: TERC20,
  amount: string,
  nonce: bigint,
): ERC20PermitData<TERC20> => ({
  ...createAmountFromString(erc20Permit, amount),
  type: `${erc20Permit.type as TERC20["type"]}Data`,
  nonce,
});

/**
 * Creates a {@link ERC20PermitData} from a {@link erc20Permit}, a {@link Fraction}, and a {@link nonce}
 */
export const createERC20PermitDataFromFraction = <TERC20 extends ERC20Permit>(
  erc20Permit: TERC20,
  amount: Fraction,
  nonce: bigint,
): ERC20PermitData<TERC20> => ({
  ...createAmountFromFraction(erc20Permit, amount),
  type: `${erc20Permit.type as TERC20["type"]}Data`,
  nonce,
});

/**
 * Creates a {@link ERC20PermitData} from a {@link erc20Permit}, a {@link Fraction}, and a {@link nonce}
 */
export const createERC20PermitDataFromRaw = <TERC20 extends ERC20Permit>(
  erc20Permit: TERC20,
  amount: bigint,
  nonce: bigint,
): ERC20PermitData<TERC20> => ({
  ...createAmountFromRaw(erc20Permit, amount),
  type: `${erc20Permit.type as TERC20["type"]}Data`,

  nonce,
});

/**
 * EIP 712 Type for Permit
 */
export const PermitType = {
  Permit: [
    {
      name: "owner",
      type: "address",
    },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
} as const;
