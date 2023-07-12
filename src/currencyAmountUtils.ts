import { equalTo as currencyEqualTo } from "./currencyUtils.js";
import {
  makeFraction,
  multiply as fractionMultiply,
  quotient,
} from "./fractionUtils.js";
import { Currency, CurrencyAmount, Fraction } from "./types.js";
import invariant from "tiny-invariant";
import { parseUnits } from "viem/utils";

export const makeCurrencyAmountFromString = <TCurrency extends Currency>(
  currency: TCurrency,
  amount: string,
) => ({
  currency,
  amount: parseUnits(amount, currency.decimals),
});

export const makeCurrencyAmountFromFraction = <TCurrency extends Currency>(
  currency: TCurrency,
  amount: Fraction,
): CurrencyAmount<TCurrency> => ({
  currency,
  amount: quotient(
    fractionMultiply(amount, makeFraction(10n ** BigInt(currency.decimals))),
  ),
});

export const makeCurrencyAmountFromRaw = <TCurrency extends Currency>(
  currency: TCurrency,
  amount: bigint,
): CurrencyAmount<TCurrency> => ({
  currency,
  amount,
});

export const add = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): CurrencyAmount<TCurrency> => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return { currency: a.currency, amount: a.amount + b.amount };
};

export const subtract = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): CurrencyAmount<TCurrency> => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return { currency: a.currency, amount: a.amount - b.amount };
};

export const multiply = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): CurrencyAmount<TCurrency> => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return { currency: a.currency, amount: a.amount * b.amount };
};

export const divide = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): CurrencyAmount<TCurrency> => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return { currency: a.currency, amount: a.amount / b.amount };
};

export const lessThan = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): boolean => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return a.amount < b.amount;
};

export const greaterThan = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): boolean => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return a.amount > b.amount;
};

export const equalTo = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): boolean => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return a.amount === b.amount;
};

// toSignificant

// toFixed
