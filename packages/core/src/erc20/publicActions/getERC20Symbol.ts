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
  T extends {
    args: GetERC20SymbolParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  string,
  GetERC20SymbolReturnType,
  GetERC20SymbolParameters,
  TChain,
  T
> =>
  (client
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "symbol",
      })
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: args.erc20.address,
            functionName: "symbol",
          }),
        parse: (data: string) => data,
      }) as ReverseMirage<
    string,
    GetERC20SymbolReturnType,
    GetERC20SymbolParameters,
    TChain,
    T
  >;
