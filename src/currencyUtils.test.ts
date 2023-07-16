import { currencyEqualTo, currencySortsBefore } from "./currencyUtils.js";
import { anvilEther, mockERC20 } from "./test/constants.js";
import type { Address } from "viem";
import { zeroAddress } from "viem";
import { describe, expect, test } from "vitest";

describe.concurrent("currency utils", () => {
  test("can equal to", () => {
    expect(currencyEqualTo(mockERC20, mockERC20)).toBe(true);
    expect(currencyEqualTo(anvilEther, anvilEther)).toBe(true);
    expect(
      currencyEqualTo(mockERC20, {
        ...mockERC20,
        address: mockERC20.address.toLowerCase() as Address,
      }),
    ).toBe(true);
    expect(
      currencyEqualTo(mockERC20, {
        ...mockERC20,
        symbol: "fkadsjfa;l",
      }),
    ).toBe(true);
    expect(
      currencyEqualTo(mockERC20, {
        ...mockERC20,
        chainID: 2,
      }),
    ).toBe(false);
    expect(currencyEqualTo(anvilEther, mockERC20)).toBe(false);
  });

  test("can sort", () => {
    expect(() => currencySortsBefore(mockERC20, mockERC20)).toThrowError();
    expect(() =>
      currencySortsBefore(mockERC20, { ...mockERC20, chainID: 2 }),
    ).toThrowError();

    const zeroToken = {
      type: "token",
      chainID: 1,
      address: zeroAddress,
      name: "Zero Token",
      symbol: "ZERO",
      decimals: 18,
    } as const;

    expect(currencySortsBefore(mockERC20, zeroToken)).toBe(false);
  });
});
