import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { createAmountFromRaw } from "../../amount/utils.js";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC20, ERC20Amount } from "../types.js";

export type GetERC20TotalSupplyParameters<TERC20 extends BaseERC20> = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "totalSupply">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: TERC20 };

export type GetERC20TotalSupplyReturnType<TERC20 extends BaseERC20> =
  ERC20Amount<TERC20>;

export const getERC20TotalSupply = <
  TChain extends Chain | undefined,
  TERC20 extends BaseERC20,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20TotalSupplyParameters<TERC20>,
  type?: T,
): ReverseMirage<bigint, GetERC20TotalSupplyReturnType<TERC20>, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: erc20.address,
        functionName: "totalSupply",
        ...request,
      }).then((data) => createAmountFromRaw(erc20, data))
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: erc20.address,
            functionName: "totalSupply",
            ...request,
          }),
        parse: (data) => createAmountFromRaw(erc20, data),
      }) as ReverseMirage<bigint, GetERC20TotalSupplyReturnType<TERC20>, T>;