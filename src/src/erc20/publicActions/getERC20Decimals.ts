import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/actions";
import { solmateErc20Abi as solmateERC20Abi } from "../../generated.js";
import type { BaseERC20 } from "../types.js";

export type GetERC20DecimalsParameters = Omit<
  ReadContractParameters<typeof solmateERC20Abi, "decimals">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: Pick<BaseERC20, "address"> };

export type GetERC20DecimalsReturnType = number;

export const getERC20Decimals = <TChain extends Chain | undefined>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20DecimalsParameters,
): Promise<GetERC20DecimalsReturnType> =>
  readContract(client, {
    abi: solmateERC20Abi,
    address: erc20.address,
    functionName: "decimals",
    ...request,
  });
