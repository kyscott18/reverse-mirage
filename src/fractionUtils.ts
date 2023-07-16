import type { BigIntIsh, Fraction } from "./types.js";
import invariant from "tiny-invariant";

/**
 * Determines if x is a fraction type
 */
export const isFraction = (x: Fraction | BigIntIsh): x is Fraction =>
  typeof x === "object" && "type" in x && x.type === "fraction";

/**
 * Create a fraction
 */
export const makeFraction = (
  numerator: BigIntIsh,
  denominator: BigIntIsh = 1,
): Fraction => {
  const d = BigInt(denominator);
  invariant(d !== 0n, "Fraction: denominator equal to 0");
  return { type: "fraction", numerator: BigInt(numerator), denominator: d };
};

/**
 * Calculate the quotient
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
 * Add two fractions
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
 * Subtract the second fraction from the first
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
 * Multiply two fractions
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
 * Divide the first fraction by the second
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
 * Return true if the first fraction is less than the second
 */
export const fractionLessThan = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): boolean =>
  isFraction(b)
    ? a.numerator * b.denominator < a.denominator * b.numerator
    : a.numerator < a.denominator * BigInt(b);

/**
 * Return true if the first fraction is greater than the second
 */
export const fractionGreaterThan = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): boolean =>
  isFraction(b)
    ? a.numerator * b.denominator > a.denominator * b.numerator
    : a.numerator > a.denominator * BigInt(b);

/**
 * Return true if the first fraction is equal to the second
 */
export const fractionEqualTo = (
  a: Fraction,
  b: Fraction | BigIntIsh,
): boolean =>
  isFraction(b)
    ? a.numerator * b.denominator === a.denominator * b.numerator
    : a.numerator === a.denominator * BigInt(b);

// toSignificant

// toFixed
