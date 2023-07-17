import type { CurrencyAmount, Token } from "../types.js";
import { erc20ABI } from "./erc20Abi.js";
import type { Address } from "viem/accounts";
import type { SimulateContractParameters } from "viem/actions";

export const erc20Transfer = (args: {
  to: Address;
  amount: CurrencyAmount<Token>;
}) => {
  return {
    address: args.amount.currency.address,
    abi: erc20ABI,
    functionName: "transfer",
    args: [args.to, args.amount.amount],
  } satisfies SimulateContractParameters<typeof erc20ABI, "transfer">;
};

export const erc20Approve = (args: {
  spender: Address;
  amount: CurrencyAmount<Token>;
}) => {
  return {
    address: args.amount.currency.address,
    abi: erc20ABI,
    functionName: "approve",
    args: [args.spender, args.amount.amount],
  } satisfies SimulateContractParameters<typeof erc20ABI, "approve">;
};

export const erc20TransferFrom = (args: {
  from: Address;
  to: Address;
  amount: CurrencyAmount<Token>;
}) => {
  return {
    address: args.amount.currency.address,
    abi: erc20ABI,
    functionName: "transferFrom",
    args: [args.to, args.from, args.amount.amount],
  } satisfies SimulateContractParameters<typeof erc20ABI, "transferFrom">;
};
