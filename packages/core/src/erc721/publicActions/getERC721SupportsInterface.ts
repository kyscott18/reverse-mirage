import type {
  Chain,
  Client,
  Hex,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC721 } from "../types.js";

export type GetERC721SupportsInterfaceParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "supportsInterface">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address">; interfaceID: Hex };

export type GetERC721SupportsInterfaceReturnType = boolean;

export const getERC721SupportsInterface = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc721, interfaceID, ...request }: GetERC721SupportsInterfaceParameters,
  type?: T,
): ReverseMirage<boolean, GetERC721SupportsInterfaceReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC721ABI,
        address: erc721.address,
        functionName: "supportsInterface",
        args: [interfaceID],
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC721ABI,
            address: erc721.address,
            functionName: "supportsInterface",
            args: [interfaceID],
            ...request,
          }),
        parse: (data) => data,
      }) as ReverseMirage<boolean, GetERC721SupportsInterfaceReturnType, T>;
