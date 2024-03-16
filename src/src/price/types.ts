import type { Fraction } from "../fraction/types.js";
import type { Token } from "../types/token.js";

export type Price<
  TQuoteCurrency extends Token,
  TBaseCurrency extends Token,
> = Omit<Fraction, "type"> & {
  type: "price";
  quote: TQuoteCurrency;
  base: TBaseCurrency;
};
