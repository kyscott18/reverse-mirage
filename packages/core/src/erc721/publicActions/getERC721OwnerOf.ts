import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type GetERC721OwnerOfParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "ownerOf">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address">; id: bigint };

export type GetERC721OwnerOfReturnType = Address;

export const getERC721OwnerOf = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc721, id, ...request }: GetERC721OwnerOfParameters,
): Promise<GetERC721OwnerOfReturnType> =>
  readContract(client, {
    abi: solmateERC721ABI,
    address: erc721.address,
    functionName: "ownerOf",
    args: [id],
    ...request,
  });
