import type { Chain, Client, GetBalanceParameters, Transport } from "viem";
import { getBalance } from "viem/actions";
import { createAmountFromRaw } from "../../amount/utils.js";
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
>(
  client: Client<Transport, TChain>,
  {
    address,
    nativeCurrency,
    ...request
  }: GetNativeBalanceParameters<TNativeCurrency>,
): Promise<GetNativeBalanceReturnType<TNativeCurrency>> =>
  getBalance(client, { address: address, ...request }).then((data) =>
    createAmountFromRaw(nativeCurrency, data),
  );
