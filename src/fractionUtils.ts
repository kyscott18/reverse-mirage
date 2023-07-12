import { BigIntIsh, Fraction } from "./types.js";

// should we check for zero in the denominator
export const makeFraction = (
  numerator: BigIntIsh,
  denominator: BigIntIsh = 1,
): Fraction => {
  return { numerator: BigInt(numerator), denominator: BigInt(denominator) };
};

export const fractionQuotient = (fraction: Fraction): bigint =>
  fraction.numerator / fraction.denominator;

export const fractionRemainder = (fraction: Fraction): bigint =>
  fraction.numerator % fraction.denominator;

// should we handle denominator zero differently
export const fractionInvert = (fraction: Fraction): Fraction => ({
  numerator: fraction.denominator,
  denominator: fraction.numerator,
});

export const fractionAdd = (a: Fraction, b: Fraction): Fraction => ({
  numerator: a.numerator * b.denominator + b.numerator * a.denominator,
  denominator: a.denominator * b.denominator,
});

export const fractionSubtract = (a: Fraction, b: Fraction): Fraction => ({
  numerator: a.numerator * b.denominator - b.numerator * a.denominator,
  denominator: a.denominator * b.denominator,
});

export const fractionMultiply = (a: Fraction, b: Fraction): Fraction => ({
  numerator: a.numerator * b.numerator,
  denominator: a.denominator * b.denominator,
});

export const fractionDivide = (a: Fraction, b: Fraction): Fraction => ({
  numerator: a.numerator * b.denominator,
  denominator: a.denominator * b.numerator,
});

export const fractionLessThan = (a: Fraction, b: Fraction): boolean =>
  a.numerator * b.denominator < a.denominator * b.numerator;

export const fractionGreaterThan = (a: Fraction, b: Fraction): boolean =>
  a.numerator * b.denominator > a.denominator * b.numerator;

export const fractionEqualTo = (a: Fraction, b: Fraction): boolean =>
  a.numerator * b.denominator === a.denominator * b.numerator;

// toSignificant

// toFixed
