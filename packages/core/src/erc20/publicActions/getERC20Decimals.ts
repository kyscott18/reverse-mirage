import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC20 } from "../types.js";

export type GetERC20DecimalsParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "decimals">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: Pick<BaseERC20, "address"> };

export type GetERC20DecimalsReturnType = number;

export const getERC20Decimals = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20DecimalsParameters,
  type?: T,
): ReverseMirage<number, GetERC20DecimalsReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: erc20.address,
        functionName: "decimals",
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: erc20.address,
            functionName: "decimals",
            ...request,
          }),
        parse: (data) => data,
      }) as ReverseMirage<number, GetERC20DecimalsReturnType, T>;
