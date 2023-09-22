import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC721 } from "../types.js";

export type GetERC721IsApprovedForAllParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "isApprovedForAll">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<ERC721, "address">; owner: Address; spender: Address };

export type GetERC721IsApprovedForAllReturnType = boolean;

export const getERC721IsApprovedForAll = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc721, owner, spender, ...request }: GetERC721IsApprovedForAllParameters,
  type?: T,
): ReverseMirage<boolean, GetERC721IsApprovedForAllReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC721ABI,
        address: erc721.address,
        functionName: "isApprovedForAll",
        args: [owner, spender],
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC721ABI,
            address: erc721.address,
            functionName: "isApprovedForAll",
            args: [owner, spender],
            ...request,
          }),
        parse: (data) => data,
      }) as ReverseMirage<boolean, GetERC721IsApprovedForAllReturnType, T>;
