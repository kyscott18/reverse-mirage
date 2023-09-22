import type {
  Chain,
  Client,
  Hex,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC20 } from "../types.js";

export type GetERC20DomainSeparatorParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "DOMAIN_SEPARATOR">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: Pick<BaseERC20, "address"> };

export type GetERC20DomainSeparatorReturnType = Hex;

export const getERC20DomainSeparator = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20DomainSeparatorParameters,
  type?: T,
): ReverseMirage<Hex, GetERC20DomainSeparatorReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: erc20.address,
        functionName: "DOMAIN_SEPARATOR",
        ...request,
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: erc20.address,
            functionName: "DOMAIN_SEPARATOR",
            ...request,
          }),
        parse: (data) => data,
      }) as ReverseMirage<Hex, GetERC20DomainSeparatorReturnType, T>;
