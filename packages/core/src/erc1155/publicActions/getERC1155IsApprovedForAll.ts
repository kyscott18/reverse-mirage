import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { solmateErc1155ABI as solmateERC1155ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC1155 } from "../types.js";

export type GetERC1155IsApprovedForAllParameters = Omit<
  ReadContractParameters<typeof solmateERC1155ABI, "isApprovedForAll">,
  "address" | "abi" | "functionName" | "args"
> & { erc1155: Pick<ERC1155, "address">; owner: Address; spender: Address };

export type GetERC1155IsApprovedForAllReturnType = boolean;

export const getERC1155IsApprovedForAll = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc1155, owner, spender, ...request }: GetERC1155IsApprovedForAllParameters,
  type?: T,
): ReverseMirage<boolean, GetERC1155IsApprovedForAllReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC1155ABI,
        address: erc1155.address,
        functionName: "isApprovedForAll",
        args: [owner, spender],
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC1155ABI,
            address: erc1155.address,
            functionName: "isApprovedForAll",
            args: [owner, spender],
            ...request,
          }),
        parse: (data) => data,
      }) as ReverseMirage<boolean, GetERC1155IsApprovedForAllReturnType, T>;
