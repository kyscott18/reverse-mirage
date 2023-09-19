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
  } & (
    | {
        type: "split";
      }
    | {
        publicClient: PublicClient;
      }
  ),
>(
  a: TA,
) =>
  ("type" in a
    ? {
        read: (publicClient: PublicClient) =>
          publicClient.getBalance({ address: a.args.address }),
        parse: (data: bigint) =>
          createAmountFromRaw(a.args.nativeCurrency, data),
      }
    : a.publicClient
        .getBalance({ address: a.args.address })
        .then((data) =>
          createAmountFromRaw(a.args.nativeCurrency, data),
        )) as typeof a extends { type: "split" }
    ? ReverseMirageRead<
        bigint,
        NativeCurrencyAmount<TA["args"]["nativeCurrency"]>
      >
    : Promise<NativeCurrencyAmount<TA["args"]["nativeCurrency"]>>;
