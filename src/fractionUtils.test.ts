import {
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
  makeFraction,
} from "./fractionUtils.js";
import type { Fraction } from "./types.js";
import { describe, expect, test } from "vitest";

const one: Fraction = { type: "fraction", numerator: 1n, denominator: 1n };
const two: Fraction = { type: "fraction", numerator: 2n, denominator: 1n };

describe.concurrent("fraction utils", () => {
  test("can make fraction", async () => {
    expect(fractionEqualTo(makeFraction(2n, 1n), two)).toBe(true);
    expect(fractionEqualTo(makeFraction(2n), two)).toBe(true);
    expect(fractionEqualTo(makeFraction("2"), two)).toBe(true);
    expect(fractionEqualTo(makeFraction(2), two)).toBe(true);
  });

  test("can make fraction error", () => {
    expect(() => makeFraction(1.1)).toThrowError();
    expect(() => makeFraction("a")).toThrowError();
  });

  test("can quotient", () => {
    expect(fractionQuotient(two)).toBe(2n);
    expect(fractionQuotient(makeFraction(5, 3))).toBe(1n);
    expect(fractionQuotient(makeFraction(1, 2))).toBe(0n);
  });

  test("can remainder", () => {
    expect(fractionRemainder(two)).toBe(0n);
    expect(fractionRemainder(makeFraction(5, 3))).toBe(2n);
    expect(fractionRemainder(makeFraction(1, 2))).toBe(1n);
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
    expect(fractionEqualTo(fractionAdd(one, makeFraction(4n, 4n)), two)).toBe(
      true,
    );
  });

  test("can subtract", () => {
    expect(fractionEqualTo(fractionSubtract(two, one), one)).toBe(true);
    expect(
      fractionEqualTo(fractionSubtract(two, makeFraction(4n, 4n)), one),
    ).toBe(true);
  });

  test("can multiply", () => {
    expect(fractionEqualTo(fractionMultiply(one, one), one)).toBe(true);
    expect(
      fractionEqualTo(fractionMultiply(one, makeFraction(4n, 4n)), one),
    ).toBe(true);

    expect(fractionEqualTo(fractionMultiply(one, two), two)).toBe(true);
    expect(fractionEqualTo(fractionMultiply(two, two), makeFraction(4))).toBe(
      true,
    );
  });

  test("can divide", () => {
    expect(fractionEqualTo(fractionDivide(one, one), one)).toBe(true);
    expect(
      fractionEqualTo(fractionDivide(one, makeFraction(4n, 4n)), one),
    ).toBe(true);

    expect(fractionEqualTo(fractionDivide(two, one), two)).toBe(true);
    expect(fractionEqualTo(fractionDivide(makeFraction(4), two), two)).toBe(
      true,
    );
  });

  test("can less than", () => {
    expect(fractionLessThan(one, two)).toBe(true);
    expect(fractionLessThan(makeFraction(4n, 4n), two)).toBe(true);

    expect(fractionLessThan(two, one)).toBe(false);
    expect(fractionLessThan(two, makeFraction(4n, 4n))).toBe(false);
  });

  test("can equal to", () => {
    expect(fractionEqualTo(two, two)).toBe(true);
    expect(fractionEqualTo(makeFraction(4n, 2n), two)).toBe(true);
  });

  test("can greater than", () => {
    expect(fractionGreaterThan(two, one)).toBe(true);
    expect(fractionGreaterThan(two, makeFraction(4n, 4n))).toBe(true);

    expect(fractionGreaterThan(one, two)).toBe(false);
    expect(fractionGreaterThan(makeFraction(4n, 4n), two)).toBe(false);
  });

  test.todo("can print fixed");

  test.todo("can print significant");
});
