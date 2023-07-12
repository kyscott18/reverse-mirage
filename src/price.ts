import type { Currency, CurrencyAmount, Price } from "./types.js";

// export const makePriceFromFraction = <
//   TBaseCurrency extends Currency,
//   TQuoteCurrency extends Currency,
// >(
//   base: TBaseCurrency,
//   quote: TQuoteCurrency,
//   price: Fraction,
// ): Price<TBaseCurrency, TQuoteCurrency> => ({
//   numer,
// });

export const makePriceFromAmounts = <
  TBaseCurrency extends Currency,
  TQuoteCurrency extends Currency,
>(
  base: CurrencyAmount<TBaseCurrency>,
  quote: CurrencyAmount<TQuoteCurrency>,
): Price<TBaseCurrency, TQuoteCurrency> => ({
  numerator: base,
  denominator: quote,
});

// export const makePrice = <
//   TBaseCurrency extends Currency,
//   TQuoteCurrency extends Currency,
// >(
//   base: TBaseCurrency,
//   quote: TQuoteCurrency,
//   numerator: BigIntIsh,
//   denominator: BigIntIsh,
// ): Price<TBaseCurrency, TQuoteCurrency> => {};

// invert

// add
// subtract
// multiply
// divide
// quote
// rawPrice

// to fraction
