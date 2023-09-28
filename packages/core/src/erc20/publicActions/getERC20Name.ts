import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/actions";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { BaseERC20 } from "../types.js";

export type GetERC20NameParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: Pick<BaseERC20, "address"> };

export type GetERC20NameReturnType = string;

export const getERC20Name = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20NameParameters,
): Promise<GetERC20NameReturnType> =>
  readContract(client, {
    abi: solmateERC20ABI,
    address: erc20.address,
    functionName: "name",
    ...request,
  });
