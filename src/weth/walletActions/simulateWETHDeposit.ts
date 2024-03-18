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
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof weth9Abi,
    "deposit",
    ContractFunctionArgs<typeof weth9Abi, "nonpayable" | "payable", "deposit">,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName" | "value"
> & { args: WETHDepositParameters };

export type SimulateWETHDepositReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof weth9Abi,
  "deposit",
  ContractFunctionArgs<typeof weth9Abi, "nonpayable" | "payable", "deposit">,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateWETHDeposit = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { amount },
    ...request
  }: SimulateWETHDepositParameters<chain, chainOverride, accountOverride>,
): Promise<
  SimulateWETHDepositReturnType<chain, account, chainOverride, accountOverride>
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
    ContractFunctionArgs<typeof weth9Abi, "nonpayable" | "payable", "deposit">,
    chain,
    chainOverride,
    accountOverride
  >);
