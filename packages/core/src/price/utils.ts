import invariant from "tiny-invariant";
import type { Amount } from "../amount/types.js";
import { createAmountFromRaw, scaleUp } from "../amount/utils.js";
import type { Fraction } from "../fraction/types.js";
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
} from "../fraction/utils.js";
import type { BigIntIsh } from "../types/bigintish.js";
import type { Price } from "./types.js";

/**
 * Returns true if {@link x} is of type {@link Price}
 */
export const isPrice = <
  TQuoteCurrency extends Amount["token"],
  TBaseCurrency extends Amount["token"],
>(
  x: Price<TQuoteCurrency, TBaseCurrency> | BigIntIsh,
): x is Price<TQuoteCurrency, TBaseCurrency> => typeof x === "object";

/**
 * Creates a {@link Price} from two {@link Token}s and a {@link Fraction}
 * @param quote The quote asset in the price (i.e. USD in traditional equites markets)
 * @param base The base asset in the price
 * @param price The exchange rate in units of {@link base} per {@link quote} as a {@link Fraction}
 */
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

/**
 * Creates a {@link Price} from two {@link Amount}s
 * @param quote The quote amount in the price (i.e. USD in traditional equites markets)
 * @param base The base amount in the price
 */
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

/**
 * Creates a {@link Price} from two {@link Token}s and a {@link numerator} and {@link denominator}
 * @param quote The quote asset in the price (i.e. USD in traditional equites markets)
 * @param base The base asset in the price
 * @param numerator The numerator in the price
 * @param denominator The denominator in the price
 */
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

/**
 * Calculates the inverse
 */
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

/**
 * Adds {@link a} with {@link b}
 */
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

/**
 * Subtracts {@link a} by {@link b}
 */
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

/**
 * Multiplies {@link a} with {@link b}
 */
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

/**
 * Divides {@link a} by {@link b}
 */
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

/**
 * Returns true if {@link a} is less than {@link b}
 */
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

/**
 * Returns true if {@link a} is equal to {@link b}
 */
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

/**
 * Returns true if {@link a} is greater than {@link b}
 */
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

/**
 * Returns the amount of quote currency corresponding to the {@link amount} of base currency at a given {@link price}
 */
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

/**
 * Returns the price as a {@link Fraction} without adjusting for decimals
 */
export const rawPrice = (
  price: Price<Amount["token"], Amount["token"]>,
): Fraction => ({
  type: "fraction",
  numerator: price.numerator,
  denominator: price.denominator,
});

/**
 * Returns the price as a {@link Fraction} with adjusting for decimals
 */
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

/**
 * Returns the {@link price} as a number with an adjustment for decimals
 */
export const priceToNumber = (
  price: Price<Amount["token"], Amount["token"]>,
): number => fractionToNumber(adjustedPrice(price));
