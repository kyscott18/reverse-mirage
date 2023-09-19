import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { createAmountFromRaw } from "../../amount/utils.js";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC20, ERC20Amount } from "../types.js";

export type GetERC20TotalSupplyParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "totalSupply">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: BaseERC20 };

export type GetERC20TotalSupplyReturnType<TERC20 extends BaseERC20> =
  ERC20Amount<TERC20>;

export const getERC20TotalSupply = <
  TChain extends Chain | undefined,
  T extends {
    args: GetERC20TotalSupplyParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  bigint,
  GetERC20TotalSupplyReturnType<T["args"]["erc20"]>,
  GetERC20TotalSupplyParameters,
  TChain,
  T
> =>
  (client
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "totalSupply",
      }).then((data) => createAmountFromRaw(args.erc20, data))
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: args.erc20.address,
            functionName: "totalSupply",
          }),
        parse: (data) => createAmountFromRaw(args.erc20, data),
      }) as ReverseMirage<
    bigint,
    GetERC20TotalSupplyReturnType<T["args"]["erc20"]>,
    GetERC20TotalSupplyParameters,
    TChain,
    T
  >;
