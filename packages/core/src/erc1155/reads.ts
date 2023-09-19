import type { Address, PublicClient } from "viem";
import { solmateErc1155ABI } from "../generated.js";
import { createReverseMirage } from "../readUtils.js";
import type { ReverseMirage, ReverseMirageRead } from "../types.js";
import type { ERC1155, ERC1155Data } from "./types.js";
import { createERC1155, createERC1155Data } from "./utils.js";

export const erc1155IsApprovedForAll: ReverseMirage<
  boolean,
  boolean,
  {
    erc1155: Pick<ERC1155, "address">;
    owner: Address;
    spender: Address;
  }
> = createReverseMirage(
  (args: {
    erc1155: Pick<ERC1155, "address">;
    owner: Address;
    spender: Address;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateErc1155ABI,
        address: args.erc1155.address,
        functionName: "isApprovedForAll",
        args: [args.owner, args.spender],
      }),
    parse: (data) => data,
  }),
);

export const erc1155URI: ReverseMirage<
  string,
  string,
  {
    erc1155: Pick<ERC1155, "address" | "id">;
  }
> = createReverseMirage(
  (args: {
    erc1155: Pick<ERC1155, "address" | "id">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateErc1155ABI,
        address: args.erc1155.address,
        functionName: "uri",
        args: [args.erc1155.id],
      }),
    parse: (data) => data,
  }),
);

export const erc1155BalanceOf = <
  TA extends {
    args: {
      erc1155: ERC1155;
      address: Address;
    };
    publicClient?: PublicClient;
  },
>(
  a: TA,
) =>
  ("publicClient" in a
    ? a.publicClient
        .readContract({
          abi: solmateErc1155ABI,
          address: a.args.erc1155.address,
          functionName: "balanceOf",
          args: [a.args.address, a.args.erc1155.id],
        })
        .then((data) => createERC1155Data(a.args.erc1155, data))
    : {
        read: (publicClient: PublicClient) =>
          publicClient.readContract({
            abi: solmateErc1155ABI,
            address: a.args.erc1155.address,
            functionName: "balanceOf",
            args: [a.args.address, a.args.erc1155.id],
          }),
        parse: (data) => createERC1155Data(a.args.erc1155, data),
      }) as TA extends { publicClient: PublicClient }
    ? Promise<ERC1155Data<TA["args"]["erc1155"]>>
    : ReverseMirageRead<bigint, ERC1155Data<TA["args"]["erc1155"]>>;

export const getERC1155: ReverseMirage<
  string,
  ERC1155,
  {
    erc1155: Pick<ERC1155, "address" | "id" | "chainID"> &
      Partial<Pick<ERC1155, "blockCreated">>;
  }
> = createReverseMirage(
  (args: {
    erc1155: Pick<ERC1155, "address" | "id" | "chainID"> &
      Partial<Pick<ERC1155, "blockCreated">>;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateErc1155ABI,
        address: args.erc1155.address,
        functionName: "uri",
        args: [args.erc1155.id],
      }),
    parse: (data): ERC1155 =>
      createERC1155(
        args.erc1155.address,
        args.erc1155.id,
        data,
        args.erc1155.chainID,
        args.erc1155.blockCreated,
      ),
  }),
);
