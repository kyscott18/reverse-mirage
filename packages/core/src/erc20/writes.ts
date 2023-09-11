import invariant from "tiny-invariant";
import {
  type Account,
  type Hex,
  type PublicClient,
  type WalletClient,
  getAddress,
} from "viem";
import type { Address } from "viem/accounts";
import { solmateErc20ABI } from "../generated.js";
import type { ReverseMirageWrite } from "../types.js";
import type {
  ERC20,
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
    amount: ERC20Amount<ERC20 | ERC20Permit>;
  },
): Promise<ReverseMirageWrite<typeof solmateErc20ABI, "transfer">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: solmateErc20ABI,
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
    amount: ERC20Amount<ERC20 | ERC20Permit>;
  },
): Promise<ReverseMirageWrite<typeof solmateErc20ABI, "approve">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: solmateErc20ABI,
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
    amount: ERC20Amount<ERC20 | ERC20Permit>;
  },
): Promise<ReverseMirageWrite<typeof solmateErc20ABI, "transferFrom">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: solmateErc20ABI,
    functionName: "transferFrom",
    args: [args.from, args.to, args.amount.amount],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

export const erc20SignPermit = async (
  walletClient: WalletClient,
  account: Account | Address,
  permit: {
    permitData: ERC20PermitData<ERC20Permit>;
    owner: Address;
    spender: Address;
    deadline: bigint;
  },
) => {
  const domain = {
    name: permit.permitData.token.name,
    version: permit.permitData.token.version,
    chainId: permit.permitData.token.chainID,
    verifyingContract: getAddress(permit.permitData.token.address),
  } as const;

  return walletClient.signTypedData({
    domain,
    account,
    types: PermitType,
    primaryType: "Permit",
    message: {
      owner: permit.owner,
      spender: permit.spender,
      value: permit.permitData.amount,
      deadline: permit.deadline,
      nonce: permit.permitData.nonce,
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
): Promise<ReverseMirageWrite<typeof solmateErc20ABI, "permit">> => {
  invariant(args.signature.length === 132, "Invalid signature length");

  const r = `0x${args.signature.substring(2, 2 + 64)}` as const;
  const s = `0x${args.signature.substring(2 + 64, 2 + 64 + 64)}` as const;
  const v = Number(`0x${args.signature.substring(2 + 64 + 64)}`);

  const { request, result } = await publicClient.simulateContract({
    address: args.permitData.token.address,
    abi: solmateErc20ABI,
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
