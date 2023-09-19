import type { Account, Address, Client, Hex } from "viem";
import { simulateContract } from "viem/contract";
import { solmateErc721ABI } from "../generated.js";
import type { ERC721 } from "./types.js";

/**
 * Transfer an {@link ERC721}
 *
 * Depending on `data` passed in, use one of three transfer methods
 */
export const erc721Transfer = (
  client: Client,
  {
    from,
    to,
    erc721,
    data,
    ...request
  }: {
    from?: Address;
    to: Address;
    erc721: Pick<ERC721, "address" | "id">;
    data?: "safe" | Hex;
    account?: Account | Address;
  },
) =>
  data === undefined
    ? simulateContract(client, {
        address: erc721.address,
        abi: solmateErc721ABI,
        functionName: "transferFrom",
        args: [
          (from ??
            client.account?.address ??
            (typeof request.account === "object"
              ? request.account.address
              : request.account))!,
          to,
          erc721.id,
        ],
        ...request,
      })
    : data === "safe"
    ? simulateContract(client, {
        address: erc721.address,
        abi: solmateErc721ABI,
        functionName: "safeTransferFrom",
        args: [
          (from ??
            client.account?.address ??
            (typeof request.account === "object"
              ? request.account.address
              : request.account))!,
          to,
          erc721.id,
        ],
        ...request,
      })
    : simulateContract(client, {
        address: erc721.address,
        abi: solmateErc721ABI,
        functionName: "safeTransferFrom",
        args: [
          (from ??
            client.account?.address ??
            (typeof request.account === "object"
              ? request.account.address
              : request.account))!,
          to,
          erc721.id,
          data,
        ],
        ...request,
      });

export const erc721Approve = (
  client: Client,
  {
    erc721,
    spender,
    ...request
  }: {
    erc721: Pick<ERC721, "address" | "id">;
    spender: Address;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: erc721.address,
    abi: solmateErc721ABI,
    functionName: "approve",
    args: [spender, erc721.id],
    ...request,
  });

export const erc721SetApprovalForAll = (
  client: Client,
  {
    erc721,
    spender,
    approved,
    ...request
  }: {
    erc721: Pick<ERC721, "address">;
    spender: Address;
    approved: boolean;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: erc721.address,
    abi: solmateErc721ABI,
    functionName: "setApprovalForAll",
    args: [spender, approved],
    ...request,
  });
