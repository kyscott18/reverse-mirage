import { expect, test } from "vitest";
import type { Fraction } from "./types.js";
import {
  createFraction,
  fractionAdd,
  fractionDivide,
  fractionEqualTo,
  fractionGreaterThan,
  fractionInvert,
  fractionLessThan,
  fractionMultiply,
  fractionQuotient,
  fractionRemainder,
  fractionSubtract,
} from "./utils.js";

const one: Fraction = { type: "fraction", numerator: 1n, denominator: 1n };
const two: Fraction = { type: "fraction", numerator: 2n, denominator: 1n };

test("create fraction", async () => {
  expect(fractionEqualTo(createFraction(2n, 1n), two)).toBe(true);
  expect(fractionEqualTo(createFraction(2n), two)).toBe(true);
  expect(fractionEqualTo(createFraction("2"), two)).toBe(true);
  expect(fractionEqualTo(createFraction(2), two)).toBe(true);
});

test("create fraction error", () => {
  expect(() => createFraction(1.1)).toThrowError();
  expect(() => createFraction("a")).toThrowError();
});

test("can quotient", () => {
  expect(fractionQuotient(two)).toBe(2n);
  expect(fractionQuotient(createFraction(5, 3))).toBe(1n);
  expect(fractionQuotient(createFraction(1, 2))).toBe(0n);
});

test("can remainder", () => {
  expect(fractionRemainder(two)).toBe(0n);
  expect(fractionRemainder(createFraction(5, 3))).toBe(2n);
  expect(fractionRemainder(createFraction(1, 2))).toBe(1n);
});

test("can invert", () => {
  expect(fractionEqualTo(fractionInvert(one), one)).toBe(true);
  expect(
    fractionEqualTo(fractionInvert(two), {
      type: "fraction",
      numerator: 1n,
      denominator: 2n,
    }),
  ).toBe(true);
});

test("can add", () => {
  expect(fractionEqualTo(fractionAdd(one, one), two)).toBe(true);
  expect(fractionEqualTo(fractionAdd(one, createFraction(4n, 4n)), two)).toBe(
    true,
  );
  expect(fractionEqualTo(fractionAdd(one, 1), two)).toBe(true);
});

test("can subtract", () => {
  expect(fractionEqualTo(fractionSubtract(two, one), one)).toBe(true);
  expect(
    fractionEqualTo(fractionSubtract(two, createFraction(4n, 4n)), one),
  ).toBe(true);
  expect(fractionEqualTo(fractionSubtract(two, 1), one)).toBe(true);
});

test("can multiply", () => {
  expect(fractionEqualTo(fractionMultiply(one, one), one)).toBe(true);
  expect(
    fractionEqualTo(fractionMultiply(one, createFraction(4n, 4n)), one),
  ).toBe(true);

  expect(fractionEqualTo(fractionMultiply(one, two), two)).toBe(true);
  expect(fractionEqualTo(fractionMultiply(two, two), createFraction(4))).toBe(
    true,
  );

  expect(fractionEqualTo(fractionMultiply(one, 1), one)).toBe(true);
  expect(fractionEqualTo(fractionMultiply(one, 2), two)).toBe(true);
});

test("can divide", () => {
  expect(fractionEqualTo(fractionDivide(one, one), one)).toBe(true);
  expect(
    fractionEqualTo(fractionDivide(one, createFraction(4n, 4n)), one),
  ).toBe(true);

  expect(fractionEqualTo(fractionDivide(two, one), two)).toBe(true);
  expect(fractionEqualTo(fractionDivide(createFraction(4), two), two)).toBe(
    true,
  );

  expect(fractionEqualTo(fractionDivide(one, 1), one)).toBe(true);
  expect(fractionEqualTo(fractionDivide(two, 1), two)).toBe(true);
});

test("can less than", () => {
  expect(fractionLessThan(one, two)).toBe(true);
  expect(fractionLessThan(createFraction(4n, 4n), two)).toBe(true);

  expect(fractionLessThan(two, one)).toBe(false);
  expect(fractionLessThan(two, createFraction(4n, 4n))).toBe(false);

  expect(fractionLessThan(one, 2)).toBe(true);
  expect(fractionLessThan(two, 1)).toBe(false);
});

test("can equal to", () => {
  expect(fractionEqualTo(two, two)).toBe(true);
  expect(fractionEqualTo(createFraction(4n, 2n), two)).toBe(true);

  expect(fractionEqualTo(one, 1)).toBe(true);
});

test("can greater than", () => {
  expect(fractionGreaterThan(two, one)).toBe(true);
  expect(fractionGreaterThan(two, createFraction(4n, 4n))).toBe(true);

  expect(fractionGreaterThan(one, two)).toBe(false);
  expect(fractionGreaterThan(createFraction(4n, 4n), two)).toBe(false);

  expect(fractionGreaterThan(two, 1)).toBe(true);
  expect(fractionGreaterThan(one, 2)).toBe(false);
});

test.todo("can print fixed");

test.todo("can print significant");
