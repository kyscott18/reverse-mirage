import type {
  Chain,
  Client,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import type { ERC20Amount } from "../../erc20/types.js";
import { weth9ABI } from "../../generated.js";
import type { WETH } from "../types.js";

export type WETHDepositParameters = { amount: ERC20Amount<WETH> };

export type SimulateWETHDepositParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof weth9ABI,
    "deposit",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName" | "value"
> & { args: WETHDepositParameters };

export type SimulateWETHDepositReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof weth9ABI,
  "deposit",
  TChain,
  TChainOverride
>;

export const simulateWETHDeposit = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { amount },
    ...request
  }: SimulateWETHDepositParameters<TChain, TChainOverride>,
): Promise<SimulateWETHDepositReturnType<TChain, TChainOverride>> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: weth9ABI,
    functionName: "deposit",
    value: amount.amount,
    ...request,
  } as unknown as SimulateContractParameters<
    typeof weth9ABI,
    "deposit",
    TChain,
    TChainOverride
  >);
