import { createAmountFromRaw } from "../amountUtils.js";
import { erc20ABI } from "../generated.js";
import type { ReverseMirageRead } from "../types.js";
import type {
  ERC20,
  ERC20Amount,
  ERC20Permit,
  ERC20PermitData,
} from "./types.js";
import { type Address, type Hex, type PublicClient, getAddress } from "viem";

export const erc20BalanceOf = <TERC20 extends ERC20>(
  publicClient: PublicClient,
  args: { erc20: TERC20; address: Address },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "balanceOf",
        args: [args.address],
      }),
    parse: (data): ERC20Amount<TERC20> => createAmountFromRaw(args.erc20, data),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20PermitNonce = (
  publicClient: PublicClient,
  args: { erc20: ERC20; address: Address },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "nonces",
        args: [args.address],
      }),
    parse: (data): bigint => data,
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20PermitData = <TERC20 extends ERC20Permit>(
  publicClient: PublicClient,
  args: { erc20: TERC20; address: Address },
) => {
  return {
    read: () =>
      Promise.all([
        publicClient.readContract({
          abi: erc20ABI,
          address: args.erc20.address,
          functionName: "balanceOf",
          args: [args.address],
        }),
        publicClient.readContract({
          abi: erc20ABI,
          address: args.erc20.address,
          functionName: "nonces",
          args: [args.address],
        }),
      ]),
    parse: (data): ERC20PermitData<TERC20> => ({
      ...createAmountFromRaw(args.erc20, data[0]),
      nonce: data[1],
    }),
  } satisfies ReverseMirageRead<[bigint, bigint]>;
};

export const erc20Allowance = <TERC20 extends ERC20>(
  publicClient: PublicClient,
  args: { erc20: TERC20; address: Address; spender: Address },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "allowance",
        args: [args.address, args.spender],
      }),
    parse: (data): ERC20Amount<TERC20> => createAmountFromRaw(args.erc20, data),
  } satisfies ReverseMirageRead<bigint>;
};

export const erc20TotalSupply = <TERC20 extends ERC20>(
  publicClient: PublicClient,
  args: { erc20: TERC20 },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "totalSupply",
      }),
    parse: (data): ERC20Amount<TERC20> => createAmountFromRaw(args.erc20, data),
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

export const erc20PermitDomainSeparator = (
  publicClient: PublicClient,
  args: { erc20: Pick<ERC20Permit, "address"> },
) => {
  return {
    read: () =>
      publicClient.readContract({
        abi: erc20ABI,
        address: args.erc20.address,
        functionName: "DOMAIN_SEPARATOR",
      }),
    parse: (data) => data,
  } satisfies ReverseMirageRead<Hex>;
};

export const getErc20 = (
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
    parse: (data): ERC20 => ({
      type: "erc20",
      name: data[0],
      symbol: data[1],
      decimals: data[2],
      address: getAddress(args.erc20.address),
      chainID: args.erc20.chainID,
    }),
  } satisfies ReverseMirageRead<[string, string, number]>;
};

export const getErc20Permit = (
  publicClient: PublicClient,
  args: {
    erc20: Pick<ERC20Permit, "address" | "chainID"> &
      Partial<Pick<ERC20Permit, "version">>;
  },
) => {
  return {
    read: () =>
      Promise.all([
        erc20Name(publicClient, args).read(),
        erc20Symbol(publicClient, args).read(),
        erc20Decimals(publicClient, args).read(),
      ]),
    parse: (data): ERC20Permit => ({
      type: "erc20",
      name: data[0],
      symbol: data[1],
      decimals: data[2],
      address: getAddress(args.erc20.address),
      chainID: args.erc20.chainID,
      version: args.erc20.version ?? "1",
    }),
  } satisfies ReverseMirageRead<[string, string, number]>;
};

export const erc20IsPermit = () => {};
