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
import type { BaseERC20, ERC20Amount } from "../../erc20/types.js";
import { solmateErc20Abi as solmateERC20Abi } from "../../generated.js";

export type ERC20ApproveParameters = {
  amount: ERC20Amount<BaseERC20>;
  spender: Address;
};

export type SimulateERC20ApproveParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC20Abi,
    "approve",
    ContractFunctionArgs<
      typeof solmateERC20Abi,
      "nonpayable" | "payable",
      "approve"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20ApproveParameters };

export type SimulateERC20ApproveReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC20Abi,
  "approve",
  ContractFunctionArgs<
    typeof solmateERC20Abi,
    "nonpayable" | "payable",
    "approve"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC20Approve = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { amount, spender },
    ...request
  }: SimulateERC20ApproveParameters<chain, chainOverride, accountOverride>,
): Promise<
  SimulateERC20ApproveReturnType<chain, account, chainOverride, accountOverride>
> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20Abi,
    functionName: "approve",
    args: [spender, amount.amount],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC20Abi,
    "approve",
    ContractFunctionArgs<
      typeof solmateERC20Abi,
      "nonpayable" | "payable",
      "approve"
    >,
    chain,
    chainOverride,
    accountOverride
  >);
