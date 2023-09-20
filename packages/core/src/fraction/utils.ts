import invariant from "tiny-invariant";
import type { BigIntIsh } from "../types/bigintish.js";
import type { Fraction } from "./types.js";

/**
 * Returns true if {@link x } is of type {@link Fraction}
 */
export const isFraction = (x: Fraction | BigIntIsh): x is Fraction =>
  typeof x === "object";

/**
 * Creates a {@link Fraction} from a {@link numerator} and {@link denominator}
 */
export const createFraction = (
  numerator: BigIntIsh,
  denominator: BigIntIsh = 1,
): Fraction => {
  const d = BigInt(denominator);
  invariant(d !== 0n, "Fraction: denominator equal to 0");
  return { type: "fraction", numerator: BigInt(numerator), denominator: d };
};

/**
 * Calculates the quotient
 */
export const fractionQuotient = (fraction: Fraction): bigint =>
  fraction.numerator / fraction.denominator;

/**
 * Calculate the remainder
 */
export const fractionRemainder = (fraction: Fraction): bigint =>
  fraction.numerator % fraction.denominator;

/**
 * Calculate the inverse
 */
export const fractionInvert = (fraction: Fraction): Fraction => {
  invariant(fraction.numerator !== 0n, "Fraction: denominator equal to 0");

  return {
    type: "fraction",
    numerator: fraction.denominator,
    denominator: fraction.numerator,
  };
};

/**
 * Adds {@link a} with {@link b}
 */
export const fractionAdd = (a: Fraction, b: Fraction | BigIntIsh): Fraction =>
  isFraction(b)
    ? {
        type: "fraction",
        numerator: a.numerator * b.denominator + b.numerator * a.denominator,
        denominator: a.denominator * b.denominator,
      }
    : {
        type: "fraction",
        numerator: a.numerator + a.denominator * BigInt(b),
        denominator: a.denominator,
      };

/**
 * Subtracts {@link a} by {@link b}
 */
export const fractionSubtract = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): Fraction =>
  isFraction(b)
    ? {
        type: "fraction",
        numerator: a.numerator * b.denominator - b.numerator * a.denominator,
        denominator: a.denominator * b.denominator,
      }
    : {
        type: "fraction",
        numerator: a.numerator - a.denominator * BigInt(b),
        denominator: a.denominator,
      };

/**
 * Multiplies {@link a} with {@link b}
 */
export const fractionMultiply = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): Fraction =>
  isFraction(b)
    ? {
        type: "fraction",
        numerator: a.numerator * b.numerator,
        denominator: a.denominator * b.denominator,
      }
    : {
        type: "fraction",
        numerator: a.numerator * BigInt(b),
        denominator: a.denominator,
      };

/**
 * Divides {@link a} by {@link b}
 */
export const fractionDivide = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): Fraction =>
  isFraction(b)
    ? {
        type: "fraction",
        numerator: a.numerator * b.denominator,
        denominator: a.denominator * b.numerator,
      }
    : {
        type: "fraction",
        numerator: a.numerator,
        denominator: a.denominator * BigInt(b),
      };

/**
 * Returns true if {@link a} is less than {@link b}
 */
export const fractionLessThan = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): boolean =>
  isFraction(b)
    ? a.numerator * b.denominator < a.denominator * b.numerator
    : a.numerator < a.denominator * BigInt(b);

/**
 * Returns true if {@link a} is greater than {@link b}
 */
export const fractionGreaterThan = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): boolean =>
  isFraction(b)
    ? a.numerator * b.denominator > a.denominator * b.numerator
    : a.numerator > a.denominator * BigInt(b);

/**
 * Returns true if {@link a} is equal to {@link b}
 */
export const fractionEqualTo = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): boolean =>
  isFraction(b)
    ? a.numerator * b.denominator === a.denominator * b.numerator
    : a.numerator === a.denominator * BigInt(b);

export const fractionToNumber = (fraction: Fraction): number =>
  Number(fraction.numerator) / Number(fraction.denominator);
