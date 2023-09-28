import type {
  Address,
  Chain,
  Client,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import type { BaseERC20, ERC20Amount } from "../../erc20/types.js";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";

export type ERC20TransferFromParameters = {
  amount: ERC20Amount<BaseERC20>;
  from: Address;
  to: Address;
};

export type SimulateERC20TransferFromParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC20ABI,
    "transferFrom",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20TransferFromParameters };

export type SimulateERC20TransferFromReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC20ABI,
  "transferFrom",
  TChain,
  TChainOverride
>;

export const simulateERC20TransferFrom = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { amount, from, to },
    ...request
  }: SimulateERC20TransferFromParameters<TChain, TChainOverride>,
): Promise<SimulateERC20TransferFromReturnType<TChain, TChainOverride>> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20ABI,
    functionName: "transferFrom",
    args: [from, to, amount.amount],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC20ABI,
    "transferFrom",
    TChain,
    TChainOverride
  >);
