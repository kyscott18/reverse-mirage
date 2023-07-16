import { makeCurrencyAmountFromRaw, scaleUp } from "./currencyAmountUtils.js";
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

export const isPrice = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  x: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): x is Price<TQuoteCurrency, TBaseCurrency> =>
  typeof x === "object" && "type" in x && x.type === "price";

export const makePriceFromFraction = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  quote: TQuoteCurrency,
  base: TBaseCurrency,
  price: Fraction,
): Price<TQuoteCurrency, TBaseCurrency> => ({
  type: "price",
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
  type: "price",
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
  type: "price",
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
  ...fractionInvert(rawPrice(price)),
  type: "price",
  quote: price.base,
  base: price.quote,
});

export const priceAdd = <
  TBaseCurrency extends Currency,
  TQuoteCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): Price<TQuoteCurrency, TBaseCurrency> => {
  if (isPrice(b))
    invariant(
      currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
    );

  return isPrice(b)
    ? {
        ...fractionAdd(rawPrice(a), rawPrice(b)),
        type: "price",
        quote: a.quote,
        base: a.base,
      }
    : makePriceFromFraction(a.quote, a.base, fractionAdd(adjustedPrice(a), b));
};

export const priceSubtract = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): Price<TQuoteCurrency, TBaseCurrency> => {
  if (isPrice(b))
    invariant(
      currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
    );

  return isPrice(b)
    ? {
        ...fractionSubtract(rawPrice(a), rawPrice(b)),
        type: "price",
        quote: a.quote,
        base: a.base,
      }
    : makePriceFromFraction(
        a.quote,
        a.base,
        fractionSubtract(adjustedPrice(a), b),
      );
};

export const priceMultiply = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): Price<TQuoteCurrency, TBaseCurrency> => {
  if (isPrice(b))
    invariant(
      currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
    );

  return isPrice(b)
    ? {
        type: "price",
        quote: a.quote,
        base: a.base,
        numerator: scaleUp(
          a.base,
          fractionMultiply(rawPrice(a), rawPrice(b)).numerator,
        ),
        denominator: scaleUp(
          a.quote,
          fractionMultiply(rawPrice(a), rawPrice(b)).denominator,
        ),
      }
    : makePriceFromFraction(
        a.quote,
        a.base,
        fractionMultiply(adjustedPrice(a), b),
      );
};

export const priceDivide = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): Price<TQuoteCurrency, TBaseCurrency> => {
  if (isPrice(b))
    invariant(
      currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
    );

  return isPrice(b)
    ? {
        type: "price",
        quote: a.quote,
        base: a.base,
        numerator: scaleUp(
          a.quote,
          fractionDivide(rawPrice(a), rawPrice(b)).numerator,
        ),
        denominator: scaleUp(
          a.base,
          fractionDivide(rawPrice(a), rawPrice(b)).denominator,
        ),
      }
    : makePriceFromFraction(
        a.quote,
        a.base,
        fractionDivide(adjustedPrice(a), b),
      );
};

export const priceLessThan = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): boolean => {
  if (isPrice(b))
    invariant(
      currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
    );

  return isPrice(b)
    ? fractionLessThan(rawPrice(a), rawPrice(b))
    : fractionLessThan(adjustedPrice(a), b);
};

export const priceEqualTo = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): boolean => {
  if (isPrice(b))
    invariant(
      currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
    );

  return isPrice(b)
    ? fractionEqualTo(rawPrice(a), rawPrice(b))
    : fractionEqualTo(adjustedPrice(a), b);
};

export const priceGreaterThan = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): boolean => {
  if (isPrice(b))
    invariant(
      currencyEqualTo(a.base, b.base) && currencyEqualTo(a.quote, b.quote),
    );

  return isPrice(b)
    ? fractionGreaterThan(rawPrice(a), rawPrice(b))
    : fractionGreaterThan(adjustedPrice(a), b);
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
): Fraction => ({
  type: "fraction",
  numerator: price.numerator,
  denominator: price.denominator,
});

export const adjustedPrice = <
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
>(
  price: Price<TQuoteCurrency, TBaseCurrency>,
): Fraction => ({
  type: "fraction",
  numerator: price.numerator * 10n ** BigInt(price.base.decimals),
  denominator: price.denominator * 10n ** BigInt(price.quote.decimals),
});

// to fixed

// to significant
