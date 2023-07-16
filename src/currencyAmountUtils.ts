import { currencyEqualTo } from "./currencyUtils.js";
import type { BigIntIsh, Currency, CurrencyAmount, Fraction } from "./types.js";
import invariant from "tiny-invariant";
import { parseUnits } from "viem/utils";

export const scaleUp = (currency: Currency, amount: bigint) =>
  amount * 10n ** BigInt(currency.decimals);

export const scaleDown = (currency: Currency, amount: bigint) =>
  amount / 10n ** BigInt(currency.decimals);

export const isCurrencyAmount = <TCurrency extends Currency>(
  x: CurrencyAmount<TCurrency> | BigIntIsh,
): x is CurrencyAmount<TCurrency> =>
  typeof x === "object" && "type" in x && x.type === "currencyAmount";

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
  amount: scaleUp(currency, amount.numerator) / amount.denominator,
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
  b: CurrencyAmount<TCurrency> | BigIntIsh,
): CurrencyAmount<TCurrency> => {
  if (isCurrencyAmount(b)) {
    invariant(currencyEqualTo(a.currency, b.currency));
  }

  return isCurrencyAmount(b)
    ? {
        type: "currencyAmount",
        currency: a.currency,
        amount: a.amount + b.amount,
      }
    : {
        type: "currencyAmount",
        currency: a.currency,
        amount: a.amount + scaleUp(a.currency, BigInt(b)),
      };
};

export const currencyAmountSubtract = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency> | BigIntIsh,
): CurrencyAmount<TCurrency> => {
  if (isCurrencyAmount(b)) {
    invariant(currencyEqualTo(a.currency, b.currency));
  }

  return isCurrencyAmount(b)
    ? {
        type: "currencyAmount",
        currency: a.currency,
        amount: a.amount - b.amount,
      }
    : {
        type: "currencyAmount",
        currency: a.currency,
        amount: a.amount - scaleUp(a.currency, BigInt(b)),
      };
};

export const currencyAmountMultiply = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency> | BigIntIsh,
): CurrencyAmount<TCurrency> => {
  if (isCurrencyAmount(b)) {
    invariant(currencyEqualTo(a.currency, b.currency));
  }

  return isCurrencyAmount(b)
    ? {
        type: "currencyAmount",
        currency: a.currency,
        amount: scaleDown(a.currency, a.amount * b.amount),
      }
    : {
        type: "currencyAmount",
        currency: a.currency,
        amount: a.amount * BigInt(b),
      };
};

export const currencyAmountDivide = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency> | BigIntIsh,
): CurrencyAmount<TCurrency> => {
  if (isCurrencyAmount(b)) {
    invariant(currencyEqualTo(a.currency, b.currency));
  }

  return isCurrencyAmount(b)
    ? {
        type: "currencyAmount",
        currency: a.currency,
        amount: scaleUp(a.currency, a.amount) / b.amount,
      }
    : {
        type: "currencyAmount",
        currency: a.currency,
        amount: a.amount / BigInt(b),
      };
};

export const currencyAmountLessThan = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency> | BigIntIsh,
): boolean => {
  if (isCurrencyAmount(b)) {
    invariant(currencyEqualTo(a.currency, b.currency));
  }

  return isCurrencyAmount(b)
    ? a.amount < b.amount
    : a.amount < scaleUp(a.currency, BigInt(b));
};

export const currencyAmountEqualTo = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency> | BigIntIsh,
): boolean => {
  if (isCurrencyAmount(b)) {
    invariant(currencyEqualTo(a.currency, b.currency));
  }

  return isCurrencyAmount(b)
    ? a.amount === b.amount
    : a.amount === scaleUp(a.currency, BigInt(b));
};

export const currencyAmountGreaterThan = <TCurrency extends Currency>(
  a: CurrencyAmount<TCurrency>,
  b: CurrencyAmount<TCurrency> | BigIntIsh,
): boolean => {
  if (isCurrencyAmount(b)) {
    invariant(currencyEqualTo(a.currency, b.currency));
  }

  return isCurrencyAmount(b)
    ? a.amount > b.amount
    : a.amount > scaleUp(a.currency, BigInt(b));
};

// toSignificant

// toFixed
