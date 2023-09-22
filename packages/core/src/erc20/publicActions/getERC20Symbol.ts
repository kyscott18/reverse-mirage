import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC20 } from "../types.js";

export type GetERC20SymbolParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "symbol">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: Pick<BaseERC20, "address"> };

export type GetERC20SymbolReturnType = string;

export const getERC20Symbol = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20SymbolParameters,
  type?: T,
): ReverseMirage<string, GetERC20SymbolReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: erc20.address,
        functionName: "symbol",
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: erc20.address,
            functionName: "symbol",
            ...request,
          }),
        parse: (data: string) => data,
      }) as ReverseMirage<string, GetERC20SymbolReturnType, T>;
