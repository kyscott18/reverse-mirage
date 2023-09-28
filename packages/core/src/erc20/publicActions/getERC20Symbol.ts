import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/actions";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { BaseERC20 } from "../types.js";

export type GetERC20SymbolParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "symbol">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: Pick<BaseERC20, "address"> };

export type GetERC20SymbolReturnType = string;

export const getERC20Symbol = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20SymbolParameters,
): Promise<GetERC20SymbolReturnType> =>
  readContract(client, {
    abi: solmateERC20ABI,
    address: erc20.address,
    functionName: "symbol",
    ...request,
  });
