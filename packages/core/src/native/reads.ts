import { createAmountFromRaw } from "../amountUtils.js";
import type { ReverseMirageRead } from "../types.js";
import type { NativeCurrency, NativeCurrencyAmount } from "./types.js";
import type { Address, PublicClient } from "viem";

export const nativeBalance = <TNativeCurrency extends NativeCurrency>(
  publicClient: PublicClient,
  args: { nativeCurrency: TNativeCurrency; address: Address },
) => {
  return {
    read: () => publicClient.getBalance({ address: args.address }),
    parse: (data): NativeCurrencyAmount<TNativeCurrency> =>
      createAmountFromRaw(args.nativeCurrency, data),
  } satisfies ReverseMirageRead<bigint>;
};
