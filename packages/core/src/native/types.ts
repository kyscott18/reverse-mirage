import type { Token, TokenData } from "../types/token.js";

export type NativeCurrency = Token<"nativeCurrency"> & {
  name: string;
  symbol: string;
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
