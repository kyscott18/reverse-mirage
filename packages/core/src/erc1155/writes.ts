import {
  type Account,
  type Address,
  type Client,
  type Hex,
  getAddress,
} from "viem";
import { simulateContract } from "viem/contract";
import { solmateErc1155ABI } from "../generated.js";
import type { ERC1155, ERC1155Data } from "./types.js";

export const erc1155SetApprovalForAll = (
  client: Client,
  {
    erc1155,
    spender,
    approved,
    ...request
  }: {
    erc1155: Pick<ERC1155, "address">;
    spender: Address;
    approved: boolean;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: erc1155.address,
    abi: solmateErc1155ABI,
    functionName: "setApprovalForAll",
    args: [spender, approved],
    ...request,
  });

export const erc1155Transfer = (
  client: Client,

  {
    erc1155,
    from,
    to,
    data,
    ...request
  }: {
    erc1155: ERC1155Data<ERC1155>;
    from?: Address;
    to: Address;
    data?: Hex;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: erc1155.token.address,
    abi: solmateErc1155ABI,
    functionName: "safeTransferFrom",
    args: [
      (from ??
        client.account?.address ??
        (typeof request.account === "object"
          ? request.account.address
          : request.account))!,
      to,
      erc1155.token.id,
      erc1155.amount,
      data ?? "0x",
    ],
    ...request,
  });

export const erc1155TransferBatch = (
  client: Client,
  {
    erc1155,
    from,
    to,
    data,
    ...request
  }: {
    erc1155: ERC1155Data<ERC1155>[];
    from?: Address;
    to: Address;
    data?: Hex;
    account?: Account | Address;
  },
) => {
  const address = erc1155.reduce((addr: Address | undefined, cur) => {
    if (addr === undefined) return getAddress(cur.token.address);
    else if (addr !== getAddress(cur.token.address))
      throw Error("Tokens refering to different addresses");
    else return addr;
  }, undefined);

  if (address === undefined) throw Error("No tokens passed to transfer");

  return simulateContract(client, {
    address,
    abi: solmateErc1155ABI,
    functionName: "safeBatchTransferFrom",
    args: [
      (from ??
        client.account?.address ??
        (typeof request.account === "object"
          ? request.account.address
          : request.account))!,
      to,
      erc1155.map((t) => t.token.id),
      erc1155.map((t) => t.amount),
      data ?? "0x",
    ],
    ...request,
  });
};
