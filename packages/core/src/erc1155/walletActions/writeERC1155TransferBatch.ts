import {
  type Account,
  type Address,
  type Chain,
  type Client,
  type Hex,
  type Transport,
  type WriteContractParameters,
  type WriteContractReturnType,
  getAddress,
} from "viem";
import { writeContract } from "viem/contract";
import { solmateErc1155ABI as solmateERC1155 } from "../../generated.js";
import type { BaseERC1155, ERC1155Data } from "../types.js";

export type ERC1155TransferBatchParameters = {
  erc1155Data: ERC1155Data<BaseERC1155>[];
  from?: Address;
  to: Address;
  data?: Hex;
};

export type WriteERC1155TransferBatchParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC1155,
    "safeBatchTransferFrom",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155TransferBatchParameters };

export const writeERC1155TransferBatch = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { erc1155Data, to, from, data },
    ...request
  }: WriteERC1155TransferBatchParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> => {
  const address = erc1155Data.reduce((addr: Address | undefined, cur) => {
    if (addr === undefined) return getAddress(cur.token.address);
    else if (addr !== getAddress(cur.token.address))
      throw Error("Tokens refering to different addresses");
    else return addr;
  }, undefined);

  if (address === undefined) throw Error("No tokens passed to transfer");

  return writeContract(client, {
    address,
    abi: solmateERC1155,
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
  } as unknown as WriteContractParameters<
    typeof solmateERC1155,
    "safeBatchTransferFrom",
    TChain,
    TAccount,
    TChainOverride
  >);
};
