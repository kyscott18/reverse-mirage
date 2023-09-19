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
  T extends {
    args: GetERC20NameParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  string,
  GetERC20NameReturnType,
  GetERC20NameParameters,
  TChain,
  T
> =>
  (client
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "name",
      })
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: args.erc20.address,
            functionName: "name",
          }),
        parse: (data) => data,
      }) as ReverseMirage<
    string,
    GetERC20NameReturnType,
    GetERC20NameParameters,
    TChain,
    T
  >;
