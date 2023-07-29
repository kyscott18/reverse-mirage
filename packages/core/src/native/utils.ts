import type { NativeCurrency } from "./types.js";

export const createNativeCurrency = (
  name: string,
  symbol: string,
  decimals: number,
  chainID: number,
): NativeCurrency => ({
  type: "nativeCurrency",
  name,
  symbol,
  decimals,
  chainID,
});
