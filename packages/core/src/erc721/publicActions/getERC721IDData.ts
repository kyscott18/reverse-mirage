import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC721, ERC721IDData } from "../types.js";

export type GetERC721IDDataParameters<TERC721 extends ERC721> = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "ownerOf">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<TERC721, "address" | "id">; address: Address };

export type GetERC721IDDataReturnType<TERC721 extends ERC721> =
  ERC721IDData<TERC721>;

export const getERC721IDData = <
  TChain extends Chain | undefined,
  TERC721 extends ERC721,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetERC721IDDataParameters<TERC721>,
  type?: T,
): ReverseMirage<Address, GetERC721IDDataReturnType<TERC721>, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "ownerOf",
        args: [args.erc721.id],
      }).then((data) => data === args.address)
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC721ABI,
            address: args.erc721.address,
            functionName: "ownerOf",
            args: [args.erc721.id],
          }),
        parse: (data) => data === args.address,
      }) as ReverseMirage<Address, GetERC721IDDataReturnType<TERC721>, T>;
