import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { solmateErc1155Abi } from "../../generated.js";
import type { BaseERC1155 } from "../types.js";

export type GetERC1155IsApprovedForAllParameters = Omit<
  ReadContractParameters<typeof solmateErc1155Abi, "isApprovedForAll">,
  "address" | "abi" | "functionName" | "args"
> & { erc1155: Pick<BaseERC1155, "address">; owner: Address; spender: Address };

export type GetERC1155IsApprovedForAllReturnType = boolean;

export const getERC1155IsApprovedForAll = <TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { erc1155, owner, spender, ...request }: GetERC1155IsApprovedForAllParameters,
): Promise<GetERC1155IsApprovedForAllReturnType> =>
  readContract(client, {
    abi: solmateErc1155Abi,
    address: erc1155.address,
    functionName: "isApprovedForAll",
    args: [owner, spender],
    ...request,
  });
