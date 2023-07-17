import type { CurrencyAmount, NativeCurrency } from "../types.js";
import type { Address } from "viem/accounts";
import type { SendTransactionParameters } from "viem/actions";

export const nativeTransfer = (args: {
  to: Address;
  amount: CurrencyAmount<NativeCurrency>;
}) => {
  return {
    to: args.to,
    value: args.amount.amount,
  } satisfies Omit<SendTransactionParameters, "account" | "chain">;
};
