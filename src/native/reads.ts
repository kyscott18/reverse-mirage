import { makeCurrencyAmountFromRaw } from "../currencyAmountUtils.js";
import type { NativeCurrency, ReverseMirageRead } from "../types.js";
import type { Address, PublicClient } from "viem";

export const nativeBalance = (
  publicClient: PublicClient,
  args: { nativeCurrency: NativeCurrency; address: Address },
) => {
  return {
    read: () => publicClient.getBalance({ address: args.address }),
    parse: (data) => makeCurrencyAmountFromRaw(args.nativeCurrency, data),
  } satisfies ReverseMirageRead<bigint>;
};
