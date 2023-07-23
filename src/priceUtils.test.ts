import {
  amountEqualTo,
  makeAmountFromRaw,
  makeAmountFromString,
} from "./amountUtils.js";
import { fractionEqualTo, makeFraction } from "./fractionUtils.js";
import {
  adjustedPrice,
  makePrice,
  makePriceFromAmounts,
  makePriceFromFraction,
  priceAdd,
  priceDivide,
  priceEqualTo,
  priceGreaterThan,
  priceInvert,
  priceLessThan,
  priceMultiply,
  priceQuote,
  priceSubtract,
  rawPrice,
} from "./priceUtils.js";
import { mockERC20 } from "./test/constants.js";
import { zeroAddress } from "viem";
import { describe, expect, test } from "vitest";

const one = {
  type: "price",
  quote: mockERC20,
  base: mockERC20,
  numerator: 1n,
  denominator: 1n,
} as const;
const two = {
  type: "price",
  quote: mockERC20,
  base: mockERC20,
  numerator: 2n,
  denominator: 1n,
} as const;

describe.concurrent("price utils", () => {
  test("can make price from fraction", () => {
    expect(
      priceEqualTo(
        makePriceFromFraction(mockERC20, mockERC20, makeFraction(1)),
        one,
      ),
    ).toBe(true);
  });

  test("can make price from amounts", () => {
    expect(
      priceEqualTo(
        makePriceFromAmounts(
          makeAmountFromRaw(mockERC20, 1n),
          makeAmountFromRaw(mockERC20, 1n),
        ),
        one,
      ),
    );
  });

  test("can make price", () => {
    expect(priceEqualTo(makePrice(mockERC20, mockERC20, 1n, 1n), one));
    expect(priceEqualTo(makePrice(mockERC20, mockERC20, "1"), one));
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
        type: "erc20Amount",
        token: { ...mockERC20, address: zeroAddress },
        amount: 2n,
      }),
    ).toThrowError();
    expect(
      amountEqualTo(
        priceQuote(two, makeAmountFromRaw(mockERC20, 1n)),
        makeAmountFromRaw(mockERC20, 2n),
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

  test.todo("can print fixed");

  test.todo("can print significant");
});

const mockERC20Decimals = { ...mockERC20, decimals: 9 };

const oneDecimals = {
  type: "price",
  quote: mockERC20Decimals,
  base: mockERC20,
  numerator: 1n,
  denominator: 10n ** 9n,
} as const;
const twoDecimals = {
  type: "price",
  quote: mockERC20Decimals,
  base: mockERC20,
  numerator: 2n,
  denominator: 10n ** 9n,
} as const;

describe.concurrent("price utils with decimals", () => {
  test("can make price from fraction", () => {
    expect(
      priceEqualTo(
        makePriceFromFraction(mockERC20Decimals, mockERC20, makeFraction(1)),
        oneDecimals,
      ),
    ).toBe(true);
  });

  test("can make price from amounts", () => {
    expect(
      priceEqualTo(
        makePriceFromAmounts(
          makeAmountFromRaw(mockERC20Decimals, 1n),
          makeAmountFromRaw(mockERC20, 1n),
        ),
        oneDecimals,
      ),
    );
  });

  test("can make price", () => {
    expect(
      priceEqualTo(
        makePrice(mockERC20Decimals, mockERC20, 1n, 1n),
        oneDecimals,
      ),
    );
    expect(
      priceEqualTo(makePrice(mockERC20Decimals, mockERC20, "1"), oneDecimals),
    );
  });

  test("can invert", () => {
    expect(
      priceEqualTo(priceInvert(oneDecimals), {
        type: "price",
        quote: mockERC20,
        base: mockERC20Decimals,
        numerator: 10n ** 9n,
        denominator: 1n,
      }),
    ).toBe(true);
    expect(
      priceEqualTo(priceInvert(twoDecimals), {
        type: "price",
        quote: mockERC20,
        base: mockERC20Decimals,
        numerator: 10n ** 9n,
        denominator: 2n,
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
        priceQuote(twoDecimals, makeAmountFromString(mockERC20, "1")),
        makeAmountFromString(mockERC20Decimals, "2"),
      ),
    ).toBe(true);
  });

  test("can raw price", () => {
    expect(
      fractionEqualTo(rawPrice(oneDecimals), {
        type: "fraction",
        numerator: 1n,
        denominator: 10n ** 9n,
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
  });
});
