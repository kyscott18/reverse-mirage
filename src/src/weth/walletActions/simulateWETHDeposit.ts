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

export type WETHDepositParameters = { amount: ERC20Amount<WETH> };

export type SimulateWETHDepositParameters<
  args extends ContractFunctionArgs<
    typeof weth9Abi,
    "nonpayable" | "payable",
    "deposit"
  > = ContractFunctionArgs<
    typeof weth9Abi,
    "nonpayable" | "payable",
    "deposit"
  >,
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined = Account | Address,
> = Omit<
  SimulateContractParameters<
    typeof weth9Abi,
    "deposit",
    args,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName" | "value"
> & { args: WETHDepositParameters };

export type SimulateWETHDepositReturnType<
  args extends ContractFunctionArgs<
    typeof weth9Abi,
    "nonpayable" | "payable",
    "deposit"
  > = ContractFunctionArgs<
    typeof weth9Abi,
    "nonpayable" | "payable",
    "deposit"
  >,
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined = Account | Address,
> = SimulateContractReturnType<
  typeof weth9Abi,
  "deposit",
  args,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateWETHDeposit = <
  args extends ContractFunctionArgs<
    typeof weth9Abi,
    "nonpayable" | "payable",
    "deposit"
  > = ContractFunctionArgs<
    typeof weth9Abi,
    "nonpayable" | "payable",
    "deposit"
  >,
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined = Account | Address,
>(
  client: Client<Transport, chain, account>,
  {
    args: { amount },
    ...request
  }: SimulateWETHDepositParameters<args, chain, chainOverride, accountOverride>,
): Promise<
  SimulateWETHDepositReturnType<
    args,
    chain,
    account,
    chainOverride,
    accountOverride
  >
> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: weth9Abi,
    functionName: "deposit",
    value: amount.amount,
    ...request,
  } as unknown as SimulateContractParameters<
    typeof weth9Abi,
    "deposit",
    args,
    chain,
    chainOverride,
    accountOverride
  >);
