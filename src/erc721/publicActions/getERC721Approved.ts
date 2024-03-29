import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { solmateErc721Abi as solmateERC721Abi } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type GetERC721ApprovedParameters = Omit<
  ReadContractParameters<typeof solmateERC721Abi, "getApproved">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address">; id: bigint };

export type GetERC721ApprovedReturnType = Address;

export const getERC721Approved = <TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { erc721, id, ...request }: GetERC721ApprovedParameters,
): Promise<GetERC721ApprovedReturnType> =>
  readContract(client, {
    abi: solmateERC721Abi,
    address: erc721.address,
    functionName: "getApproved",
    args: [id],
    ...request,
  });
