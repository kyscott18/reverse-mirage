import { type Address, type Hex, type PublicClient } from "viem";
import { createAmountFromRaw } from "../amountUtils.js";
import { solmateErc20ABI as solmateERC20ABI } from "../generated.js";
import { createReverseMirage } from "../readUtils.js";
import type { ReverseMirage, ReverseMirageRead } from "../types.js";
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

export const erc20BalanceOf = <
  TA extends {
    args: {
      erc20: BaseERC20;
      address: Address;
    };
  } & (
    | {
        type: "split";
      }
    | {
        publicClient: PublicClient;
      }
  ),
>(
  a: TA,
) =>
  ("type" in a
    ? {
        read: (publicClient: PublicClient) =>
          publicClient.readContract({
            abi: solmateERC20ABI,
            address: a.args.erc20.address,
            functionName: "balanceOf",
            args: [a.args.address],
          }),
        parse: (data: bigint) => createAmountFromRaw(a.args.erc20, data),
      }
    : a.publicClient
        .readContract({
          abi: solmateERC20ABI,
          address: a.args.erc20.address,
          functionName: "balanceOf",
          args: [a.args.address],
        })
        .then((data) =>
          createAmountFromRaw(a.args.erc20, data),
        )) as typeof a extends { type: "split" }
    ? ReverseMirageRead<bigint, ERC20Amount<TA["args"]["erc20"]>>
    : Promise<ERC20Amount<TA["args"]["erc20"]>>;

export const erc20Allowance = <
  TA extends {
    args: {
      erc20: BaseERC20;
      address: Address;
      spender: Address;
    };
  } & (
    | {
        type: "split";
      }
    | {
        publicClient: PublicClient;
      }
  ),
>(
  a: TA,
) =>
  ("type" in a
    ? {
        read: (publicClient: PublicClient) =>
          publicClient.readContract({
            abi: solmateERC20ABI,
            address: a.args.erc20.address,
            functionName: "allowance",
            args: [a.args.address, a.args.spender],
          }),
        parse: (data: bigint) => createAmountFromRaw(a.args.erc20, data),
      }
    : a.publicClient
        .readContract({
          abi: solmateERC20ABI,
          address: a.args.erc20.address,
          functionName: "allowance",
          args: [a.args.address, a.args.spender],
        })
        .then((data) =>
          createAmountFromRaw(a.args.erc20, data),
        )) as typeof a extends { type: "split" }
    ? ReverseMirageRead<bigint, ERC20Amount<TA["args"]["erc20"]>>
    : Promise<ERC20Amount<TA["args"]["erc20"]>>;

export const erc20TotalSupply = <
  TA extends {
    args: {
      erc20: BaseERC20;
    };
  } & (
    | {
        type: "split";
      }
    | {
        publicClient: PublicClient;
      }
  ),
>(
  a: TA,
) =>
  ("type" in a
    ? {
        read: (publicClient: PublicClient) =>
          publicClient.readContract({
            abi: solmateERC20ABI,
            address: a.args.erc20.address,
            functionName: "totalSupply",
          }),
        parse: (data: bigint) => createAmountFromRaw(a.args.erc20, data),
      }
    : a.publicClient
        .readContract({
          abi: solmateERC20ABI,
          address: a.args.erc20.address,
          functionName: "totalSupply",
        })
        .then((data) =>
          createAmountFromRaw(a.args.erc20, data),
        )) as typeof a extends { type: "split" }
    ? ReverseMirageRead<bigint, ERC20Amount<TA["args"]["erc20"]>>
    : Promise<ERC20Amount<TA["args"]["erc20"]>>;

export const erc20Name: ReverseMirage<
  string,
  string,
  {
    erc20: Pick<BaseERC20, "address">;
  }
> = createReverseMirage(
  (args: {
    erc20: Pick<BaseERC20, "address">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "name",
      }),
    parse: (data) => data,
  }),
);

export const erc20Symbol: ReverseMirage<
  string,
  string,
  {
    erc20: Pick<BaseERC20, "address">;
  }
> = createReverseMirage(
  (args: {
    erc20: Pick<BaseERC20, "address">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "symbol",
      }),
    parse: (data: string) => data,
  }),
);

export const erc20Decimals: ReverseMirage<
  number,
  number,
  {
    erc20: Pick<BaseERC20, "address">;
  }
> = createReverseMirage(
  (args: {
    erc20: Pick<BaseERC20, "address">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "decimals",
      }),
    parse: (data) => data,
  }),
);

export const erc20PermitNonce: ReverseMirage<
  bigint,
  bigint,
  {
    erc20: ERC20Permit;
    address: Address;
  }
> = createReverseMirage(
  (args: {
    erc20: ERC20Permit;
    address: Address;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "nonces",
        args: [args.address],
      }),
    parse: (data) => data,
  }),
);

export const erc20PermitData = <
  TA extends {
    args: {
      erc20: ERC20Permit;
      address: Address;
    };
  } & (
    | {
        type: "split";
      }
    | {
        publicClient: PublicClient;
      }
  ),
>(
  a: TA,
) =>
  ("type" in a
    ? {
        read: (publicClient: PublicClient) =>
          Promise.all([
            publicClient.readContract({
              abi: solmateERC20ABI,
              address: a.args.erc20.address,
              functionName: "balanceOf",
              args: [a.args.address],
            }),
            publicClient.readContract({
              abi: solmateERC20ABI,
              address: a.args.erc20.address,
              functionName: "nonces",
              args: [a.args.address],
            }),
          ]),
        parse: (data) =>
          createERC20PermitDataFromRaw(a.args.erc20, data[0], data[1]),
      }
    : Promise.all([
        a.publicClient.readContract({
          abi: solmateERC20ABI,
          address: a.args.erc20.address,
          functionName: "balanceOf",
          args: [a.args.address],
        }),
        a.publicClient.readContract({
          abi: solmateERC20ABI,
          address: a.args.erc20.address,
          functionName: "nonces",
          args: [a.args.address],
        }),
      ]).then((data) =>
        createERC20PermitDataFromRaw(a.args.erc20, data[0], data[1]),
      )) as typeof a extends { type: "split" }
    ? ReverseMirageRead<[bigint, bigint], ERC20PermitData<TA["args"]["erc20"]>>
    : Promise<ERC20PermitData<TA["args"]["erc20"]>>;

export const erc20PermitDomainSeparator: ReverseMirage<
  Hex,
  Hex,
  {
    erc20: Pick<ERC20Permit, "address">;
  }
> = createReverseMirage(
  (args: {
    erc20: Pick<ERC20Permit, "address">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "DOMAIN_SEPARATOR",
      }),
    parse: (data) => data,
  }),
);

export const getERC20: ReverseMirage<
  [string, string, number],
  ERC20,
  {
    erc20: Pick<BaseERC20, "address" | "chainID"> &
      Partial<Pick<BaseERC20, "blockCreated">>;
  }
> = createReverseMirage(
  (args: {
    erc20: Pick<BaseERC20, "address" | "chainID"> &
      Partial<Pick<BaseERC20, "blockCreated">>;
  }) => ({
    read: (publicClient: PublicClient) =>
      Promise.all([
        erc20Name({ args, type: "split" }).read(publicClient),
        erc20Symbol({ args, type: "split" }).read(publicClient),
        erc20Decimals({ args, type: "split" }).read(publicClient),
      ]),
    parse: (data): ERC20 =>
      createERC20(
        args.erc20.address,
        data[0],
        data[1],
        data[2],
        args.erc20.chainID,
        args.erc20.blockCreated,
      ),
  }),
);

export const getERC20Permit: ReverseMirage<
  [string, string, number],
  ERC20Permit,
  {
    erc20: Pick<ERC20Permit, "address" | "chainID"> &
      Partial<Pick<ERC20Permit, "version" | "blockCreated">>;
  }
> = createReverseMirage(
  (args: {
    erc20: Pick<ERC20Permit, "address" | "chainID"> &
      Partial<Pick<ERC20Permit, "version" | "blockCreated">>;
  }) => ({
    read: (publicClient: PublicClient) =>
      Promise.all([
        erc20Name({ args, type: "split" }).read(publicClient),
        erc20Symbol({ args, type: "split" }).read(publicClient),
        erc20Decimals({ args, type: "split" }).read(publicClient),
      ]),
    parse: (data): ERC20Permit =>
      createERC20Permit(
        args.erc20.address,
        data[0],
        data[1],
        data[2],
        args.erc20.version ?? "1",
        args.erc20.chainID,
        args.erc20.blockCreated,
      ),
  }),
);

/**
 * Returns either a {@link ERC20} or {@link ERC20Permit} depending on whether the specified token implements EIP 2616\
 *
 * Implementation is determined by checking if calling `DOMAIN_SEPARATOR()` reverts
 */
export const erc20IsPermit: ReverseMirage<
  [[string, string, number], Hex] | [[string, string, number]],
  ERC20 | ERC20Permit,
  {
    erc20: Pick<BaseERC20, "address" | "chainID"> &
      Partial<Pick<BaseERC20, "blockCreated">> &
      Partial<Pick<ERC20Permit, "version">>;
  }
> = createReverseMirage(
  (args: {
    erc20: Pick<BaseERC20, "address" | "chainID"> &
      Partial<Pick<BaseERC20, "blockCreated">> &
      Partial<Pick<ERC20Permit, "version">>;
  }) => ({
    read: async (publicClient: PublicClient) => {
      try {
        return await Promise.all([
          getERC20({ args, type: "split" }).read(publicClient),
          erc20PermitDomainSeparator({ args, type: "split" }).read(
            publicClient,
          ),
        ]);
      } catch {
        return await Promise.all([
          getERC20({ args, type: "split" }).read(publicClient),
        ]);
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
            args.erc20.blockCreated,
          )
        : createERC20Permit(
            args.erc20.address,
            data[0][0],
            data[0][1],
            data[0][2],
            args.erc20.version ?? "1",
            args.erc20.chainID,
            args.erc20.blockCreated,
          ),
  }),
);
