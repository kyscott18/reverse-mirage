import { erc20ABI } from "./erc20Abi.js";
import { ReverseMirageRead } from "./types.js";
import { NativeCurrency, Token } from "@uniswap/sdk-core";
import { CurrencyAmount } from "@uniswap/sdk-core";
import {
  Address,
  PublicClient,
  SendTransactionParameters,
  SimulateContractParameters,
  getAddress,
} from "viem";

export const nativeBalance = (
  publicClient: PublicClient,
  args: { nativeCurrency: NativeCurrency; address: Address },
) => {
  return {
    read: () => publicClient.getBalance({ address: args.address }),
    parse: (data) =>
      CurrencyAmount.fromRawAmount(args.nativeCurrency, data.toString()),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20BalanceOf = (
  publicClient: PublicClient,
  args: { token: Token; address: Address },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.token.address as Address,
        functionName: "balanceOf",
        args: [args.address],
      }),
    parse: (data) => CurrencyAmount.fromRawAmount(args.token, data.toString()),
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
        address: getAddress(args.token.address),
        functionName: "allowance",
        args: [args.address, args.spender],
      }),
    parse: (data) => CurrencyAmount.fromRawAmount(args.token, data.toString()),
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
        address: getAddress(args.token.address),
        functionName: "totalSupply",
      }),
    parse: (data) => CurrencyAmount.fromRawAmount(args.token, data.toString()),
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
        address: getAddress(args.token.address),
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
        address: getAddress(args.token.address),
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
        address: getAddress(args.token.address),
        functionName: "decimals",
      }),
    parse: (data) => data,
  } satisfies ReverseMirageRead<number>;
};

export const erc20GetToken = (
  publicClient: PublicClient,
  args: { token: Pick<Token, "address" | "chainId"> },
) => {
  return {
    read: () =>
      Promise.all([
        erc20Name(publicClient, args).read(),
        erc20Symbol(publicClient, args).read(),
        erc20Decimals(publicClient, args).read(),
      ]),
    parse: (data) =>
      new Token(
        args.token.chainId,
        args.token.address,
        data[2],
        data[1],
        data[0],
      ),
  } satisfies ReverseMirageRead<[string, string, number]>;
};

export const nativeTransfer = (args: {
  to: Address;
  amount: CurrencyAmount<NativeCurrency>;
}) => {
  return {
    to: args.to,
    value: BigInt(args.amount.quotient.toString()),
  } satisfies Omit<SendTransactionParameters, "account" | "chain">;
};

export const erc20Transfer = (args: {
  to: Address;
  amount: CurrencyAmount<Token>;
}) => {
  return {
    address: args.amount.currency.address as Address,
    abi: erc20ABI,
    functionName: "transfer",
    args: [args.to, BigInt(args.amount.quotient.toString())],
  } satisfies SimulateContractParameters<typeof erc20ABI, "transfer">;
};

export const erc20Approve = (args: {
  spender: Address;
  amount: CurrencyAmount<Token>;
}) => {
  return {
    address: args.amount.currency.address as Address,
    abi: erc20ABI,
    functionName: "approve",
    args: [args.spender, BigInt(args.amount.quotient.toString())],
  } satisfies SimulateContractParameters<typeof erc20ABI, "approve">;
};

export const erc20TransferFrom = (args: {
  from: Address;
  to: Address;
  amount: CurrencyAmount<Token>;
}) => {
  return {
    address: args.amount.currency.address as Address,
    abi: erc20ABI,
    functionName: "transferFrom",
    args: [args.to, args.from, BigInt(args.amount.quotient.toString())],
  } satisfies SimulateContractParameters<typeof erc20ABI, "transferFrom">;
};
