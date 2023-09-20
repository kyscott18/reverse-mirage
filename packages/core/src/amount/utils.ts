import invariant from "tiny-invariant";
import { parseUnits } from "viem/utils";
import type { Fraction } from "../fraction/types.js";
import type { BigIntIsh } from "../types/bigintish.js";
import type { Amount } from "./types.js";

export const scaleUp = (token: Amount["token"], amount: bigint) =>
  token.decimals ? amount * 10n ** BigInt(token.decimals) : amount;

export const scaleDown = (token: Amount["token"], amount: bigint) =>
  token.decimals ? amount / 10n ** BigInt(token.decimals) : amount;

/**
 * Returns true if {@link x} is of type {@link Amount}
 */
export const isAmount = <TAmount extends Amount>(
  x: TAmount | BigIntIsh,
): x is TAmount => typeof x === "object";

/**
 * Creates a {@link Amount} from a {@link token} and a string
 */
export const createAmountFromString = <TToken extends Amount["token"]>(
  token: TToken,
  amount: string,
): Amount<TToken, `${TToken["type"]}Amount`> => ({
  type: `${token.type}Amount`,
  token,
  amount: token.decimals ? parseUnits(amount, token.decimals) : BigInt(amount),
});

/**
 * Creates a {@link Amount} from a {@link token} and a {@link Fraction}
 */
export const createAmountFromFraction = <TToken extends Amount["token"]>(
  token: TToken,
  amount: Fraction,
): Amount<TToken, `${TToken["type"]}Amount`> => ({
  type: `${token.type}Amount`,
  token,
  amount: scaleUp(token, amount.numerator) / amount.denominator,
});

/**
 * Creates a {@link Amount} from a {@link token} and a {@link amount}
 */
export const createAmountFromRaw = <TToken extends Amount["token"]>(
  token: TToken,
  amount: bigint,
): Amount<TToken, `${TToken["type"]}Amount`> => ({
  type: `${token.type}Amount`,
  token,
  amount,
});

/**
 * Adds {@link a} with {@link b}
 */
export const amountAdd = <TAmount extends Amount>(
  a: TAmount,
  b: TAmount extends Amount<TAmount["token"], infer TType>
    ? Amount<TAmount["token"], TType> | BigIntIsh
    : never,
): Omit<TAmount, "amount"> & { amount: bigint } => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? { ...a, amount: a.amount + b.amount }
    : { ...a, amount: a.amount + scaleUp(a.token, BigInt(b)) };
};

/**
 * Subtracts {@link a} by {@link b}
 */
export const amountSubtract = <TAmount extends Amount>(
  a: TAmount,
  b: TAmount extends Amount<TAmount["token"], infer TType>
    ? Amount<TAmount["token"], TType> | BigIntIsh
    : never,
): Omit<TAmount, "amount"> & { amount: bigint } => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? { ...a, amount: a.amount - b.amount }
    : { ...a, amount: a.amount - scaleUp(a.token, BigInt(b)) };
};

/**
 * Multiplies {@link a} with {@link b}
 */
export const amountMultiply = <TAmount extends Amount>(
  a: TAmount,
  b: TAmount extends Amount<TAmount["token"], infer TType>
    ? Amount<TAmount["token"], TType> | BigIntIsh
    : never,
): Omit<TAmount, "amount"> & { amount: bigint } => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? { ...a, amount: scaleDown(a.token, a.amount * b.amount) }
    : { ...a, amount: a.amount * BigInt(b) };
};

/**
 * Divides {@link a} by {@link b}
 */
export const amountDivide = <TAmount extends Amount>(
  a: TAmount,
  b: TAmount extends Amount<TAmount["token"], infer TType>
    ? Amount<TAmount["token"], TType> | BigIntIsh
    : never,
): Omit<TAmount, "amount"> & { amount: bigint } => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? { ...a, amount: scaleUp(a.token, a.amount) / b.amount }
    : { ...a, amount: a.amount / BigInt(b) };
};

/**
 * Returns true if {@link a} is less than {@link b}
 */
export const amountLessThan = <TAmount extends Amount>(
  a: TAmount,
  b: TAmount extends Amount<TAmount["token"], infer TType>
    ? Amount<TAmount["token"], TType> | BigIntIsh
    : never,
): boolean => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? a.amount < b.amount
    : a.amount < scaleUp(a.token, BigInt(b));
};

/**
 * Returns true if {@link a} is equal to {@link b}
 */
export const amountEqualTo = <TAmount extends Amount>(
  a: TAmount,
  b: TAmount extends Amount<TAmount["token"], infer TType>
    ? Amount<TAmount["token"], TType> | BigIntIsh
    : never,
): boolean => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? a.amount === b.amount
    : a.amount === scaleUp(a.token, BigInt(b));
};

/**
 * Returns true if {@link a} is greater than {@link b}
 */
export const amountGreaterThan = <TAmount extends Amount>(
  a: TAmount,
  b: TAmount extends Amount<TAmount["token"], infer TType>
    ? Amount<TAmount["token"], TType> | BigIntIsh
    : never,
): boolean => {
  if (isAmount(b)) {
    invariant(a.token === b.token);
  }

  return isAmount(b)
    ? a.amount > b.amount
    : a.amount > scaleUp(a.token, BigInt(b));
};

/**
 * Returns the {@link amount} as a number with an adjustment for decimals
 */
export const amountToNumber = (amount: Amount): number =>
  Number(amount.amount) / 10 ** (amount.token.decimals ?? 0);
