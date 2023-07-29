import type { BigIntIsh, Fraction, Token, TokenData } from "./types.js";
import invariant from "tiny-invariant";
import { parseUnits } from "viem/utils";

export type Amount<TToken extends Token = Token> = TokenData<
  TToken & { decimals?: number },
  { amount: bigint }
>;

export const scaleUp = (token: Amount["token"], amount: bigint) =>
  token.decimals ? amount * 10n ** BigInt(token.decimals) : amount;

export const scaleDown = (token: Amount["token"], amount: bigint) =>
  token.decimals ? amount / 10n ** BigInt(token.decimals) : amount;

export const isAmount = <TAmount extends Amount>(
  x: TAmount | BigIntIsh,
): x is TAmount => typeof x === "object" && "amount" in x;

export const createAmountFromString = <TToken extends Amount["token"]>(
  token: TToken,
  amount: string,
): Amount<TToken> => ({
  type: `${token.type}Amount`,
  token,
  amount: token.decimals ? parseUnits(amount, token.decimals) : BigInt(amount),
});

export const createAmountFromFraction = <TToken extends Amount["token"]>(
  token: TToken,
  amount: Fraction,
): Amount<TToken> => ({
  type: `${token.type}Amount`,
  token,
  amount: scaleUp(token, amount.numerator) / amount.denominator,
});

export const createAmountFromRaw = <TToken extends Amount["token"]>(
  token: TToken,
  amount: bigint,
): Amount<TToken> => ({
  type: `${token.type}Amount`,
  token,
  amount,
});

export const amountAdd = <TToken extends Amount["token"]>(
  a: Amount<TToken>,
  b: Amount<TToken> | BigIntIsh,
): Amount<TToken> => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? createAmountFromRaw(a.token, a.amount + b.amount)
    : createAmountFromRaw(a.token, a.amount + scaleUp(a.token, BigInt(b)));
};

export const amountSubtract = <TToken extends Amount["token"]>(
  a: Amount<TToken>,
  b: Amount<TToken> | BigIntIsh,
): Amount<TToken> => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? createAmountFromRaw(a.token, a.amount - b.amount)
    : createAmountFromRaw(a.token, a.amount - scaleUp(a.token, BigInt(b)));
};

export const amountMultiply = <TToken extends Amount["token"]>(
  a: Amount<TToken>,
  b: Amount<TToken> | BigIntIsh,
): Amount<TToken> => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? createAmountFromRaw(a.token, scaleDown(a.token, a.amount * b.amount))
    : createAmountFromRaw(a.token, a.amount * BigInt(b));
};

export const amountDivide = <TToken extends Amount["token"]>(
  a: Amount<TToken>,
  b: Amount<TToken> | BigIntIsh,
): Amount<TToken> => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? createAmountFromRaw(a.token, scaleUp(a.token, a.amount) / b.amount)
    : createAmountFromRaw(a.token, a.amount / BigInt(b));
};

export const amountLessThan = <TToken extends Amount["token"]>(
  a: Amount<TToken>,
  b: Amount<TToken> | BigIntIsh,
): boolean => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? a.amount < b.amount
    : a.amount < scaleUp(a.token, BigInt(b));
};

export const amountEqualTo = <TToken extends Amount["token"]>(
  a: Amount<TToken>,
  b: Amount<TToken> | BigIntIsh,
): boolean => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? a.amount === b.amount
    : a.amount === scaleUp(a.token, BigInt(b));
};

export const amountGreaterThan = <TToken extends Amount["token"]>(
  a: Amount<TToken>,
  b: Amount<TToken> | BigIntIsh,
): boolean => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? a.amount > b.amount
    : a.amount > scaleUp(a.token, BigInt(b));
};

// toSignificant

// toFixed
