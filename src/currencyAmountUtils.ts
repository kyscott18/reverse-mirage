import { currencyEqualTo } from "./currencyUtils.js";
import {
  fractionMultiply,
  fractionQuotient,
  makeFraction,
} from "./fractionUtils.js";
import type { Currency, CurrencyAmount, Fraction } from "./types.js";
import invariant from "tiny-invariant";
import { parseUnits } from "viem/utils";

export const makeCurrencyAmountFromString = <TCurrency extends Currency>(
  currency: TCurrency,
  amount: string,
): CurrencyAmount<TCurrency> => ({
  type: "currencyAmount",
  currency,
  amount: parseUnits(amount, currency.decimals),
});

export const makeCurrencyAmountFromFraction = <TCurrency extends Currency>(
  currency: TCurrency,
  amount: Fraction,
): CurrencyAmount<TCurrency> => ({
  type: "currencyAmount",
  currency,
  amount: fractionQuotient(
    fractionMultiply(amount, makeFraction(10n ** BigInt(currency.decimals))),
  ),
});

export const makeCurrencyAmountFromRaw = <TCurrency extends Currency>(
  currency: TCurrency,
  amount: bigint,
): CurrencyAmount<TCurrency> => ({
  type: "currencyAmount",
  currency,
  amount,
});

export const currencyAmountAdd = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): CurrencyAmount<TCurrency> => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return {
    type: "currencyAmount",
    currency: a.currency,
    amount: a.amount + b.amount,
  };
};

export const currencyAmountSubtract = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): CurrencyAmount<TCurrency> => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return {
    type: "currencyAmount",
    currency: a.currency,
    amount: a.amount - b.amount,
  };
};

export const currencyAmountMultiply = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): CurrencyAmount<TCurrency> => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return {
    type: "currencyAmount",
    currency: a.currency,
    amount: (a.amount * b.amount) / 10n ** BigInt(a.currency.decimals),
  };
};

export const currencyAmountDivide = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): CurrencyAmount<TCurrency> => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return {
    type: "currencyAmount",
    currency: a.currency,
    amount: (a.amount * 10n ** BigInt(a.currency.decimals)) / b.amount,
  };
};

export const currencyAmountLessThan = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): boolean => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return a.amount < b.amount;
};

export const currencyAmountEqualTo = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): boolean => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return a.amount === b.amount;
};

export const currencyAmountGreaterThan = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency>,
): boolean => {
  invariant(currencyEqualTo(a.currency, b.currency));

  return a.amount > b.amount;
};

// toSignificant

// toFixed
