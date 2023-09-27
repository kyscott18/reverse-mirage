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

export type GetERC721IsApprovedForAllParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "isApprovedForAll">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address">; owner: Address; spender: Address };

export type GetERC721IsApprovedForAllReturnType = boolean;

export const getERC721IsApprovedForAll = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc721, owner, spender, ...request }: GetERC721IsApprovedForAllParameters,
): Promise<GetERC721IsApprovedForAllReturnType> =>
  readContract(client, {
    abi: solmateERC721ABI,
    address: erc721.address,
    functionName: "isApprovedForAll",
    args: [owner, spender],
    ...request,
  });
