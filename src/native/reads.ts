import { makeAmountFromRaw } from "../amountUtils.js";
import type { NativeCurrency, ReverseMirageRead } from "../types.js";
import type { Address, PublicClient } from "viem";

export const nativeBalance = (
  publicClient: PublicClient,
  args: { nativeCurrency: NativeCurrency; address: Address },
) => {
  return {
    read: () => publicClient.getBalance({ address: args.address }),
    parse: (data) => makeAmountFromRaw(args.nativeCurrency, data),
  } satisfies ReverseMirageRead<bigint>;
};
