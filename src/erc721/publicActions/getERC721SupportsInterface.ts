import type {
  Chain,
  Client,
  Hex,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { solmateErc721Abi as solmateERC721Abi } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type GetERC721SupportsInterfaceParameters = Omit<
  ReadContractParameters<typeof solmateERC721Abi, "supportsInterface">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address">; interfaceID: Hex };

export type GetERC721SupportsInterfaceReturnType = boolean;

export const getERC721SupportsInterface = <TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { erc721, interfaceID, ...request }: GetERC721SupportsInterfaceParameters,
): Promise<GetERC721SupportsInterfaceReturnType> =>
  readContract(client, {
    abi: solmateERC721Abi,
    address: erc721.address,
    functionName: "supportsInterface",
    args: [interfaceID],
    ...request,
  });
