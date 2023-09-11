import {
  type Account,
  type Address,
  type Hex,
  type PublicClient,
  type WalletClient,
  getAddress,
} from "viem";
import { solmateErc1155ABI } from "../generated.js";
import type { ReverseMirageWrite } from "../types.js";
import type { ERC1155, ERC1155Data } from "./types.js";

export const erc1155SetApprovalForAll = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    erc1155: Pick<ERC1155, "address">;
    spender: Address;
    approved: boolean;
  },
): Promise<
  ReverseMirageWrite<typeof solmateErc1155ABI, "setApprovalForAll">
> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.erc1155.address,
    abi: solmateErc1155ABI,
    functionName: "setApprovalForAll",
    args: [args.spender, args.approved],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

export const erc1155Transfer = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    erc1155: ERC1155Data<ERC1155>;
    from: Address;
    to: Address;
    data?: Hex;
  },
): Promise<
  ReverseMirageWrite<typeof solmateErc1155ABI, "safeTransferFrom">
> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.erc1155.token.address,
    abi: solmateErc1155ABI,
    functionName: "safeTransferFrom",
    args: [
      args.from,
      args.to,
      args.erc1155.token.id,
      args.erc1155.amount,
      args.data ?? "0x",
    ],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

export const erc1155TransferBatch = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    erc1155: ERC1155Data<ERC1155>[];
    from: Address;
    to: Address;
    data?: Hex;
  },
): Promise<
  ReverseMirageWrite<typeof solmateErc1155ABI, "safeBatchTransferFrom">
> => {
  const address = args.erc1155.reduce((addr: Address | undefined, cur) => {
    if (addr === undefined) return getAddress(cur.token.address);
    else if (addr !== getAddress(cur.token.address))
      throw Error("Tokens refering to different addresses");
    else return addr;
  }, undefined);

  if (address === undefined) throw Error("No tokens passed to transfer");

  const { request, result } = await publicClient.simulateContract({
    address,
    abi: solmateErc1155ABI,
    functionName: "safeBatchTransferFrom",
    args: [
      args.from,
      args.to,
      args.erc1155.map((t) => t.token.id),
      args.erc1155.map((t) => t.amount),
      args.data ?? "0x",
    ],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};
