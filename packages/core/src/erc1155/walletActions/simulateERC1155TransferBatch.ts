import {
  type Address,
  type Chain,
  type Client,
  type Hex,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  type Transport,
  getAddress,
} from "viem";
import { simulateContract } from "viem/actions";
import { solmateErc1155ABI as solmateERC1155 } from "../../generated.js";
import type { BaseERC1155, ERC1155Data } from "../types.js";

export type ERC1155TransferBatchParameters = {
  erc1155Data: ERC1155Data<BaseERC1155>[];
  from?: Address;
  to: Address;
  data?: Hex;
};

export type SimulateERC1155TransferBatchParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC1155,
    "safeBatchTransferFrom",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155TransferBatchParameters };

export type SimulateERC1155TransferBatchReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC1155,
  "safeBatchTransferFrom",
  TChain,
  TChainOverride
>;

export const simulateERC1155TransferBatch = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { erc1155Data, to, from, data },
    ...request
  }: SimulateERC1155TransferBatchParameters<TChain, TChainOverride>,
): Promise<SimulateERC1155TransferBatchReturnType<TChain, TChainOverride>> => {
  const address = erc1155Data.reduce((addr: Address | undefined, cur) => {
    if (addr === undefined) return getAddress(cur.token.address);
    else if (addr !== getAddress(cur.token.address))
      throw Error("Tokens refering to different addresses");
    else return addr;
  }, undefined);

  if (address === undefined) throw Error("No tokens passed to transfer");

  return simulateContract(client, {
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
  } as unknown as SimulateContractParameters<
    typeof solmateERC1155,
    "safeBatchTransferFrom",
    TChain,
    TChainOverride
  >);
};
