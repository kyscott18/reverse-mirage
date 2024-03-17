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
import { solmateErc20Abi as solmateERC20Abi } from "../../generated.js";
import type { BaseERC20, ERC20Amount } from "../types.js";

export type ERC20TransferParameters = {
  amount: ERC20Amount<BaseERC20>;
  to: Address;
};

export type SimulateERC20TransferParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC20Abi,
    "transfer",
    ContractFunctionArgs<
      typeof solmateERC20Abi,
      "nonpayable" | "payable",
      "transfer"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20TransferParameters };

export type SimulateERC20TransferReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC20Abi,
  "transfer",
  ContractFunctionArgs<
    typeof solmateERC20Abi,
    "nonpayable" | "payable",
    "transfer"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC20Transfer = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { amount, to },
    ...request
  }: SimulateERC20TransferParameters<chain, chainOverride, accountOverride>,
): Promise<
  SimulateERC20TransferReturnType<
    chain,
    account,
    chainOverride,
    accountOverride
  >
> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20Abi,
    functionName: "transfer",
    args: [to, amount.amount],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC20Abi,
    "transfer",
    ContractFunctionArgs<
      typeof solmateERC20Abi,
      "nonpayable" | "payable",
      "transfer"
    >,
    chain,
    chainOverride,
    accountOverride
  >);
