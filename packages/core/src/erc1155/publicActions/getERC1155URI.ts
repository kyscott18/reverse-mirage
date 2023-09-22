import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { solmateErc1155ABI as solmateERC1155ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC1155 } from "../types.js";

export type GetERC1155URIParameters = Omit<
  ReadContractParameters<typeof solmateERC1155ABI, "uri">,
  "address" | "abi" | "functionName" | "args"
> & { erc1155: Pick<ERC1155, "address" | "id"> };

export type GetERC1155URIReturnType = string;

export const getERC1155URI = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc1155, ...request }: GetERC1155URIParameters,
  type?: T,
): ReverseMirage<string, GetERC1155URIReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC1155ABI,
        address: erc1155.address,
        functionName: "uri",
        args: [erc1155.id],
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC1155ABI,
            address: erc1155.address,
            functionName: "uri",
            args: [erc1155.id],
            ...request,
          }),
        parse: (data) => data,
      }) as ReverseMirage<string, GetERC1155URIReturnType, T>;
