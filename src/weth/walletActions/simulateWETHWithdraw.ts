import type {
  Account,
  Address,
  Chain,
  Client,
  ContractFunctionArgs,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import type { ERC20Amount } from "../../erc20/types.js";
import { weth9Abi } from "../../generated.js";
import type { WETH } from "../types.js";

export type WETHWithdrawParameters = { amount: ERC20Amount<WETH> };

export type SimulateWETHWithdrawParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof weth9Abi,
    "withdraw",
    ContractFunctionArgs<typeof weth9Abi, "nonpayable" | "payable", "withdraw">,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: WETHWithdrawParameters };

export type SimulateWETHWithdrawReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined = Account | Address,
> = SimulateContractReturnType<
  typeof weth9Abi,
  "withdraw",
  ContractFunctionArgs<typeof weth9Abi, "nonpayable" | "payable", "withdraw">,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateWETHWithdraw = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { amount },
    ...request
  }: SimulateWETHWithdrawParameters<chain, chainOverride, accountOverride>,
): Promise<
  SimulateWETHWithdrawReturnType<chain, account, chainOverride, accountOverride>
> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: weth9Abi,
    functionName: "withdraw",
    args: [amount.amount],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof weth9Abi,
    "withdraw",
    ContractFunctionArgs<typeof weth9Abi, "nonpayable" | "payable", "withdraw">,
    chain,
    chainOverride,
    accountOverride
  >);
