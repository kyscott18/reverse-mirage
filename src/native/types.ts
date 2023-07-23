import type { Token, TokenData } from "../types.js";

export type NativeCurrency = Token<"nativeCurrency"> & {
  decimals: number;
};

export type NativeCurrencyAmount<TNativeCurrency extends NativeCurrency> =
  TokenData<TNativeCurrency, { amount: bigint }>;
