import invariant from "tiny-invariant";
import { type Hex, zeroAddress } from "viem";
import { foundry } from "viem/chains";
import { describe, expect, test } from "vitest";
import ERC20PermitHashTypedData from "../../../../contracts/out/ERC20PermitHashTypedData.sol/ERC20PermitHashTypedData.json";
import { ALICE } from "../_test/constants.js";
import { publicClient, walletClient } from "../_test/utils.js";
import { amountEqualTo } from "../amount/utils.js";
import { createFraction } from "../fraction/utils.js";
import { erc20PermitHashTypedDataABI } from "../generated.js";
import {
  createERC20,
  createERC20Permit,
  createERC20PermitDataFromFraction,
  createERC20PermitDataFromRaw,
  createERC20PermitDataFromString,
  erc20PermitTypedDataHash,
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

  test("can hash typed data", async () => {
    const deployHash = await walletClient.deployContract({
      account: ALICE,
      abi: erc20PermitHashTypedDataABI,
      bytecode: ERC20PermitHashTypedData.bytecode.object as Hex,
      args: ["Mock ERC20", "MOCK", 18],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);

    const erc20Permit = createERC20Permit(
      contractAddress,
      "Mock ERC20",
      "MOCK",
      18,
      "1",
      foundry.id,
    );

    expect(
      erc20PermitTypedDataHash({
        amount: createERC20PermitDataFromRaw(erc20Permit, 1n, 0n),
        owner: ALICE,
        spender: ALICE,
        deadline: 0n,
      }),
    ).toBe(
      await publicClient.readContract({
        abi: erc20PermitHashTypedDataABI,
        address: contractAddress,
        functionName: "hashTypedData",
        args: [ALICE, ALICE, 1n, 0n],
      }),
    );
  });
});
