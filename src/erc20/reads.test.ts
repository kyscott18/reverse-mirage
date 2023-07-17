import {
  currencyAmountEqualTo,
  makeCurrencyAmountFromString,
} from "../currencyAmountUtils.js";
import { readAndParse } from "../readUtils.js";
import { ALICE, BOB, mockERC20 } from "../test/constants.js";
import { publicClient } from "../test/utils.js";
import {
  erc20Allowance,
  erc20BalanceOf,
  erc20Decimals,
  erc20GetToken,
  erc20Name,
  erc20Symbol,
  erc20TotalSupply,
} from "./reads.js";
import { getAddress, isAddress } from "viem/utils";
import { describe, expect, test } from "vitest";

describe("erc20 reads", () => {
  test("can deploy the token contract", async () => {
    expect(mockERC20.address).toBeDefined();
    expect(isAddress(mockERC20.address)).toBe(true);
  });

  test("can read name", async () => {
    const name = await readAndParse(
      erc20Name(publicClient, { token: mockERC20 }),
    );

    expect(name).toBe("Mock ERC20");
  });

  test("can read symbol", async () => {
    const symbol = await readAndParse(
      erc20Symbol(publicClient, { token: mockERC20 }),
    );

    expect(symbol).toBe("MOCK");
  });

  test("can read decimals", async () => {
    const decimals = await readAndParse(
      erc20Decimals(publicClient, { token: mockERC20 }),
    );

    expect(decimals).toBe(18);
  });

  test("can read balance", async () => {
    const balanceOfAlice = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: ALICE }),
    );
    expect(
      currencyAmountEqualTo(
        balanceOfAlice,
        makeCurrencyAmountFromString(mockERC20, ".75"),
      ),
    ).toBe(true);

    const balanceOfBob = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: BOB }),
    );
    expect(
      currencyAmountEqualTo(
        balanceOfBob,
        makeCurrencyAmountFromString(mockERC20, ".25"),
      ),
    ).toBe(true);
  });

  test("can read allowance", async () => {
    const allowance = await readAndParse(
      erc20Allowance(publicClient, {
        token: mockERC20,
        address: ALICE,
        spender: BOB,
      }),
    );
    expect(
      currencyAmountEqualTo(
        allowance,
        makeCurrencyAmountFromString(mockERC20, "2"),
      ),
    ).toBe(true);
  });

  test("can read totalSupply", async () => {
    const totalSupply = await readAndParse(
      erc20TotalSupply(publicClient, { token: mockERC20 }),
    );
    expect(
      currencyAmountEqualTo(
        totalSupply,
        makeCurrencyAmountFromString(mockERC20, "1"),
      ),
    ).toBe(true);
  });

  test("can get token", async () => {
    const token = await readAndParse(
      erc20GetToken(publicClient, {
        token: mockERC20,
      }),
    );

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainID).toBe(1);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.decimals).toBe(18);
  });

  test.todo("can approve", async () => {});

  test.todo("can transfer from", async () => {});
});
