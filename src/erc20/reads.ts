import { makeCurrencyAmountFromRaw } from "../currencyAmountUtils.js";
import { erc20ABI } from "../erc20/erc20Abi.js";
import type { ReverseMirageRead, Token } from "../types.js";
import type { Address, PublicClient } from "viem";

export const erc20BalanceOf = (
  publicClient: PublicClient,
  args: { token: Token; address: Address },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.token.address,
        functionName: "balanceOf",
        args: [args.address],
      }),
    parse: (data) => makeCurrencyAmountFromRaw(args.token, data),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20Allowance = (
  publicClient: PublicClient,
  args: { token: Token; address: Address; spender: Address },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.token.address,
        functionName: "allowance",
        args: [args.address, args.spender],
      }),
    parse: (data) => makeCurrencyAmountFromRaw(args.token, data),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20TotalSupply = (
  publicClient: PublicClient,
  args: { token: Token },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.token.address,
        functionName: "totalSupply",
      }),
    parse: (data) => makeCurrencyAmountFromRaw(args.token, data),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20Name = (
  publicClient: PublicClient,
  args: { token: Pick<Token, "address"> },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.token.address,
        functionName: "name",
      }),
    parse: (data) => data,
  } satisfies ReverseMirageRead<string>;
};

export const erc20Symbol = (
  publicClient: PublicClient,
  args: { token: Pick<Token, "address"> },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.token.address,
        functionName: "symbol",
      }),
    parse: (data: string) => data,
  } satisfies ReverseMirageRead<string>;
};

export const erc20Decimals = (
  publicClient: PublicClient,
  args: { token: Pick<Token, "address"> },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.token.address,
        functionName: "decimals",
      }),
    parse: (data) => data,
  } satisfies ReverseMirageRead<number>;
};

export const erc20GetToken = (
  publicClient: PublicClient,
  args: { token: Pick<Token, "address" | "chainID"> },
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
      ...args.token,
    }),
  } satisfies ReverseMirageRead<[string, string, number]>;
};
