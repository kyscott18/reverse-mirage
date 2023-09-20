import { zeroAddress } from "viem";
import { foundry } from "viem/chains";
import { describe, expect, test } from "vitest";
import { amountEqualTo } from "../amount/utils.js";
import { createFraction } from "../fraction/utils.js";
import {
  createERC20,
  createERC20Permit,
  createERC20PermitDataFromFraction,
  createERC20PermitDataFromRaw,
  createERC20PermitDataFromString,
} from "./utils.js";

const erc20Permit = {
  type: "erc20Permit",
  address: zeroAddress,
  name: "name",
  symbol: "symbol",
  decimals: 18,
  version: "1",
  chainID: foundry.id,
  blockCreated: 0n,
} as const;

describe("utils", () => {
  test("can create erc20", () => {
    expect(
      createERC20(zeroAddress, "name", "symbol", 18, foundry.id),
    ).toStrictEqual({
      type: "erc20",
      address: zeroAddress,
      name: "name",
      symbol: "symbol",
      decimals: 18,
      chainID: foundry.id,
      blockCreated: 0n,
    });
  });

  test("can create erc20permit", () => {
    expect(
      createERC20Permit(zeroAddress, "name", "symbol", 18, "1", foundry.id),
    ).toStrictEqual(erc20Permit);
  });

  test("can create erc20Permit amount from string", () => {
    expect(
      amountEqualTo(createERC20PermitDataFromString(erc20Permit, "1", 0n), 1),
    ).toBe(true);
    expect(createERC20PermitDataFromString(erc20Permit, "1", 0n).nonce).toBe(
      0n,
    );
  });

  test("can create erc20Permit amount from fraction", () => {
    expect(
      amountEqualTo(
        createERC20PermitDataFromFraction(erc20Permit, createFraction(1), 0n),
        1,
      ),
    ).toBe(true);
    expect(
      createERC20PermitDataFromFraction(erc20Permit, createFraction(1), 0n)
        .nonce,
    ).toBe(0n);
  });

  test("can create erc20Permit amount from raw", () => {
    expect(
      amountEqualTo(
        createERC20PermitDataFromRaw(erc20Permit, 10n ** 18n, 0n),
        1,
      ),
    ).toBe(true);
    expect(
      createERC20PermitDataFromRaw(erc20Permit, 10n ** 18n, 0n).nonce,
    ).toBe(0n);
  });
});
