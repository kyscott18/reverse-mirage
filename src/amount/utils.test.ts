import { parseEther } from "viem/utils";
import { describe, expect, test } from "vitest";
import { createFraction } from "../fraction/utils.js";
import type { Token, TokenData } from "../types/token.js";
import {
  amountAdd,
  amountDivide,
  amountEqualTo,
  amountGreaterThan,
  amountLessThan,
  amountMultiply,
  amountSubtract,
  amountToNumber,
  createAmountFromFraction,
  createAmountFromRaw,
  createAmountFromString,
} from "./utils.js";

const mockToken = {
  type: "token",
  chainID: 1,
} as const satisfies Token;

const mockTokenDecimals = {
  type: "token",
  decimals: 18,
  chainID: 1,
} as const satisfies Token & { decimals: number };

const one = {
  type: "tokenAmount",
  token: mockToken,
  amount: 1n,
} as const satisfies TokenData<
  typeof mockToken,
  "tokenAmount",
  { amount: bigint }
>;

const two = {
  type: "tokenAmount",
  token: mockToken,
  amount: 2n,
} as const satisfies TokenData<
  typeof mockToken,
  "tokenAmount",
  { amount: bigint }
>;

const oneDecimals = {
  type: "tokenAmount",
  token: mockTokenDecimals,
  amount: parseEther("1"),
} as const satisfies TokenData<
  typeof mockTokenDecimals,
  "tokenAmount",
  { amount: bigint }
>;
const twoDecimals = {
  type: "tokenAmount",
  token: mockTokenDecimals,
  amount: parseEther("2"),
} as const satisfies TokenData<
  typeof mockTokenDecimals,
  "tokenAmount",
  { amount: bigint }
>;

describe("amount utils", () => {
  test("can create  amount from string", () => {
    expect(amountEqualTo(createAmountFromString(mockToken, "1"), one)).toBe(
      true,
    );
    expect(amountEqualTo(createAmountFromString(mockToken, "2"), two)).toBe(
      true,
    );

    // decimals
    expect(
      amountEqualTo(
        createAmountFromString(mockTokenDecimals, "1"),
        oneDecimals,
      ),
    ).toBe(true);
    expect(
      amountEqualTo(
        createAmountFromString(mockTokenDecimals, "2"),
        twoDecimals,
      ),
    ).toBe(true);
  });

  test("can create amount from bigint", () => {
    expect(amountEqualTo(createAmountFromRaw(mockToken, 1n), one)).toBe(true);
    expect(amountEqualTo(createAmountFromRaw(mockToken, 2n), two)).toBe(true);

    // decimals
    expect(
      amountEqualTo(
        createAmountFromRaw(mockTokenDecimals, parseEther("1")),
        oneDecimals,
      ),
    ).toBe(true);
    expect(
      amountEqualTo(
        createAmountFromRaw(mockTokenDecimals, parseEther("2")),
        twoDecimals,
      ),
    ).toBe(true);
  });

  test("can create amount from fraction", () => {
    expect(
      amountEqualTo(
        createAmountFromFraction(mockToken, createFraction(1)),
        one,
      ),
    ).toBe(true);
    expect(
      amountEqualTo(
        createAmountFromFraction(mockToken, createFraction(2)),
        two,
      ),
    ).toBe(true);

    // decimals
    expect(
      amountEqualTo(
        createAmountFromFraction(mockTokenDecimals, createFraction(1)),
        oneDecimals,
      ),
    ).toBe(true);
    expect(
      amountEqualTo(
        createAmountFromFraction(mockTokenDecimals, createFraction(2)),
        twoDecimals,
      ),
    ).toBe(true);
  });

  test("can add", () => {
    expect(() =>
      amountAdd(one, {
        ...one,
        token: { ...one.token, chainID: 2 as 1 },
      }),
    ).toThrowError();
    expect(amountEqualTo(amountAdd(one, one), two)).toBe(true);
    expect(amountEqualTo(amountAdd(one, 1), two)).toBe(true);

    // decimals
    expect(
      amountEqualTo(amountAdd(oneDecimals, oneDecimals), twoDecimals),
    ).toBe(true);
    expect(amountEqualTo(amountAdd(oneDecimals, 1), twoDecimals)).toBe(true);
  });

  test("can subtract", () => {
    expect(() =>
      amountSubtract(one, {
        ...one,
        token: { ...one.token, chainID: 2 as 1 },
      }),
    ).toThrowError();
    expect(amountEqualTo(amountSubtract(two, one), one)).toBe(true);
    expect(amountEqualTo(amountSubtract(two, 1), one)).toBe(true);

    // decimals
    expect(
      amountEqualTo(amountSubtract(twoDecimals, oneDecimals), oneDecimals),
    ).toBe(true);
    expect(amountEqualTo(amountSubtract(twoDecimals, 1), oneDecimals)).toBe(
      true,
    );
  });

  test("can multiply", () => {
    expect(() =>
      amountMultiply(one, {
        ...one,
        token: { ...one.token, chainID: 2 as 1 },
      }),
    ).toThrowError();

    expect(amountEqualTo(amountMultiply(one, one), one)).toBe(true);
    expect(amountEqualTo(amountMultiply(two, one), two)).toBe(true);
    expect(amountEqualTo(amountMultiply(two, 1), two)).toBe(true);

    // decimals
    expect(
      amountEqualTo(amountMultiply(oneDecimals, oneDecimals), oneDecimals),
    ).toBe(true);
    expect(
      amountEqualTo(amountMultiply(twoDecimals, oneDecimals), twoDecimals),
    ).toBe(true);
    expect(amountEqualTo(amountMultiply(twoDecimals, 1), twoDecimals)).toBe(
      true,
    );
  });

  test("can divide", () => {
    expect(() =>
      amountDivide(one, {
        ...one,
        token: { ...one.token, chainID: 2 as 1 },
      }),
    ).toThrowError();

    expect(amountEqualTo(amountDivide(one, one), one)).toBe(true);
    expect(amountEqualTo(amountDivide(two, one), two)).toBe(true);
    expect(amountEqualTo(amountDivide(two, 1), two)).toBe(true);

    // decimals
    expect(
      amountEqualTo(amountDivide(oneDecimals, oneDecimals), oneDecimals),
    ).toBe(true);
    expect(
      amountEqualTo(amountDivide(twoDecimals, oneDecimals), twoDecimals),
    ).toBe(true);
    expect(amountEqualTo(amountDivide(twoDecimals, 1), twoDecimals)).toBe(true);
  });

  test("can equal", () => {
    expect(() =>
      amountEqualTo(one, {
        ...one,
        token: { ...one.token, chainID: 2 as 1 },
      }),
    ).toThrowError();
    expect(amountEqualTo(one, one)).toBe(true);
    expect(amountEqualTo(two, two)).toBe(true);
    expect(amountEqualTo(two, one)).toBe(false);
    expect(amountEqualTo(two, 2)).toBe(true);
    expect(amountEqualTo(two, 1)).toBe(false);

    // decimals
    expect(amountEqualTo(oneDecimals, oneDecimals)).toBe(true);
    expect(amountEqualTo(twoDecimals, twoDecimals)).toBe(true);
    expect(amountEqualTo(twoDecimals, oneDecimals)).toBe(false);
    expect(amountEqualTo(twoDecimals, 2)).toBe(true);
    expect(amountEqualTo(twoDecimals, 1)).toBe(false);
  });

  test("can less than", () => {
    expect(() =>
      amountLessThan(one, {
        ...one,
        token: { ...one.token, chainID: 2 as 1 },
      }),
    ).toThrowError();
    expect(amountLessThan(one, two)).toBe(true);
    expect(amountLessThan(two, one)).toBe(false);
    expect(amountLessThan(one, one)).toBe(false);
    expect(amountLessThan(two, 1)).toBe(false);
    expect(amountLessThan(one, 1)).toBe(false);

    // decimals
    expect(amountLessThan(oneDecimals, twoDecimals)).toBe(true);
    expect(amountLessThan(twoDecimals, oneDecimals)).toBe(false);
    expect(amountLessThan(oneDecimals, oneDecimals)).toBe(false);
    expect(amountLessThan(twoDecimals, 1)).toBe(false);
    expect(amountLessThan(oneDecimals, 1)).toBe(false);
  });

  test("can greater than", () => {
    expect(() =>
      amountGreaterThan(one, {
        ...one,
        token: { ...one.token, chainID: 2 as 1 },
      }),
    ).toThrowError();
    expect(amountGreaterThan(two, one)).toBe(true);
    expect(amountGreaterThan(one, two)).toBe(false);
    expect(amountGreaterThan(one, one)).toBe(false);
    expect(amountGreaterThan(one, 2)).toBe(false);
    expect(amountGreaterThan(one, 1)).toBe(false);

    // decimals
    expect(amountGreaterThan(twoDecimals, oneDecimals)).toBe(true);
    expect(amountGreaterThan(oneDecimals, twoDecimals)).toBe(false);
    expect(amountGreaterThan(oneDecimals, oneDecimals)).toBe(false);
    expect(amountGreaterThan(oneDecimals, 2)).toBe(false);
    expect(amountGreaterThan(oneDecimals, 1)).toBe(false);
  });

  test("can to number", () => {
    expect(amountToNumber(one)).toBe(1);
    expect(amountToNumber(two)).toBe(2);

    expect(amountToNumber(oneDecimals)).toBe(1);
    expect(amountToNumber(twoDecimals)).toBe(2);
  });
});
