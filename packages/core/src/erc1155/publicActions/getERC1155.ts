import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { solmateErc1155ABI as solmateERC1155ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC1155 } from "../types.js";
import { createERC1155 } from "../utils.js";

export type GetERC1155Parameters = Omit<
  ReadContractParameters<typeof solmateERC1155ABI, "uri">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc1155: Pick<ERC1155, "address" | "id" | "chainID"> &
    Partial<Pick<ERC1155, "blockCreated">>;
};

export type GetERC1155ReturnType = ERC1155;

export const getERC1155 = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc1155, ...request }: GetERC1155Parameters,
  type?: T,
): ReverseMirage<string, GetERC1155ReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC1155ABI,
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
      )
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC1155ABI,
            address: erc1155.address,
            functionName: "uri",
            args: [erc1155.id],
            ...request,
          }),
        parse: (data) =>
          createERC1155(
            erc1155.address,
            erc1155.id,
            data,
            erc1155.chainID,
            erc1155.blockCreated,
          ),
      }) as ReverseMirage<string, GetERC1155ReturnType, T>;
