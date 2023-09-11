import type { Token, TokenData } from "../types.js";

export type NativeCurrency = Token<"nativeCurrency"> & {
  decimals: number;
};

export type NativeCurrencyData<TNativeCurrency extends NativeCurrency> =
  TokenData<
    TNativeCurrency,
    `${TNativeCurrency["type"]}Amount`,
    { amount: bigint }
  >;

export type NativeCurrencyAmount<TNativeCurrency extends NativeCurrency> =
  TokenData<
    TNativeCurrency,
    `${TNativeCurrency["type"]}Amount`,
    { amount: bigint }
  >;
