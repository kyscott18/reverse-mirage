import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/actions";
import { solmateErc1155Abi } from "../../generated.js";
import type { BaseERC1155 } from "../types.js";

export type GetERC1155URIParameters = Omit<
  ReadContractParameters<typeof solmateErc1155Abi, "uri">,
  "address" | "abi" | "functionName" | "args"
> & { erc1155: Pick<BaseERC1155, "address" | "id"> };

export type GetERC1155URIReturnType = string;

export const getERC1155URI = <TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { erc1155, ...request }: GetERC1155URIParameters,
): Promise<GetERC1155URIReturnType> =>
  readContract(client, {
    abi: solmateErc1155Abi,
    address: erc1155.address,
    functionName: "uri",
    args: [erc1155.id],
    ...request,
  });
