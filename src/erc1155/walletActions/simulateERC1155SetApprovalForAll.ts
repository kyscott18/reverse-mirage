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
import { solmateErc1155Abi as solmateERC1155Abi } from "../../generated.js";
import type { BaseERC1155 } from "../types.js";

export type ERC1155SetApprovalForAllParameters = {
  erc1155: Pick<BaseERC1155, "address">;
  spender: Address;
  approved: boolean;
};

export type SimulateERC1155SetApprovalForAllParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC1155Abi,
    "setApprovalForAll",
    ContractFunctionArgs<
      typeof solmateERC1155Abi,
      "nonpayable" | "payable",
      "setApprovalForAll"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155SetApprovalForAllParameters };

export type SimulateERC1155SetApprovalForAllReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC1155Abi,
  "setApprovalForAll",
  ContractFunctionArgs<
    typeof solmateERC1155Abi,
    "nonpayable" | "payable",
    "setApprovalForAll"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC1155SetApprovalForAll = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { erc1155, spender, approved },
    ...request
  }: SimulateERC1155SetApprovalForAllParameters<
    chain,
    chainOverride,
    accountOverride
  >,
): Promise<
  SimulateERC1155SetApprovalForAllReturnType<
    chain,
    account,
    chainOverride,
    accountOverride
  >
> =>
  simulateContract(client, {
    address: erc1155.address,
    abi: solmateERC1155Abi,
    functionName: "setApprovalForAll",
    args: [spender, approved],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC1155Abi,
    "setApprovalForAll",
    ContractFunctionArgs<
      typeof solmateERC1155Abi,
      "nonpayable" | "payable",
      "setApprovalForAll"
    >,
    chain,
    chainOverride,
    accountOverride
  >);
