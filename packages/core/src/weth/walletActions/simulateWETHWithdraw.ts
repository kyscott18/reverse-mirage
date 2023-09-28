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

export type WETHWithdrawParameters = { amount: ERC20Amount<WETH> };

export type SimulateWETHWithdrawParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof weth9ABI,
    "withdraw",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: WETHWithdrawParameters };

export type SimulateWETHWithdrawReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof weth9ABI,
  "withdraw",
  TChain,
  TChainOverride
>;

export const simulateWETHWithdraw = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { amount },
    ...request
  }: SimulateWETHWithdrawParameters<TChain, TChainOverride>,
): Promise<SimulateWETHWithdrawReturnType<TChain, TChainOverride>> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: weth9ABI,
    functionName: "withdraw",
    args: [amount.amount],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof weth9ABI,
    "withdraw",
    TChain,
    TChainOverride
  >);
