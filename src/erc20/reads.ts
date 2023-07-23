import { makeAmountFromRaw } from "../amountUtils.js";
import { erc20ABI } from "../erc20/erc20Abi.js";
import type { ERC20, ReverseMirageRead } from "../types.js";
import type { Address, PublicClient } from "viem";

export const erc20BalanceOf = (
  publicClient: PublicClient,
  args: { erc20: ERC20; address: Address },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "balanceOf",
        args: [args.address],
      }),
    parse: (data) => makeAmountFromRaw(args.erc20, data),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20Allowance = (
  publicClient: PublicClient,
  args: { erc20: ERC20; address: Address; spender: Address },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "allowance",
        args: [args.address, args.spender],
      }),
    parse: (data) => makeAmountFromRaw(args.erc20, data),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20TotalSupply = (
  publicClient: PublicClient,
  args: { erc20: ERC20 },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "totalSupply",
      }),
    parse: (data) => makeAmountFromRaw(args.erc20, data),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20Name = (
  publicClient: PublicClient,
  args: { erc20: Pick<ERC20, "address"> },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "name",
      }),
    parse: (data) => data,
  } satisfies ReverseMirageRead<string>;
};

export const erc20Symbol = (
  publicClient: PublicClient,
  args: { erc20: Pick<ERC20, "address"> },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "symbol",
      }),
    parse: (data: string) => data,
  } satisfies ReverseMirageRead<string>;
};

export const erc20Decimals = (
  publicClient: PublicClient,
  args: { erc20: Pick<ERC20, "address"> },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "decimals",
      }),
    parse: (data) => data,
  } satisfies ReverseMirageRead<number>;
};

export const erc20GetToken = (
  publicClient: PublicClient,
  args: { erc20: Pick<ERC20, "address" | "chainID"> },
) => {
  return {
    read: () =>
      Promise.all([
        erc20Name(publicClient, args).read(),
        erc20Symbol(publicClient, args).read(),
        erc20Decimals(publicClient, args).read(),
      ]),
    parse: (data) => ({
      name: data[0],
      symbol: data[1],
      decimals: data[2],
      ...args.erc20,
    }),
  } satisfies ReverseMirageRead<[string, string, number]>;
};
