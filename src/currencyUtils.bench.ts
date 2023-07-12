import { currencyEqualTo, currencySortsBefore } from "./currencyUtils.js";
import { mockERC20 } from "./test/constants.js";
import { Token as UniswapToken } from "@uniswap/sdk-core";
import { zeroAddress } from "viem";
import { bench, describe } from "vitest";

const zeroToken = {
  chainID: 1,
  address: zeroAddress,
  name: "Zero Token",
  symbol: "ZERO",
  decimals: 18,
};
const uniswapMockERC20 = new UniswapToken(
  mockERC20.chainID,
  mockERC20.address,
  mockERC20.decimals,
  mockERC20.name,
  mockERC20.symbol,
);
const uniswapZeroToken = new UniswapToken(
  mockERC20.chainID,
  zeroAddress,
  mockERC20.decimals,
  "Zero Token",
  "ZERO",
);

describe("currency equal to", () => {
  bench("reverse mirage", () => {
    currencyEqualTo(mockERC20, mockERC20);
  });

  bench("uniswap", () => {
    uniswapMockERC20.equals(uniswapMockERC20);
  });
});

describe("currency sort", () => {
  bench("reverse mirage", () => {
    currencySortsBefore(mockERC20, zeroToken);
  });

  bench("uniswap", () => {
    uniswapMockERC20.sortsBefore(uniswapZeroToken);
  });
});
