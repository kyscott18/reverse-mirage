import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { solmateErc20Abi as solmateERC20Abi } from "../../generated.js";
import type { ERC20Permit } from "../types.js";

export type GetERC20PermitNonceParameters = Omit<
  ReadContractParameters<typeof solmateERC20Abi, "nonces">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: ERC20Permit; address: Address };

export type GetERC20PermitNonceReturnType = bigint;

export const getERC20PermitNonce = <TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { erc20, address, ...request }: GetERC20PermitNonceParameters,
): Promise<GetERC20PermitNonceReturnType> =>
  readContract(client, {
    abi: solmateERC20Abi,
    address: erc20.address,
    functionName: "nonces",
    args: [address],
    ...request,
  });
