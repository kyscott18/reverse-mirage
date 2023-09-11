import type { Address, PublicClient } from "viem";
import { createAmountFromRaw } from "../amountUtils.js";
import type { ReverseMirageRead } from "../types.js";
import type { NativeCurrency, NativeCurrencyAmount } from "./types.js";

export const nativeBalance = <TNativeCurrency extends NativeCurrency>(args: {
  nativeCurrency: TNativeCurrency;
  address: Address;
}) =>
  ({
    read: (publicClient: PublicClient) =>
      publicClient.getBalance({ address: args.address }),
    parse: (data): NativeCurrencyAmount<TNativeCurrency> =>
      createAmountFromRaw(args.nativeCurrency, data),
  }) as const satisfies ReverseMirageRead<bigint>;
