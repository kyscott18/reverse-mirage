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
  T extends {
    args: GetERC20DecimalsParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  number,
  GetERC20DecimalsReturnType,
  GetERC20DecimalsParameters,
  TChain,
  T
> =>
  (client
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "decimals",
      })
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: args.erc20.address,
            functionName: "decimals",
          }),
        parse: (data) => data,
      }) as ReverseMirage<
    number,
    GetERC20DecimalsReturnType,
    GetERC20DecimalsParameters,
    TChain,
    T
  >;
