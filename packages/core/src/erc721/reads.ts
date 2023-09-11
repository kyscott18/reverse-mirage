import { type Address, type Hex, type PublicClient, getAddress } from "viem";
import { solmateErc721ABI as solmateERC721ABI } from "../generated.js";
import type { ReverseMirageRead } from "../types.js";
import type { ERC721, ERC721Data, ERC721IDData } from "./types.js";
import { createERC721, createERC721Data, createERC721IDData } from "./utils.js";

export const erc721Name = (args: {
  erc721: Pick<ERC721, "address">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "name",
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<string>;

export const erc721Symbol = (args: {
  erc721: Pick<ERC721, "address">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "symbol",
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<string>;

export const erc721TokenURI = (args: {
  erc721: Pick<ERC721, "address" | "id">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "tokenURI",
        args: [args.erc721.id],
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<string>;

export const erc721OwnerOf = (args: {
  erc721: Pick<ERC721, "address" | "id">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "ownerOf",
        args: [args.erc721.id],
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<Address>;

export const erc721BalanceOf = (args: {
  erc721: Pick<ERC721, "address">;
  owner: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "balanceOf",
        args: [args.owner],
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<bigint>;

export const erc721GetApproved = (args: {
  erc721: Pick<ERC721, "address" | "id">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "getApproved",
        args: [args.erc721.id],
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<Address>;

export const erc721IsApprovedForAll = (args: {
  erc721: Pick<ERC721, "address">;
  owner: Address;
  spender: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "isApprovedForAll",
        args: [args.owner, args.spender],
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<boolean>;

export const erc721SupportsInterface = (args: {
  erc721: Pick<ERC721, "address">;
  interfaceID: Hex;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "supportsInterface",
        args: [args.interfaceID],
      }),
    parse: (data) => data,
  }) as const satisfies ReverseMirageRead<boolean>;

export const getERC721 = (args: {
  erc721: Pick<ERC721, "address" | "id" | "chainID">;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      Promise.all([
        erc721Name(args).read(publicClient),
        erc721Symbol(args).read(publicClient),
        erc721TokenURI(args).read(publicClient),
      ]),
    parse: (data): ERC721 =>
      createERC721(
        args.erc721.address,
        data[0],
        data[1],
        args.erc721.id,
        data[2],
        args.erc721.chainID,
      ),
  }) as const satisfies ReverseMirageRead<[string, string, string]>;

export const erc721IDData = <TERC721 extends ERC721>(args: {
  erc721: TERC721;
  owner: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      erc721OwnerOf({ erc721: args.erc721 }).read(publicClient),
    parse: (data): ERC721IDData<TERC721> =>
      createERC721IDData(
        args.erc721,
        getAddress(data) === getAddress(args.owner),
      ),
  }) as const satisfies ReverseMirageRead<Address>;

export const erc721Data = <TERC721 extends ERC721>(args: {
  erc721: TERC721;
  owner: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      erc721BalanceOf(args).read(publicClient),
    parse: (data): ERC721Data<TERC721> => {
      if (data > Number.MAX_SAFE_INTEGER)
        throw Error("balance exceeds maximum representable number");
      return createERC721Data(args.erc721, Number(data));
    },
  }) as const satisfies ReverseMirageRead<bigint>;
