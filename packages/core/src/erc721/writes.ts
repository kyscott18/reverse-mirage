import type { Account, Address, Hex, PublicClient, WalletClient } from "viem";
import { solmateErc721ABI } from "../generated.js";
import type { ReverseMirageWrite } from "../types.js";
import type { ERC721 } from "./types.js";

/**
 * Transfer an {@link ERC721}
 *
 * Depending on `data` passed in, use one of three transfer methods
 */
// TODO: make from optional
export const erc721Transfer = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    from: Address;
    to: Address;
    erc721: Pick<ERC721, "address" | "id">;
    data?: "safe" | Hex;
  },
): Promise<
  ReverseMirageWrite<
    typeof solmateErc721ABI,
    "transferFrom" | "safeTransferFrom"
  >
> => {
  if (args.data === undefined) {
    const { request, result } = await publicClient.simulateContract({
      address: args.erc721.address,
      abi: solmateErc721ABI,
      functionName: "transferFrom",
      args: [args.from, args.to, args.erc721.id],
      account,
    });
    const hash = await walletClient.writeContract(request);
    return { hash, result, request };
  } else if (args.data === "safe") {
    const { request, result } = await publicClient.simulateContract({
      address: args.erc721.address,
      abi: solmateErc721ABI,
      functionName: "safeTransferFrom",
      args: [args.from, args.to, args.erc721.id],
      account,
    });
    const hash = await walletClient.writeContract(request);
    return { hash, result, request };
  } else {
    const { request, result } = await publicClient.simulateContract({
      address: args.erc721.address,
      abi: solmateErc721ABI,
      functionName: "safeTransferFrom",
      args: [args.from, args.to, args.erc721.id, args.data],
      account,
    });
    const hash = await walletClient.writeContract(request);
    return { hash, result, request };
  }
};

export const erc721Approve = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    erc721: Pick<ERC721, "address" | "id">;
    spender: Address;
  },
): Promise<ReverseMirageWrite<typeof solmateErc721ABI, "approve">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.erc721.address,
    abi: solmateErc721ABI,
    functionName: "approve",
    args: [args.spender, args.erc721.id],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

export const erc721SetApprovalForAll = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    erc721: Pick<ERC721, "address">;
    spender: Address;
    approved: boolean;
  },
): Promise<
  ReverseMirageWrite<typeof solmateErc721ABI, "setApprovalForAll">
> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.erc721.address,
    abi: solmateErc721ABI,
    functionName: "setApprovalForAll",
    args: [args.spender, args.approved],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};
