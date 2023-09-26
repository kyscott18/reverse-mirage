import type {
  Account,
  Chain,
  Client,
  Transport,
  WriteContractParameters,
  WriteContractReturnType,
} from "viem";
import { writeContract } from "viem/contract";
import type { ERC20Amount } from "../../erc20/types.js";
import { weth9ABI } from "../../generated.js";
import type { WETH } from "../types.js";

export type WETHWithdrawParameters = { amount: ERC20Amount<WETH> };

export type WriteWETHWithdrawParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof weth9ABI,
    "withdraw",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: WETHWithdrawParameters };

export const writeWETHWithdraw = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { amount },
    ...request
  }: WriteWETHWithdrawParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> =>
  writeContract(client, {
    address: amount.token.address,
    abi: weth9ABI,
    functionName: "withdraw",
    args: [amount.amount],
    ...request,
  } as unknown as WriteContractParameters<
    typeof weth9ABI,
    "withdraw",
    TChain,
    TAccount,
    TChainOverride
  >);
