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

export type ERC20ApproveParameters = {
  amount: ERC20Amount<BaseERC20>;
  spender: Address;
};

export type SimulateERC20ApproveParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC20ABI,
    "approve",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20ApproveParameters };

export type SimulateERC20ApproveReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC20ABI,
  "approve",
  TChain,
  TChainOverride
>;

export const simulateERC20Approve = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { amount, spender },
    ...request
  }: SimulateERC20ApproveParameters<TChain, TChainOverride>,
): Promise<SimulateERC20ApproveReturnType<TChain, TChainOverride>> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20ABI,
    functionName: "approve",
    args: [spender, amount.amount],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC20ABI,
    "approve",
    TChain,
    TChainOverride
  >);
