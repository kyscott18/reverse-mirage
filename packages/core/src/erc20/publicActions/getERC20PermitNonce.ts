import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC20Permit } from "../types.js";

export type GetERC20PermitNonceParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "nonces">,
  "address" | "abi" | "functionName" | "args"
> & { erc20Permit: ERC20Permit; address: Address };

export type GetERC20PermitNonceReturnType = bigint;

export const getERC20PermitNonce = <
  TChain extends Chain | undefined,
  T extends {
    args: GetERC20PermitNonceParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  bigint,
  GetERC20PermitNonceReturnType,
  GetERC20PermitNonceParameters,
  TChain,
  T
> =>
  (client
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: args.erc20Permit.address,
        functionName: "nonces",
        args: [args.address],
      })
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: args.erc20Permit.address,
            functionName: "nonces",
            args: [args.address],
          }),
        parse: (data) => data,
      }) as ReverseMirage<
    bigint,
    GetERC20PermitNonceReturnType,
    GetERC20PermitNonceParameters,
    TChain,
    T
  >;
