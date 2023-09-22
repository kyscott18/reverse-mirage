import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC20 } from "../types.js";

export type GetERC20NameParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: Pick<BaseERC20, "address"> };

export type GetERC20NameReturnType = string;

export const getERC20Name = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20NameParameters,
  type?: T,
): ReverseMirage<string, GetERC20NameReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: erc20.address,
        functionName: "name",
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: erc20.address,
            functionName: "name",
            ...request,
          }),
        parse: (data) => data,
      }) as ReverseMirage<string, GetERC20NameReturnType, T>;
