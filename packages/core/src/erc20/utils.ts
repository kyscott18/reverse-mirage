import { type Address, getAddress, hashTypedData } from "viem";
import {
  createAmountFromFraction,
  createAmountFromRaw,
  createAmountFromString,
} from "../amountUtils.js";
import type { Fraction } from "../types.js";
import type { ERC20, ERC20Permit, ERC20PermitData } from "./types.js";

/**
 * Creates an {@link ERC20}
 */
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

/**
 * Creates an {@link ERC20Permit}
 */
export const createErc20Permit = (
  address: Address,
  name: string,
  symbol: string,
  decimals: number,
  version: string,
  chainID: number,
): ERC20Permit => ({
  type: "erc20Permit",
  address: getAddress(address),
  name,
  symbol,
  decimals,
  version,
  chainID,
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

/**
 * Returns the EIP 712 typed data hash of type {@link PermitType}
 */
export const erc20PermitTypedDataHash = (permit: {
  amount: ERC20PermitData<ERC20Permit>;
  owner: Address;
  spender: Address;
  deadline: bigint;
}) => {
  const domain = {
    name: permit.amount.token.name,
    version: permit.amount.token.version,
    chainId: permit.amount.token.chainID,
    verifyingContract: permit.amount.token.address,
  } as const;

  return hashTypedData({
    domain,
    types: PermitType,
    primaryType: "Permit",
    message: {
      owner: permit.owner,
      spender: permit.spender,
      value: permit.amount.amount,
      nonce: permit.amount.nonce,
      deadline: permit.deadline,
    },
  });
};
