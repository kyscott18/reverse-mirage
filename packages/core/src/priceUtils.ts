import { type Amount, createAmountFromRaw, scaleUp } from "./amountUtils.js";
import {
  fractionAdd,
  fractionDivide,
  fractionEqualTo,
  fractionGreaterThan,
  fractionInvert,
  fractionLessThan,
  fractionMultiply,
  fractionSubtract,
  fractionToNumber,
} from "./fractionUtils.js";
import type { BigIntIsh, Fraction, Price } from "./types.js";
import invariant from "tiny-invariant";

export const isPrice = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  x: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): x is Price<TQuoteCurrency, TBaseCurrency> => typeof x === "object";

export const createPriceFromFraction = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  quote: TQuoteCurrency,
  base: TBaseCurrency,
  price: Fraction,
): Price<TQuoteCurrency, TBaseCurrency> => ({
  type: "price",
  quote,
  base,
  numerator: quote.decimals
    ? price.numerator * 10n ** BigInt(quote.decimals)
    : price.numerator,
  denominator: base.decimals
    ? price.denominator * 10n ** BigInt(base.decimals)
    : price.denominator,
});

export const createPriceFromAmounts = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  quote: Amount<TQuoteCurrency>,
  base: Amount<TBaseCurrency>,
): Price<TQuoteCurrency, TBaseCurrency> => ({
  type: "price",
  quote: quote.token,
  base: base.token,
  numerator: base.amount,
  denominator: quote.amount,
});

export const createPrice = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  quote: TQuoteCurrency,
  base: TBaseCurrency,
  numerator: BigIntIsh,
  denominator: BigIntIsh = 1,
): Price<TQuoteCurrency, TBaseCurrency> => ({
  type: "price",
  quote,
  base,
  numerator: quote.decimals
    ? BigInt(numerator) * 10n ** BigInt(quote.decimals)
    : BigInt(numerator),
  denominator: base.decimals
    ? BigInt(denominator) * 10n ** BigInt(base.decimals)
    : BigInt(denominator),
});

export const priceInvert = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  price: Price<TQuoteCurrency, TBaseCurrency>,
): Price<TBaseCurrency, TQuoteCurrency> => ({
  ...fractionInvert(rawPrice(price)),
  type: "price",
  quote: price.base,
  base: price.quote,
});

export const priceAdd = <
  TBaseCurrency extends Amount["token"],
  TQuoteCurrency extends Amount["token"],
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): Price<TQuoteCurrency, TBaseCurrency> => {
  if (isPrice(b)) invariant(a.base === b.base && a.quote === b.quote);

  return isPrice(b)
    ? {
        ...fractionAdd(rawPrice(a), rawPrice(b)),
        type: "price",
        quote: a.quote,
        base: a.base,
      }
    : createPriceFromFraction(
        a.quote,
        a.base,
        fractionAdd(adjustedPrice(a), b),
      );
};

export const priceSubtract = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): Price<TQuoteCurrency, TBaseCurrency> => {
  if (isPrice(b)) invariant(a.base === b.base && a.quote === b.quote);

  return isPrice(b)
    ? {
        ...fractionSubtract(rawPrice(a), rawPrice(b)),
        type: "price",
        quote: a.quote,
        base: a.base,
      }
    : createPriceFromFraction(
        a.quote,
        a.base,
        fractionSubtract(adjustedPrice(a), b),
      );
};

export const priceMultiply = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): Price<TQuoteCurrency, TBaseCurrency> => {
  if (isPrice(b)) invariant(a.base === b.base && a.quote === b.quote);

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
    : createPriceFromFraction(
        a.quote,
        a.base,
        fractionMultiply(adjustedPrice(a), b),
      );
};

export const priceDivide = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): Price<TQuoteCurrency, TBaseCurrency> => {
  if (isPrice(b)) invariant(a.base === b.base && a.quote === b.quote);

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
    : createPriceFromFraction(
        a.quote,
        a.base,
        fractionDivide(adjustedPrice(a), b),
      );
};

export const priceLessThan = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): boolean => {
  if (isPrice(b)) invariant(a.base === b.base && a.quote === b.quote);

  return isPrice(b)
    ? fractionLessThan(rawPrice(a), rawPrice(b))
    : fractionLessThan(adjustedPrice(a), b);
};

export const priceEqualTo = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): boolean => {
  if (isPrice(b)) invariant(a.base === b.base && a.quote === b.quote);

  return isPrice(b)
    ? fractionEqualTo(rawPrice(a), rawPrice(b))
    : fractionEqualTo(adjustedPrice(a), b);
};

export const priceGreaterThan = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  a: Price<TQuoteCurrency, TBaseCurrency>,
  b: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): boolean => {
  if (isPrice(b)) invariant(a.base === b.base && a.quote === b.quote);

  return isPrice(b)
    ? fractionGreaterThan(rawPrice(a), rawPrice(b))
    : fractionGreaterThan(adjustedPrice(a), b);
};

export const priceQuote = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  price: Price<TQuoteCurrency, TBaseCurrency>,
  amount: Amount<TBaseCurrency>,
): Amount<TQuoteCurrency> => {
  invariant(price.base === amount.token);

  return createAmountFromRaw(
    price.quote,
    (price.numerator * amount.amount) / price.denominator,
  );
};

export const rawPrice = (
  price: Price<Amount["token"], Amount["token"]>,
): Fraction => ({
  type: "fraction",
  numerator: price.numerator,
  denominator: price.denominator,
});

export const adjustedPrice = (
  price: Price<Amount["token"], Amount["token"]>,
): Fraction => ({
  type: "fraction",
  numerator: price.base.decimals
    ? price.numerator * 10n ** BigInt(price.base.decimals)
    : price.numerator,
  denominator: price.quote.decimals
    ? price.denominator * 10n ** BigInt(price.quote.decimals)
    : price.denominator,
});

export const priceToNumber = (
  price: Price<Amount["token"], Amount["token"]>,
): number => fractionToNumber(adjustedPrice(price));
