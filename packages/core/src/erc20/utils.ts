import { type Address, getAddress, hashTypedData } from "viem";
import type { ERC20, ERC20Permit, ERC20PermitData } from "./types.js";

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

export const createErc20Permit = (
  address: Address,
  name: string,
  symbol: string,
  decimals: number,
  version: string,
  chainID: number,
): ERC20Permit => ({
  type: "erc20",
  address: getAddress(address),
  name,
  symbol,
  decimals,
  version,
  chainID,
});

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
