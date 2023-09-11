import { type Address, type Hex, type PublicClient } from "viem";
import { createAmountFromRaw } from "../amountUtils.js";
import { solmateErc20ABI as solmateERC20ABI } from "../generated.js";
import type { ReverseMirageRead } from "../types.js";
import type {
  BaseERC20,
  ERC20,
  ERC20Amount,
  ERC20Permit,
  ERC20PermitData,
} from "./types.js";
import {
  createERC20,
  createERC20Permit,
  createERC20PermitDataFromRaw,
} from "./utils.js";

export const erc20BalanceOf = <TERC20 extends BaseERC20>(args: {
  erc20: TERC20;
  address: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "balanceOf",
        args: [args.address],
      }),
    parse: (data): ERC20Amount<TERC20> => createAmountFromRaw(args.erc20, data),
  }) as const satisfies ReverseMirageRead<bigint>;

export const erc20Allowance = <TERC20 extends BaseERC20>(args: {
  erc20: TERC20;
  address: Address;
  spender: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "allowance",
        args: [args.address, args.spender],
      }),
    parse: (data): ERC20Amount<TERC20> => createAmountFromRaw(args.erc20, data),
  }) as const satisfies ReverseMirageRead<bigint>;

export const erc20TotalSupply = <TERC20 extends BaseERC20>(args: {
  erc20: TERC20;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "totalSupply",
      }),
    parse: (data): ERC20Amount<TERC20> => createAmountFromRaw(args.erc20, data),
  }) as const satisfies ReverseMirageRead<bigint>;

export const erc20Name = (args: {
  erc20: Pick<BaseERC20, "address">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "name",
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<string>;

export const erc20Symbol = (args: {
  erc20: Pick<BaseERC20, "address">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "symbol",
      }),
    parse: (data: string) => data,
  }) as const satisfies ReverseMirageRead<string>;

export const erc20Decimals = (args: {
  erc20: Pick<BaseERC20, "address">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "decimals",
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<number>;

export const erc20PermitNonce = (args: {
  erc20: ERC20Permit;
  address: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "nonces",
        args: [args.address],
      }),
    parse: (data): bigint => data,
  }) as const satisfies ReverseMirageRead<bigint>;

export const erc20PermitData = <TERC20 extends ERC20Permit>(args: {
  erc20: TERC20;
  address: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      Promise.all([
        publicClient.readContract({
          abi: solmateERC20ABI,
          address: args.erc20.address,
          functionName: "balanceOf",
          args: [args.address],
        }),
        publicClient.readContract({
          abi: solmateERC20ABI,
          address: args.erc20.address,
          functionName: "nonces",
          args: [args.address],
        }),
      ]),
    parse: (data): ERC20PermitData<TERC20> =>
      createERC20PermitDataFromRaw(args.erc20, data[0], data[1]),
  }) as const satisfies ReverseMirageRead<[bigint, bigint]>;

export const erc20PermitDomainSeparator = (args: {
  erc20: Pick<ERC20Permit, "address">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "DOMAIN_SEPARATOR",
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<Hex>;

export const getERC20 = (args: {
  erc20: Pick<ERC20, "address" | "chainID">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      Promise.all([
        erc20Name(args).read(publicClient),
        erc20Symbol(args).read(publicClient),
        erc20Decimals(args).read(publicClient),
      ]),
    parse: (data): ERC20 =>
      createERC20(
        args.erc20.address,
        data[0],
        data[1],
        data[2],
        args.erc20.chainID,
      ),
  }) as const satisfies ReverseMirageRead<[string, string, number]>;

export const getERC20Permit = (args: {
  erc20: Pick<ERC20Permit, "address" | "chainID"> &
    Partial<Pick<ERC20Permit, "version">>;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      Promise.all([
        erc20Name(args).read(publicClient),
        erc20Symbol(args).read(publicClient),
        erc20Decimals(args).read(publicClient),
      ]),
    parse: (data): ERC20Permit =>
      createERC20Permit(
        args.erc20.address,
        data[0],
        data[1],
        data[2],
        args.erc20.version ?? "1",
        args.erc20.chainID,
      ),
  }) as const satisfies ReverseMirageRead<[string, string, number]>;

/**
 * Returns either a {@link ERC20} or {@link ERC20Permit} depending on whether the specified token implements EIP 2616\
 *
 * Implementation is determined by checking if calling `DOMAIN_SEPARATOR()` reverts
 */
export const erc20IsPermit = (args: {
  erc20: Pick<ERC20, "address" | "chainID"> &
    Partial<Pick<ERC20Permit, "version">>;
}) =>
  ({
    read: async (publicClient: PublicClient) => {
      try {
        return await Promise.all([
          getERC20(args).read(publicClient),
          erc20PermitDomainSeparator(args).read(publicClient),
        ]);
      } catch {
        return await Promise.all([getERC20(args).read(publicClient)]);
      }
    },
    parse: (data): ERC20 | ERC20Permit =>
      data.length === 1
        ? createERC20(
            args.erc20.address,
            data[0][0],
            data[0][1],
            data[0][2],
            args.erc20.chainID,
          )
        : createERC20Permit(
            args.erc20.address,
            data[0][0],
            data[0][1],
            data[0][2],
            args.erc20.version ?? "1",
            args.erc20.chainID,
          ),
  }) as const satisfies ReverseMirageRead<
    [[string, string, number], Hex] | [[string, string, number]]
  >;
