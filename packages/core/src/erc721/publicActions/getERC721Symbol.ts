import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/actions";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type GetERC721SymbolParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "symbol">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address"> };

export type GetERC721SymbolReturnType = string;

export const getERC721Symbol = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc721, ...request }: GetERC721SymbolParameters,
): Promise<GetERC721SymbolReturnType> =>
  readContract(client, {
    abi: solmateERC721ABI,
    address: erc721.address,
    functionName: "symbol",
    ...request,
  });
