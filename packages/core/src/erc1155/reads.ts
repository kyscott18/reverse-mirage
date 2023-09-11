import type { Address, PublicClient } from "viem";
import { solmateErc1155ABI } from "../generated.js";
import type { ReverseMirageRead } from "../types.js";
import type { ERC1155, ERC1155Data } from "./types.js";
import { createERC1155, createERC1155Data } from "./utils.js";

export const erc1155IsApprovedForAll = (args: {
  erc1155: Pick<ERC1155, "address">;
  owner: Address;
  spender: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateErc1155ABI,
        address: args.erc1155.address,
        functionName: "isApprovedForAll",
        args: [args.owner, args.spender],
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<boolean>;

export const erc1155URI = (args: {
  erc1155: Pick<ERC1155, "address" | "id">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateErc1155ABI,
        address: args.erc1155.address,
        functionName: "uri",
        args: [args.erc1155.id],
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<string>;

export const erc1155BalanceOf = <TERC1155 extends ERC1155>(args: {
  erc1155: TERC1155;
  owner: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateErc1155ABI,
        address: args.erc1155.address,
        functionName: "balanceOf",
        args: [args.owner, args.erc1155.id],
      }),
    parse: (data): ERC1155Data<TERC1155> =>
      createERC1155Data(args.erc1155, data),
  }) as const satisfies ReverseMirageRead<bigint>;

export const getERC1155 = (args: {
  erc1155: Pick<ERC1155, "address" | "id" | "chainID"> &
    Partial<Pick<ERC1155, "blockCreated">>;
}) =>
  ({
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
  }) as const satisfies ReverseMirageRead<string>;
