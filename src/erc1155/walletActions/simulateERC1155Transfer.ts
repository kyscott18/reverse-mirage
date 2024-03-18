import type {
  Account,
  Address,
  Chain,
  Client,
  ContractFunctionArgs,
  Hex,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import { solmateErc1155Abi as solmateERC1155Abi } from "../../generated.js";
import type { BaseERC1155, ERC1155Data } from "../types.js";

export type ERC1155TransferParameters = {
  erc1155Data: ERC1155Data<BaseERC1155>;
  from?: Address;
  to: Address;
  data?: Hex;
};

export type SimulateERC1155TransferParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC1155Abi,
    "safeTransferFrom",
    ContractFunctionArgs<
      typeof solmateERC1155Abi,
      "nonpayable" | "payable",
      "safeTransferFrom"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155TransferParameters };

export type SimulateERC1155TransferReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC1155Abi,
  "safeTransferFrom",
  ContractFunctionArgs<
    typeof solmateERC1155Abi,
    "nonpayable" | "payable",
    "safeTransferFrom"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC1155Transfer = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { erc1155Data, to, from, data },
    ...request
  }: SimulateERC1155TransferParameters<chain, chainOverride, accountOverride>,
): Promise<
  SimulateERC1155TransferReturnType<
    chain,
    account,
    chainOverride,
    accountOverride
  >
> =>
  simulateContract(client, {
    address: erc1155Data.token.address,
    abi: solmateERC1155Abi,
    functionName: "safeTransferFrom",
    args: [
      (from ??
        client.account?.address ??
        (typeof request.account === "object"
          ? request.account.address
          : request.account))!,
      to,
      erc1155Data.token.id,
      erc1155Data.amount,
      data ?? "0x",
    ],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC1155Abi,
    "safeTransferFrom",
    ContractFunctionArgs<
      typeof solmateERC1155Abi,
      "nonpayable" | "payable",
      "safeTransferFrom"
    >,
    chain,
    chainOverride,
    accountOverride
  >);
