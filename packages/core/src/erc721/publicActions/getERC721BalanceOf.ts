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

export type GetERC721BalanceOfParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "balanceOf">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<ERC721, "address">; address: Address };

export type GetERC721BalanceOfReturnType = bigint;

export const getERC721BalanceOf = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc721, address, ...request }: GetERC721BalanceOfParameters,
  type?: T,
): ReverseMirage<bigint, GetERC721BalanceOfReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC721ABI,
        address: erc721.address,
        functionName: "balanceOf",
        args: [address],
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC721ABI,
            address: erc721.address,
            functionName: "balanceOf",
            args: [address],
            ...request,
          }),
        parse: (data) => data,
      }) as ReverseMirage<bigint, GetERC721BalanceOfReturnType, T>;
