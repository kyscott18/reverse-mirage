import { BigIntIsh, Fraction } from "./types.js";

// should we check for zero in the denominator
export const makeFraction = (
  numerator: BigIntIsh,
  denominator: BigIntIsh = 1,
): Fraction => {
  return { numerator: BigInt(numerator), denominator: BigInt(denominator) };
};

export const quotient = (fraction: Fraction): bigint =>
  fraction.numerator / fraction.denominator;

export const remainer = (fraction: Fraction): Fraction => ({
  numerator: fraction.numerator % fraction.denominator,
  denominator: fraction.denominator,
});

// should we handle denominator zero differently
export const invert = (fraction: Fraction): Fraction => ({
  numerator: fraction.denominator,
  denominator: fraction.numerator,
});

export const add = (a: Fraction, b: Fraction): Fraction => ({
  numerator: a.numerator * b.denominator + b.numerator * a.denominator,
  denominator: a.denominator * b.denominator,
});

export const subtract = (a: Fraction, b: Fraction): Fraction => ({
  numerator: a.numerator * b.denominator - b.numerator * a.denominator,
  denominator: a.denominator * b.denominator,
});

export const multiply = (a: Fraction, b: Fraction): Fraction => ({
  numerator: a.numerator * b.numerator,
  denominator: a.denominator * b.denominator,
});

export const divide = (a: Fraction, b: Fraction): Fraction => ({
  numerator: a.numerator * b.denominator,
  denominator: a.denominator * b.numerator,
});

export const lessThan = (a: Fraction, b: Fraction): boolean =>
  a.numerator * b.denominator < a.denominator * b.numerator;

export const greaterThan = (a: Fraction, b: Fraction): boolean =>
  a.numerator * b.denominator > a.denominator * b.numerator;

export const equalTo = (a: Fraction, b: Fraction): boolean =>
  a.numerator * b.denominator === a.denominator * b.numerator;

// toSignificant

// toFixed
