import type { Account, Address, PublicClient, WalletClient } from "viem";
import { weth9ABI } from "../generated.js";
import type { ERC20Amount, ReverseMirageWrite } from "../index.js";
import type { WETH } from "./types.js";

export const wethDeposit = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    amount: ERC20Amount<WETH>;
  },
): Promise<ReverseMirageWrite<typeof weth9ABI, "deposit">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: weth9ABI,
    functionName: "deposit",
    account,
    value: args.amount.amount,
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};

export const wethWithdraw = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  account: Account | Address,
  args: {
    amount: ERC20Amount<WETH>;
  },
): Promise<ReverseMirageWrite<typeof weth9ABI, "withdraw">> => {
  const { request, result } = await publicClient.simulateContract({
    address: args.amount.token.address,
    abi: weth9ABI,
    functionName: "withdraw",
    account,
    args: [args.amount.amount],
  });
  const hash = await walletClient.writeContract(request);
  return { hash, result, request };
};
