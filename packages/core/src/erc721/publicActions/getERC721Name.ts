import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/actions";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type GetERC721NameParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address"> };

export type GetERC721NameReturnType = string;

export const getERC721Name = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc721, ...request }: GetERC721NameParameters,
): Promise<GetERC721NameReturnType> =>
  readContract(client, {
    abi: solmateERC721ABI,
    address: erc721.address,
    functionName: "name",
    ...request,
  });
