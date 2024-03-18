import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/actions";
import { solmateErc721Abi as solmateERC721Abi } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type GetERC721TokenURIParameters = Omit<
  ReadContractParameters<typeof solmateERC721Abi, "tokenURI">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address">; id: bigint };

export type GetERC721TokenURIReturnType = string;

export const getERC721TokenURI = <TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { erc721, id, ...request }: GetERC721TokenURIParameters,
): Promise<GetERC721TokenURIReturnType> =>
  readContract(client, {
    abi: solmateERC721Abi,
    address: erc721.address,
    functionName: "tokenURI",
    args: [id],
    ...request,
  });
