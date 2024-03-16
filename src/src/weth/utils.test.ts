import { zeroAddress } from "viem";
import { foundry } from "viem/chains";
import { describe, expect, test } from "vitest";
import { createWETH } from "./utils.js";

const weth = {
  type: "weth",
  name: "Wrapped Ether",
  symbol: "WETH",
  decimals: 18,
  address: zeroAddress,
  chainID: foundry.id,
  blockCreated: 0n,
} as const;

describe("utils", () => {
  test("can create nativeCurrency", () => {
    expect(
      createWETH(zeroAddress, "Wrapped Ether", "WETH", 18, foundry.id),
    ).toStrictEqual(weth);
  });
});
