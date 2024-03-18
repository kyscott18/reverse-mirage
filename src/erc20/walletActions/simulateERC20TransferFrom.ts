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

export type ERC20TransferFromParameters = {
  amount: ERC20Amount<BaseERC20>;
  from: Address;
  to: Address;
};

export type SimulateERC20TransferFromParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC20Abi,
    "transferFrom",
    ContractFunctionArgs<
      typeof solmateERC20Abi,
      "nonpayable" | "payable",
      "transferFrom"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20TransferFromParameters };

export type SimulateERC20TransferFromReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC20Abi,
  "transferFrom",
  ContractFunctionArgs<
    typeof solmateERC20Abi,
    "nonpayable" | "payable",
    "transferFrom"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC20TransferFrom = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { amount, from, to },
    ...request
  }: SimulateERC20TransferFromParameters<chain, chainOverride, accountOverride>,
): Promise<
  SimulateERC20TransferFromReturnType<
    chain,
    account,
    chainOverride,
    accountOverride
  >
> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20Abi,
    functionName: "transferFrom",
    args: [from, to, amount.amount],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC20Abi,
    "transferFrom",
    ContractFunctionArgs<
      typeof solmateERC20Abi,
      "nonpayable" | "payable",
      "transferFrom"
    >,
    chain,
    chainOverride,
    accountOverride
  >);
