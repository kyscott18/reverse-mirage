import type { Account, Address, Client } from "viem";
import { simulateContract } from "viem/contract";
import { weth9ABI } from "../generated.js";
import type { ERC20Amount } from "../index.js";
import type { WETH } from "./types.js";

export const wethDeposit = (
  client: Client,
  {
    amount,
    ...request
  }: {
    amount: ERC20Amount<WETH>;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: amount.token.address,
    abi: weth9ABI,
    functionName: "deposit",
    value: amount.amount,
    ...request,
  });

export const wethWithdraw = (
  client: Client,
  {
    amount,
    ...request
  }: {
    amount: ERC20Amount<WETH>;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: amount.token.address,
    abi: weth9ABI,
    functionName: "withdraw",
    args: [amount.amount],
    ...request,
  });
