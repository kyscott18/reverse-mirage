import {
  type Account,
  type Address,
  type Chain,
  type Client,
  type ContractFunctionArgs,
  type Hex,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  type Transport,
  getAddress,
} from "viem";
import { simulateContract } from "viem/actions";
import { solmateErc1155Abi as solmateERC1155Abi } from "../../generated.js";
import type { BaseERC1155, ERC1155Data } from "../types.js";

export type ERC1155TransferBatchParameters = {
  erc1155Data: ERC1155Data<BaseERC1155>[];
  from?: Address;
  to: Address;
  data?: Hex;
};

export type SimulateERC1155TransferBatchParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC1155Abi,
    "safeBatchTransferFrom",
    ContractFunctionArgs<
      typeof solmateERC1155Abi,
      "nonpayable" | "payable",
      "safeBatchTransferFrom"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155TransferBatchParameters };

export type SimulateERC1155TransferBatchReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC1155Abi,
  "safeBatchTransferFrom",
  ContractFunctionArgs<
    typeof solmateERC1155Abi,
    "nonpayable" | "payable",
    "safeBatchTransferFrom"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC1155TransferBatch = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { erc1155Data, to, from, data },
    ...request
  }: SimulateERC1155TransferBatchParameters<
    chain,
    chainOverride,
    accountOverride
  >,
): Promise<
  SimulateERC1155TransferBatchReturnType<
    chain,
    account,
    chainOverride,
    accountOverride
  >
> => {
  const address = erc1155Data.reduce((addr: Address | undefined, cur) => {
    if (addr === undefined) return getAddress(cur.token.address);
    if (addr !== getAddress(cur.token.address))
      throw Error("Tokens refering to different addresses");
    return addr;
  }, undefined);

  if (address === undefined) throw Error("No tokens passed to transfer");

  return simulateContract(client, {
    address,
    abi: solmateERC1155Abi,
    functionName: "safeBatchTransferFrom",
    args: [
      (from ??
        client.account?.address ??
        (typeof request.account === "object"
          ? request.account.address
          : request.account))!,
      to,
      erc1155Data.map((t) => t.token.id),
      erc1155Data.map((t) => t.amount),
      data ?? "0x",
    ],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC1155Abi,
    "safeBatchTransferFrom",
    ContractFunctionArgs<
      typeof solmateERC1155Abi,
      "nonpayable" | "payable",
      "safeBatchTransferFrom"
    >,
    chain,
    chainOverride,
    accountOverride
  >);
};
