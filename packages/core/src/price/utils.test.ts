import { describe, expect, test } from "vitest";
import { mockToken } from "../_test/constants.js";
import {
  amountEqualTo,
  createAmountFromRaw,
  createAmountFromString,
} from "../amount/utils.js";
import { createFraction, fractionEqualTo } from "../fraction/utils.js";
import {
  adjustedPrice,
  createPrice,
  createPriceFromAmounts,
  createPriceFromFraction,
  priceAdd,
  priceDivide,
  priceEqualTo,
  priceGreaterThan,
  priceInvert,
  priceLessThan,
  priceMultiply,
  priceQuote,
  priceSubtract,
  priceToNumber,
  rawPrice,
} from "./utils.js";

const one = {
  type: "price",
  quote: mockToken,
  base: mockToken,
  numerator: 1n,
  denominator: 1n,
} as const;
const two = {
  type: "price",
  quote: mockToken,
  base: mockToken,
  numerator: 2n,
  denominator: 1n,
} as const;

describe("price utils", () => {
  test("can create price from fraction", () => {
    expect(
      priceEqualTo(
        createPriceFromFraction(mockToken, mockToken, createFraction(1)),
        one,
      ),
    ).toBe(true);
  });

  test("can create price from amounts", () => {
    expect(
      priceEqualTo(
        createPriceFromAmounts(
          createAmountFromRaw(mockToken, 1n),
          createAmountFromRaw(mockToken, 1n),
        ),
        one,
      ),
    );
  });

  test("can create price", () => {
    expect(priceEqualTo(createPrice(mockToken, mockToken, 1n, 1n), one));
    expect(priceEqualTo(createPrice(mockToken, mockToken, "1"), one));
  });

  test("can invert", () => {
    expect(priceEqualTo(priceInvert(one), one)).toBe(true);
    expect(
      priceEqualTo(priceInvert(two), {
        ...two,
        numerator: 1n,
        denominator: 2n,
      }),
    );
  });

  test("can add", () => {
    expect(() =>
      priceAdd(one, { ...one, quote: { ...one.quote, chainID: 2 } }),
    ).toThrowError();
    expect(priceEqualTo(priceAdd(one, one), two)).toBe(true);
    expect(priceEqualTo(priceAdd(one, 1), two)).toBe(true);
  });

  test("can subtract", () => {
    expect(() =>
      priceSubtract(one, { ...one, quote: { ...one.quote, chainID: 2 } }),
    ).toThrowError();
    expect(priceEqualTo(priceSubtract(two, one), one)).toBe(true);
    expect(priceEqualTo(priceSubtract(two, 1), one)).toBe(true);
  });

  test("can multiply", () => {
    expect(() =>
      priceMultiply(one, { ...one, quote: { ...one.quote, chainID: 2 } }),
    ).toThrowError();
    expect(priceEqualTo(priceMultiply(one, one), one)).toBe(true);
    expect(priceEqualTo(priceMultiply(one, two), two)).toBe(true);
    expect(priceEqualTo(priceMultiply(one, 1), one)).toBe(true);
    expect(priceEqualTo(priceMultiply(one, 2), two)).toBe(true);
  });

  test("can divide", () => {
    expect(() =>
      priceDivide(one, { ...one, quote: { ...one.quote, chainID: 2 } }),
    ).toThrowError();
    expect(priceEqualTo(priceDivide(one, one), one)).toBe(true);
    expect(priceEqualTo(priceDivide(two, one), two)).toBe(true);
    expect(priceEqualTo(priceDivide(one, 1), one)).toBe(true);
    expect(priceEqualTo(priceDivide(two, 1), two)).toBe(true);
  });

  test("can less than", () => {
    expect(() =>
      priceLessThan(one, { ...one, quote: { ...one.quote, chainID: 2 } }),
    ).toThrowError();
    expect(priceLessThan(one, two)).toBe(true);
    expect(priceLessThan(one, one)).toBe(false);
    expect(priceLessThan(two, one)).toBe(false);
    expect(priceLessThan(one, 1)).toBe(false);
    expect(priceLessThan(two, 1)).toBe(false);
  });

  test("can equal to", () => {
    expect(() =>
      priceEqualTo(one, { ...one, quote: { ...one.quote, chainID: 2 } }),
    ).toThrowError();
    expect(priceEqualTo(one, one)).toBe(true);
    expect(priceEqualTo(two, two)).toBe(true);
    expect(priceEqualTo(two, one)).toBe(false);
    expect(priceEqualTo(two, 2)).toBe(true);
    expect(priceEqualTo(two, 1)).toBe(false);
  });

  test("can greater than", () => {
    expect(() =>
      priceLessThan(one, { ...one, quote: { ...one.quote, chainID: 2 } }),
    ).toThrowError();
    expect(priceGreaterThan(two, one)).toBe(true);
    expect(priceGreaterThan(one, one)).toBe(false);
    expect(priceGreaterThan(one, two)).toBe(false);
    expect(priceGreaterThan(one, 1)).toBe(false);
    expect(priceGreaterThan(one, 2)).toBe(false);
  });

  test("can quote", () => {
    expect(() =>
      priceQuote(one, {
        type: "tokenAmount",
        token: { ...mockToken },
        amount: 2n,
      }),
    ).toThrowError();
    expect(
      amountEqualTo(
        priceQuote(two, createAmountFromRaw(mockToken, 1n)),
        createAmountFromRaw(mockToken, 2n),
      ),
    ).toBe(true);
  });

  test("can raw price", () => {
    expect(
      fractionEqualTo(rawPrice(one), {
        type: "fraction",
        numerator: 1n,
        denominator: 1n,
      }),
    ).toBe(true);
  });

  test("can adjusted price", () => {
    expect(
      fractionEqualTo(adjustedPrice(one), {
        type: "fraction",
        numerator: 1n,
        denominator: 1n,
      }),
    ).toBe(true);
  });

  test("can to number", () => {
    expect(priceToNumber(one)).toBe(1);
    expect(priceToNumber(two)).toBe(2);
  });
});

const mockERC20Decimals = { ...mockToken, decimals: 9 };

const oneDecimals = {
  type: "price",
  quote: mockERC20Decimals,
  base: mockToken,
  numerator: 10n ** 9n,
  denominator: 1n,
} as const;
const twoDecimals = {
  type: "price",
  quote: oneDecimals.quote,
  base: oneDecimals.base,
  numerator: 2n * 10n ** 9n,
  denominator: 1n,
} as const;

describe("price utils with decimals", () => {
  test("can create price from fraction", () => {
    expect(
      priceEqualTo(
        createPriceFromFraction(
          mockERC20Decimals,
          mockToken,
          createFraction(1),
        ),
        oneDecimals,
      ),
    ).toBe(true);

    expect(
      priceEqualTo(
        createPriceFromFraction(
          mockToken,
          mockERC20Decimals,
          createFraction(1),
        ),
        priceInvert(oneDecimals),
      ),
    ).toBe(true);
  });

  test("can create price from amounts", () => {
    expect(
      priceEqualTo(
        createPriceFromAmounts(
          createAmountFromRaw(mockERC20Decimals, 1n),
          createAmountFromRaw(mockToken, 1n),
        ),
        oneDecimals,
      ),
    );
  });

  test("can create price", () => {
    expect(
      priceEqualTo(
        createPrice(mockERC20Decimals, mockToken, 1n, 1n),
        oneDecimals,
      ),
    );
    expect(
      priceEqualTo(createPrice(mockERC20Decimals, mockToken, "1"), oneDecimals),
    );

    expect(
      priceEqualTo(
        createPrice(mockToken, mockERC20Decimals, "1"),
        priceInvert(oneDecimals),
      ),
    );
  });

  test("can invert", () => {
    expect(
      priceEqualTo(priceInvert(oneDecimals), {
        type: "price",
        quote: mockToken,
        base: mockERC20Decimals,
        numerator: 1n,
        denominator: 10n ** 9n,
      }),
    ).toBe(true);
    expect(
      priceEqualTo(priceInvert(twoDecimals), {
        type: "price",
        quote: mockToken,
        base: mockERC20Decimals,
        numerator: 1n,
        denominator: 2n * 10n ** 9n,
      }),
    ).toBe(true);
  });

  test("can add", () => {
    expect(priceEqualTo(priceAdd(oneDecimals, oneDecimals), twoDecimals)).toBe(
      true,
    );
    expect(priceEqualTo(priceAdd(oneDecimals, 1), twoDecimals)).toBe(true);
  });

  test("can subtract", () => {
    expect(
      priceEqualTo(priceSubtract(twoDecimals, oneDecimals), oneDecimals),
    ).toBe(true);
    expect(priceEqualTo(priceSubtract(twoDecimals, 1), oneDecimals)).toBe(true);
  });

  test("can multiply", () => {
    expect(
      priceEqualTo(priceMultiply(oneDecimals, oneDecimals), oneDecimals),
    ).toBe(true);
    expect(
      priceEqualTo(priceMultiply(oneDecimals, twoDecimals), twoDecimals),
    ).toBe(true);
    expect(priceEqualTo(priceMultiply(oneDecimals, 2), twoDecimals)).toBe(true);
  });

  test("can divide", () => {
    expect(
      priceEqualTo(priceDivide(oneDecimals, oneDecimals), oneDecimals),
    ).toBe(true);
    expect(
      priceEqualTo(priceDivide(twoDecimals, oneDecimals), twoDecimals),
    ).toBe(true);
    expect(priceEqualTo(priceDivide(twoDecimals, 1), twoDecimals)).toBe(true);
  });

  test("can less than", () => {
    expect(priceLessThan(oneDecimals, twoDecimals)).toBe(true);
    expect(priceLessThan(oneDecimals, oneDecimals)).toBe(false);
    expect(priceLessThan(twoDecimals, oneDecimals)).toBe(false);
    expect(priceLessThan(oneDecimals, 2)).toBe(true);
    expect(priceLessThan(oneDecimals, 1)).toBe(false);
    expect(priceLessThan(twoDecimals, 1)).toBe(false);
  });

  test("can equal to", () => {
    expect(priceEqualTo(oneDecimals, oneDecimals)).toBe(true);
    expect(priceEqualTo(twoDecimals, twoDecimals)).toBe(true);
    expect(priceEqualTo(twoDecimals, oneDecimals)).toBe(false);
    expect(priceEqualTo(oneDecimals, 1)).toBe(true);
    expect(priceEqualTo(twoDecimals, 2)).toBe(true);
    expect(priceEqualTo(twoDecimals, 1)).toBe(false);
  });

  test("can greater than", () => {
    expect(priceGreaterThan(twoDecimals, oneDecimals)).toBe(true);
    expect(priceGreaterThan(oneDecimals, oneDecimals)).toBe(false);
    expect(priceGreaterThan(oneDecimals, twoDecimals)).toBe(false);
    expect(priceGreaterThan(twoDecimals, 1)).toBe(true);
    expect(priceGreaterThan(oneDecimals, 1)).toBe(false);
    expect(priceGreaterThan(oneDecimals, 2)).toBe(false);
  });

  test("can quote", () => {
    expect(
      amountEqualTo(
        priceQuote(twoDecimals, createAmountFromString(mockToken, "1")),
        createAmountFromString(mockERC20Decimals, "2"),
      ),
    ).toBe(true);
  });

  test("can raw price", () => {
    expect(
      fractionEqualTo(rawPrice(oneDecimals), {
        type: "fraction",
        numerator: 10n ** 9n,
        denominator: 1n,
      }),
    ).toBe(true);
  });

  test("can adjusted price", () => {
    expect(
      fractionEqualTo(adjustedPrice(oneDecimals), {
        type: "fraction",
        numerator: 1n,
        denominator: 1n,
      }),
    ).toBe(true);

    expect(
      fractionEqualTo(adjustedPrice(priceInvert(oneDecimals)), {
        type: "fraction",
        numerator: 1n,
        denominator: 1n,
      }),
    ).toBe(true);
  });

  test("can to number", () => {
    expect(priceToNumber(oneDecimals)).toBe(1);
    expect(priceToNumber(twoDecimals)).toBe(2);
  });
});
