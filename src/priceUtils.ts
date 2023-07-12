import { makeCurrencyAmountFromRaw } from "./currencyAmountUtils.js";
import { currencyEqualTo } from "./currencyUtils.js";
import {
  fractionAdd,
  fractionDivide,
  fractionEqualTo,
  fractionGreaterThan,
  fractionInvert,
  fractionLessThan,
  fractionMultiply,
  fractionSubtract,
} from "./fractionUtils.js";
import type {
  BigIntIsh,
  Currency,
  CurrencyAmount,
  Fraction,
  Price,
} from "./types.js";
import invariant from "tiny-invariant";

export const makePriceFromFraction = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  quote: TQuoteCurrency,
  base: TBaseCurrency,
  price: Fraction,
): Price<TQuoteCurrency, TBaseCurrency> => ({
  quote,
  base,
  numerator: price.numerator * 10n ** BigInt(quote.decimals),
  denominator: price.denominator * 10n ** BigInt(base.decimals),
});

export const makePriceFromAmounts = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  quote: CurrencyAmount<TQuoteCurrency>,
  base: CurrencyAmount<TBaseCurrency>,
): Price<TQuoteCurrency, TBaseCurrency> => ({
  quote: quote.currency,
  base: base.currency,
  numerator: base.amount,
  denominator: quote.amount,
});

export const makePrice = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  quote: TQuoteCurrency,
  base: TBaseCurrency,
  numerator: BigIntIsh,
  denominator: BigIntIsh = 1,
): Price<TQuoteCurrency, TBaseCurrency> => ({
  quote,
  base,
  numerator: BigInt(numerator) * 10n ** BigInt(quote.decimals),
  denominator: BigInt(denominator) * 10n ** BigInt(base.decimals),
});

export const priceInvert = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  price: Price<TQuoteCurrency, TBaseCurrency>,
): Price<TBaseCurrency, TQuoteCurrency> => ({
  quote: price.base,
  base: price.quote,
  ...fractionInvert(price),
});

export const priceAdd = <
  TBaseCurrency extends Currency,
  TQuoteCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency>,
): Price<TQuoteCurrency, TBaseCurrency> => {
  invariant(
    currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
  );

  return {
    quote: a.quote,
    base: a.base,
    ...fractionAdd(a, b),
  };
};

export const priceSubtract = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency>,
): Price<TQuoteCurrency, TBaseCurrency> => {
  invariant(
    currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
  );

  return {
    quote: a.quote,
    base: a.base,
    ...fractionSubtract(a, b),
  };
};

export const priceMultiply = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency>,
): Price<TQuoteCurrency, TBaseCurrency> => {
  invariant(
    currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
  );

  const fraction = fractionMultiply(a, b);

  return {
    quote: a.quote,
    base: a.base,
    numerator: fraction.numerator * 10n ** BigInt(a.base.decimals),
    denominator: fraction.denominator * 10n ** BigInt(a.quote.decimals),
  };
};

export const priceDivide = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency>,
): Price<TQuoteCurrency, TBaseCurrency> => {
  invariant(
    currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
  );

  const fraction = fractionDivide(a, b);

  return {
    quote: a.quote,
    base: a.base,
    numerator: fraction.numerator * 10n ** BigInt(a.quote.decimals),
    denominator: fraction.denominator * 10n ** BigInt(a.base.decimals),
  };
};

export const priceLessThan = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency>,
): boolean => {
  invariant(
    currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
  );

  return fractionLessThan(a, b);
};

export const priceEqualTo = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency>,
): boolean => {
  invariant(
    currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
  );

  return fractionEqualTo(a, b);
};

export const priceGreaterThan = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency>,
): boolean => {
  invariant(
    currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
  );

  return fractionGreaterThan(a, b);
};

export const priceQuote = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  price: Price<TQuoteCurrency, TBaseCurrency>,
  currencyAmount: CurrencyAmount<TBaseCurrency>,
): CurrencyAmount<TQuoteCurrency> => {
  invariant(currencyEqualTo(price.base, currencyAmount.currency));

  return makeCurrencyAmountFromRaw(
    price.quote,
    (price.numerator * currencyAmount.amount) / price.denominator,
  );
};

export const rawPrice = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  price: Price<TQuoteCurrency, TBaseCurrency>,
): Fraction => price;

export const adjustedPrice = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  price: Price<TQuoteCurrency, TBaseCurrency>,
): Fraction => ({
  numerator: price.numerator * 10n ** BigInt(price.base.decimals),
  denominator: price.denominator * 10n ** BigInt(price.quote.decimals),
});

// to fixed

// to significant
