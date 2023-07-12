import { currencyEqualTo, currencySort } from "./currencyUtils.js";
import { anvilEther, mockERC20 } from "./test/constants.js";
import { Address, zeroAddress } from "viem";
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
    expect(() => currencySort(mockERC20, mockERC20)).toThrowError();
    expect(() =>
      currencySort(mockERC20, { ...mockERC20, chainID: 2 }),
    ).toThrowError();

    const zeroToken = {
      chainID: 1,
      address: zeroAddress,
      name: "Zero Token",
      symbol: "ZERO",
      decimals: 18,
    };
    const [token0, token1] = currencySort(mockERC20, zeroToken);

    expect(currencyEqualTo(zeroToken, token0)).toBe(true);
    expect(currencyEqualTo(mockERC20, token1)).toBe(true);
  });
});
