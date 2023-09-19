import { type Address, type Hex, type PublicClient, getAddress } from "viem";
import { solmateErc721ABI as solmateERC721ABI } from "../generated.js";
import { createReverseMirage } from "../readUtils.js";
import type { ReverseMirage, ReverseMirageRead } from "../types.js";
import type { ERC721, ERC721Data, ERC721IDData } from "./types.js";
import { createERC721, createERC721Data, createERC721IDData } from "./utils.js";

export const erc721Name: ReverseMirage<
  string,
  string,
  {
    erc721: Pick<ERC721, "address">;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "name",
      }),
    parse: (data) => data,
  }),
);

export const erc721Symbol: ReverseMirage<
  string,
  string,
  {
    erc721: Pick<ERC721, "address">;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "symbol",
      }),
    parse: (data) => data,
  }),
);

export const erc721TokenURI: ReverseMirage<
  string,
  string,
  {
    erc721: Pick<ERC721, "address" | "id">;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address" | "id">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "tokenURI",
        args: [args.erc721.id],
      }),
    parse: (data) => data,
  }),
);

export const erc721OwnerOf: ReverseMirage<
  Address,
  Address,
  {
    erc721: Pick<ERC721, "address" | "id">;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address" | "id">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "ownerOf",
        args: [args.erc721.id],
      }),
    parse: (data) => data,
  }),
);

export const erc721BalanceOf: ReverseMirage<
  bigint,
  bigint,
  {
    erc721: Pick<ERC721, "address">;
    owner: Address;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address">;
    owner: Address;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "balanceOf",
        args: [args.owner],
      }),
    parse: (data) => data,
  }),
);

export const erc721GetApproved: ReverseMirage<
  Address,
  Address,
  {
    erc721: Pick<ERC721, "address" | "id">;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address" | "id">;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "getApproved",
        args: [args.erc721.id],
      }),
    parse: (data) => data,
  }),
);

export const erc721IsApprovedForAll: ReverseMirage<
  boolean,
  boolean,
  {
    erc721: Pick<ERC721, "address">;
    owner: Address;
    spender: Address;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address">;
    owner: Address;
    spender: Address;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "isApprovedForAll",
        args: [args.owner, args.spender],
      }),
    parse: (data) => data,
  }),
);

export const erc721SupportsInterface: ReverseMirage<
  boolean,
  boolean,
  {
    erc721: Pick<ERC721, "address">;
    interfaceID: Hex;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address">;
    interfaceID: Hex;
  }) => ({
    read: (publicClient: PublicClient) =>
      publicClient.readContract({
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "supportsInterface",
        args: [args.interfaceID],
      }),
    parse: (data) => data,
  }),
);

export const getERC721: ReverseMirage<
  [string, string, string],
  ERC721,
  {
    erc721: Pick<ERC721, "address" | "id" | "chainID"> &
      Partial<Pick<ERC721, "blockCreated">>;
  }
> = createReverseMirage(
  (args: {
    erc721: Pick<ERC721, "address" | "id" | "chainID"> &
      Partial<Pick<ERC721, "blockCreated">>;
  }) => ({
    read: (publicClient: PublicClient) =>
      Promise.all([
        erc721Name({ args }).read(publicClient),
        erc721Symbol({ args }).read(publicClient),
        erc721TokenURI({ args }).read(publicClient),
      ]),
    parse: (data): ERC721 =>
      createERC721(
        args.erc721.address,
        data[0],
        data[1],
        args.erc721.id,
        data[2],
        args.erc721.chainID,
        args.erc721.blockCreated,
      ),
  }),
);

export const erc721IDData = <
  TA extends {
    args: {
      erc721: ERC721;
      owner: Address;
    };
    publicClient?: PublicClient;
  },
>(
  a: TA,
) =>
  ("publicClient" in a
    ? erc721OwnerOf({
        args: { erc721: a.args.erc721 },
      })
        .read(a.publicClient)
        .then((data) =>
          createERC721IDData(
            a.args.erc721,
            getAddress(data) === getAddress(a.args.owner),
          ),
        )
    : {
        read: (publicClient: PublicClient) =>
          erc721OwnerOf({
            args: { erc721: a.args.erc721 },
          }).read(publicClient),
        parse: (data) =>
          createERC721IDData(
            a.args.erc721,
            getAddress(data) === getAddress(a.args.owner),
          ),
      }) as TA extends { publicClient: PublicClient }
    ? Promise<ERC721IDData<TA["args"]["erc721"]>>
    : ReverseMirageRead<Address, ERC721IDData<TA["args"]["erc721"]>>;

export const erc721Data = <
  TA extends {
    args: {
      erc721: ERC721;
      owner: Address;
    };
    publicClient?: PublicClient;
  },
>(
  a: TA,
) =>
  ("publicClient" in a
    ? erc721BalanceOf({
        args: { erc721: a.args.erc721, owner: a.args.owner },
      })
        .read(a.publicClient)
        .then((data) => {
          if (data > Number.MAX_SAFE_INTEGER)
            throw Error("balance exceeds maximum representable number");
          return createERC721Data(a.args.erc721, Number(data));
        })
    : {
        read: (publicClient: PublicClient) =>
          erc721BalanceOf({
            args: { erc721: a.args.erc721, owner: a.args.owner },
          }).read(publicClient),
        parse: (data) => {
          if (data > Number.MAX_SAFE_INTEGER)
            throw Error("balance exceeds maximum representable number");
          return createERC721Data(a.args.erc721, Number(data));
        },
      }) as TA extends { publicClient: PublicClient }
    ? Promise<ERC721Data<TA["args"]["erc721"]>>
    : ReverseMirageRead<bigint, ERC721Data<TA["args"]["erc721"]>>;
