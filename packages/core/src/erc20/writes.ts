import { erc20ABI } from "../generated.js";
import type { ReverseMirageWrite } from "../types.js";
import type {
  ERC20,
  ERC20Amount,
  ERC20Permit,
  ERC20PermitAmount,
  ERC20PermitData,
} from "./types.js";
import { PermitType } from "./utils.js";
import invariant from "tiny-invariant";
import type { Account, Hex, PublicClient, WalletClient } from "viem";
import type { Address } from "viem/accounts";

export const erc20Transfer = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    to: Address;
    amount: ERC20Amount<ERC20>;
  },
): Promise<ReverseMirageWrite<typeof erc20ABI, "transfer">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: erc20ABI,
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
    amount: ERC20Amount<ERC20>;
  },
): Promise<ReverseMirageWrite<typeof erc20ABI, "approve">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: erc20ABI,
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
    amount: ERC20Amount<ERC20>;
  },
): Promise<ReverseMirageWrite<typeof erc20ABI, "transferFrom">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: erc20ABI,
    functionName: "transferFrom",
    args: [args.to, args.from, args.amount.amount],
    account,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

export const erc20SignPermit = async (
  walletClient: WalletClient,
  account: Account | Address,
  permit: {
    amount: ERC20PermitData<ERC20Permit>;
    owner: Address;
    spender: Address;
    deadline: bigint;
  },
) => {
  const domain = {
    name: permit.amount.token.name,
    version: permit.amount.token.version,
    chainId: permit.amount.token.chainID,
    verifyingContract: permit.amount.token.address,
  } as const;

  return walletClient.signTypedData({
    domain,
    account,
    types: PermitType,
    primaryType: "Permit",
    message: {
      owner: permit.owner,
      spender: permit.spender,
      value: permit.amount.amount,
      nonce: permit.amount.nonce,
      deadline: permit.deadline,
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
    erc20Permit: ERC20PermitAmount<ERC20Permit>;
    deadline: bigint;
    signature: Hex;
  },
): Promise<ReverseMirageWrite<typeof erc20ABI, "permit">> => {
  invariant(args.signature.length === 67, "invalid signature length");

  const r = `0x${args.signature.substring(2, 2 + 32)}` as const;
  const s = `0x${args.signature.substring(34, 34 + 32)}` as const;
  const v = Number(args.signature.substring(66));

  const { request, result } = await publicClient.simulateContract({
    address: args.erc20Permit.token.address,
    abi: erc20ABI,
    functionName: "permit",
    args: [
      args.owner,
      args.spender,
      args.erc20Permit.amount,
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
