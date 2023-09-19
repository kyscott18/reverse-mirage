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
> & { erc20Permit: Pick<BaseERC20, "address"> };

export type GetERC20DomainSeparatorReturnType = Hex;

export const getERC20DomainSeparator = <
  TChain extends Chain | undefined,
  T extends {
    args: GetERC20DomainSeparatorParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  Hex,
  GetERC20DomainSeparatorReturnType,
  GetERC20DomainSeparatorParameters,
  TChain,
  T
> =>
  (client
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: args.erc20Permit.address,
        functionName: "DOMAIN_SEPARATOR",
      })
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: args.erc20Permit.address,
            functionName: "DOMAIN_SEPARATOR",
          }),
        parse: (data) => data,
      }) as ReverseMirage<
    Hex,
    GetERC20DomainSeparatorReturnType,
    GetERC20DomainSeparatorParameters,
    TChain,
    T
  >;
