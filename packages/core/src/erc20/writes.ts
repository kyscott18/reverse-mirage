import invariant from "tiny-invariant";
import {
  type Account,
  type Hex,
  type PublicClient,
  type WalletClient,
  getAddress,
} from "viem";
import type { Address } from "viem/accounts";
import { solmateErc20ABI as solmateERC20ABI } from "../generated.js";
import type { ReverseMirageWrite } from "../types.js";
import type {
  BaseERC20,
  ERC20Amount,
  ERC20Permit,
  ERC20PermitData,
} from "./types.js";
import { PermitType } from "./utils.js";

export const erc20Transfer = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    to: Address;
    amount: ERC20Amount<BaseERC20>;
  },
): Promise<ReverseMirageWrite<typeof solmateERC20ABI, "transfer">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: solmateERC20ABI,
    functionName: "transfer",
    args: [args.to, args.amount.amount],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

export const erc20Approve = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    spender: Address;
    amount: ERC20Amount<BaseERC20>;
  },
): Promise<ReverseMirageWrite<typeof solmateERC20ABI, "approve">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: solmateERC20ABI,
    functionName: "approve",
    args: [args.spender, args.amount.amount],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

export const erc20TransferFrom = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    from: Address;
    to: Address;
    amount: ERC20Amount<BaseERC20>;
  },
): Promise<ReverseMirageWrite<typeof solmateERC20ABI, "transferFrom">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: solmateERC20ABI,
    functionName: "transferFrom",
    args: [args.from, args.to, args.amount.amount],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

// TODO: owner is an unnecessary parameter
export const erc20SignPermit = async (
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    permitData: ERC20PermitData<ERC20Permit>;
    owner: Address;
    spender: Address;
    deadline: bigint;
  },
) => {
  const domain = {
    name: args.permitData.token.name,
    version: args.permitData.token.version,
    chainId: args.permitData.token.chainID,
    verifyingContract: getAddress(args.permitData.token.address),
  } as const;

  return walletClient.signTypedData({
    domain,
    account,
    types: PermitType,
    primaryType: "Permit",
    message: {
      owner: args.owner,
      spender: args.spender,
      value: args.permitData.amount,
      deadline: args.deadline,
      nonce: args.permitData.nonce,
    },
  });
};

export const erc20Permit = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    owner: Address;
    spender: Address;
    permitData: ERC20PermitData<ERC20Permit>;
    deadline: bigint;
    signature: Hex;
  },
): Promise<ReverseMirageWrite<typeof solmateERC20ABI, "permit">> => {
  invariant(args.signature.length === 132, "Invalid signature length");

  const r = `0x${args.signature.substring(2, 2 + 64)}` as const;
  const s = `0x${args.signature.substring(2 + 64, 2 + 64 + 64)}` as const;
  const v = Number(`0x${args.signature.substring(2 + 64 + 64)}`);

  const { request, result } = await publicClient.simulateContract({
    address: args.permitData.token.address,
    abi: solmateERC20ABI,
    functionName: "permit",
    args: [
      args.owner,
      args.spender,
      args.permitData.amount,
      args.deadline,
      v,
      r,
      s,
    ],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};
