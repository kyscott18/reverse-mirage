import type { Chain, Client, GetBalanceParameters, Transport } from "viem";
import { getBalance } from "viem/actions";
import { createAmountFromRaw } from "../../amount/utils.js";
import type { ReverseMirageRead } from "../../types/rm.js";
import type { NativeCurrency, NativeCurrencyAmount } from "../types.js";

export type GetNativeBalanceParameters = GetBalanceParameters & {
  nativeCurrency: NativeCurrency;
};

export type GetNativeBalanceReturnType<TNativeCurrency extends NativeCurrency> =
  NativeCurrencyAmount<TNativeCurrency>;

export const getNativeBalance = <
  TChain extends Chain | undefined,
  TA extends {
    client?: Client<Transport, TChain>;
    args: GetNativeBalanceParameters;
  },
>(
  a: TA,
) =>
  ("client" in a
    ? getBalance(a.client, { address: a.args.address }).then((data) =>
        createAmountFromRaw(a.args.nativeCurrency, data),
      )
    : {
        read: (client: Client<Transport, TChain>) =>
          getBalance(client, { address: a.args.address }),
        parse: (data: bigint) =>
          createAmountFromRaw(a.args.nativeCurrency, data),
      }) as TA extends { client: Client<Transport, TChain> }
    ? Promise<GetNativeBalanceReturnType<TA["args"]["nativeCurrency"]>>
    : ReverseMirageRead<
        bigint,
        GetNativeBalanceReturnType<TA["args"]["nativeCurrency"]>,
        TChain
      >;
