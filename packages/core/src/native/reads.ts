import type { Address, PublicClient } from "viem";
import { createAmountFromRaw } from "../amountUtils.js";
import type { ReverseMirageRead } from "../types.js";
import type { NativeCurrency, NativeCurrencyAmount } from "./types.js";

export const nativeBalance = <
  TA extends {
    args: {
      nativeCurrency: NativeCurrency;
      address: Address;
    };
    publicClient?: PublicClient;
  },
>(
  a: TA,
) =>
  ("publicClient" in a
    ? a.publicClient
        .getBalance({ address: a.args.address })
        .then((data) => createAmountFromRaw(a.args.nativeCurrency, data))
    : {
        read: (publicClient: PublicClient) =>
          publicClient.getBalance({ address: a.args.address }),
        parse: (data: bigint) =>
          createAmountFromRaw(a.args.nativeCurrency, data),
      }) as typeof a extends { publicClient: PublicClient }
    ? Promise<NativeCurrencyAmount<TA["args"]["nativeCurrency"]>>
    : ReverseMirageRead<
        bigint,
        NativeCurrencyAmount<TA["args"]["nativeCurrency"]>
      >;
