import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC721 } from "../types.js";

export type GetERC721TokenURIParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "tokenURI">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<ERC721, "address">; id: bigint };

export type GetERC721TokenURIReturnType = string;

export const getERC721TokenURI = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetERC721TokenURIParameters,
  type?: T,
): ReverseMirage<string, GetERC721TokenURIReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "tokenURI",
        args: [args.id],
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC721ABI,
            address: args.erc721.address,
            functionName: "tokenURI",
            args: [args.id],
          }),
        parse: (data) => data,
      }) as ReverseMirage<string, GetERC721TokenURIReturnType, T>;
