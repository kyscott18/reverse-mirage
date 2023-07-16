import {
  currencyAmountAdd,
  currencyAmountDivide,
  currencyAmountEqualTo,
  currencyAmountGreaterThan,
  currencyAmountLessThan,
  currencyAmountMultiply,
  currencyAmountSubtract,
  makeCurrencyAmountFromFraction,
  makeCurrencyAmountFromRaw,
  makeCurrencyAmountFromString,
} from "./currencyAmountUtils.js";
import { makeFraction } from "./fractionUtils.js";
import { mockERC20 } from "./test/constants.js";
import type { CurrencyAmount } from "./types.js";
import { parseEther } from "viem/utils";
import { describe, expect, test } from "vitest";

const one = {
  type: "currencyAmount",
  currency: mockERC20,
  amount: parseEther("1"),
} as const satisfies CurrencyAmount<typeof mockERC20>;
const two = {
  type: "currencyAmount",
  currency: mockERC20,
  amount: parseEther("2"),
} as const satisfies CurrencyAmount<typeof mockERC20>;

describe.concurrent("currency amount utils", () => {
  test("can make currency amount from string", () => {
    expect(
      currencyAmountEqualTo(makeCurrencyAmountFromString(mockERC20, "1"), one),
    ).toBe(true);
    expect(
      currencyAmountEqualTo(makeCurrencyAmountFromString(mockERC20, "2"), two),
    ).toBe(true);
  });

  test("can make currency amount from bigint", () => {
    expect(
      currencyAmountEqualTo(
        makeCurrencyAmountFromRaw(mockERC20, parseEther("1")),
        one,
      ),
    ).toBe(true);
    expect(
      currencyAmountEqualTo(
        makeCurrencyAmountFromRaw(mockERC20, parseEther("2")),
        two,
      ),
    ).toBe(true);
  });

  test("can make currency amount from fraction", () => {
    expect(
      currencyAmountEqualTo(
        makeCurrencyAmountFromFraction(mockERC20, makeFraction(1)),
        one,
      ),
    ).toBe(true);
    expect(
      currencyAmountEqualTo(
        makeCurrencyAmountFromFraction(mockERC20, makeFraction(2)),
        two,
      ),
    ).toBe(true);
  });

  test("can add", () => {
    expect(() =>
      currencyAmountAdd(one, {
        ...one,
        currency: { ...one.currency, chainID: 2 },
      }),
    ).toThrowError();
    expect(currencyAmountEqualTo(currencyAmountAdd(one, one), two)).toBe(true);
  });

  test("can subtract", () => {
    expect(() =>
      currencyAmountSubtract(one, {
        ...one,
        currency: { ...one.currency, chainID: 2 },
      }),
    ).toThrowError();
    expect(currencyAmountEqualTo(currencyAmountSubtract(two, one), one)).toBe(
      true,
    );
  });

  test("can multiply", () => {
    expect(() =>
      currencyAmountMultiply(one, {
        ...one,
        currency: { ...one.currency, chainID: 2 },
      }),
    ).toThrowError();
    expect(
      currencyAmountEqualTo(
        currencyAmountMultiply(two, two),
        makeCurrencyAmountFromString(mockERC20, "4"),
      ),
    ).toBe(true);
    expect(currencyAmountEqualTo(currencyAmountMultiply(two, one), two)).toBe(
      true,
    );
  });

  test("can divide", () => {
    expect(() =>
      currencyAmountDivide(one, {
        ...one,
        currency: { ...one.currency, chainID: 2 },
      }),
    ).toThrowError();
    expect(
      currencyAmountEqualTo(
        currencyAmountDivide(makeCurrencyAmountFromString(mockERC20, "4"), two),
        two,
      ),
    ).toBe(true);
    expect(currencyAmountEqualTo(currencyAmountDivide(two, one), two)).toBe(
      true,
    );
  });

  test("can equal", () => {
    expect(() =>
      currencyAmountEqualTo(one, {
        ...one,
        currency: { ...one.currency, chainID: 2 },
      }),
    ).toThrowError();
    expect(currencyAmountEqualTo(one, one)).toBe(true);
    expect(currencyAmountEqualTo(two, two)).toBe(true);
    expect(currencyAmountEqualTo(two, one)).toBe(false);
  });

  test("can less than", () => {
    expect(() =>
      currencyAmountLessThan(one, {
        ...one,
        currency: { ...one.currency, chainID: 2 },
      }),
    ).toThrowError();
    expect(currencyAmountLessThan(one, two)).toBe(true);
    expect(currencyAmountLessThan(two, one)).toBe(false);
    expect(currencyAmountLessThan(one, one)).toBe(false);
  });

  test("can greater than", () => {
    expect(() =>
      currencyAmountGreaterThan(one, {
        ...one,
        currency: { ...one.currency, chainID: 2 },
      }),
    ).toThrowError();
    expect(currencyAmountGreaterThan(two, one)).toBe(true);
    expect(currencyAmountGreaterThan(one, two)).toBe(false);
    expect(currencyAmountGreaterThan(one, one)).toBe(false);
  });

  test.todo("can print fixed");

  test.todo("can print significant");
});
