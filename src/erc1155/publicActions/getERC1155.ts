import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/actions";
import { solmateErc1155Abi } from "../../generated.js";
import type { BaseERC1155 } from "../types.js";
import { createERC1155 } from "../utils.js";

export type GetERC1155Parameters = Omit<
  ReadContractParameters<typeof solmateErc1155Abi, "uri">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc1155: Pick<BaseERC1155, "address" | "id" | "chainID"> &
    Partial<Pick<BaseERC1155, "blockCreated">>;
};

export type GetERC1155ReturnType = BaseERC1155;

export const getERC1155 = <TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { erc1155, ...request }: GetERC1155Parameters,
): Promise<GetERC1155ReturnType> =>
  readContract(client, {
    abi: solmateErc1155Abi,
    address: erc1155.address,
    functionName: "uri",
    args: [erc1155.id],
    ...request,
  }).then((data) =>
    createERC1155(
      erc1155.address,
      erc1155.id,
      data,
      erc1155.chainID,
      erc1155.blockCreated,
    ),
  );
