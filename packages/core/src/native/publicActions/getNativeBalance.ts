import type { Chain, Client, GetBalanceParameters, Transport } from "viem";
import { getBalance } from "viem/actions";
import { createAmountFromRaw } from "../../amount/utils.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { NativeCurrency, NativeCurrencyAmount } from "../types.js";

export type GetNativeBalanceParameters<TNativeCurrency extends NativeCurrency> =
  GetBalanceParameters & {
    nativeCurrency: TNativeCurrency;
  };

export type GetNativeBalanceReturnType<TNativeCurrency extends NativeCurrency> =
  NativeCurrencyAmount<TNativeCurrency>;

export const getNativeBalance = <
  TChain extends Chain | undefined,
  TNativeCurrency extends NativeCurrency,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetNativeBalanceParameters<TNativeCurrency>,
  type?: T,
): ReverseMirage<bigint, GetNativeBalanceReturnType<TNativeCurrency>, T> =>
  (type === undefined
    ? getBalance(client, { address: args.address }).then((data) =>
        createAmountFromRaw(args.nativeCurrency, data),
      )
    : {
        read: () => getBalance(client, { address: args.address }),
        parse: (data: bigint) => createAmountFromRaw(args.nativeCurrency, data),
      }) as ReverseMirage<
    bigint,
    GetNativeBalanceReturnType<TNativeCurrency>,
    T
  >;
