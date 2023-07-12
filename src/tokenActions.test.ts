import {
  currencyAmountEqualTo,
  makeCurrencyAmountFromString,
} from "./currencyAmountUtils.js";
import { readAndParse } from "./readUtils.js";
import { ALICE, BOB, anvilEther, mockERC20 } from "./test/constants.js";
import { publicClient, walletClient } from "./test/utils.js";
import {
  erc20Allowance,
  erc20BalanceOf,
  erc20Decimals,
  erc20GetToken,
  erc20Name,
  erc20Symbol,
  erc20TotalSupply,
  erc20Transfer,
  nativeBalance,
  nativeTransfer,
} from "./tokenActions.js";
import { getAddress, isAddress } from "viem/utils";
import { describe, expect, test } from "vitest";

describe("token actions", () => {
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

  test("can read native balance", async () => {
    const nativeBalanceBob = await readAndParse(
      nativeBalance(publicClient, { nativeCurrency: anvilEther, address: BOB }),
    );

    expect(
      currencyAmountEqualTo(
        nativeBalanceBob,
        makeCurrencyAmountFromString(anvilEther, "10000"),
      ),
    ).toBe(true);
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

  test("can native transfer", async () => {
    const transaction = await walletClient.sendTransaction({
      ...nativeTransfer({
        to: BOB,
        amount: makeCurrencyAmountFromString(anvilEther, "1"),
      }),
    });

    await publicClient.waitForTransactionReceipt({ hash: transaction });

    const nativeBalanceBob = await readAndParse(
      nativeBalance(publicClient, { nativeCurrency: anvilEther, address: BOB }),
    );

    expect(
      currencyAmountEqualTo(
        nativeBalanceBob,
        makeCurrencyAmountFromString(anvilEther, "10001"),
      ),
    ).toBe(true);
  });

  test("can transfer", async () => {
    const { request } = await publicClient.simulateContract({
      account: ALICE,
      ...erc20Transfer({
        to: BOB,
        amount: makeCurrencyAmountFromString(mockERC20, ".25"),
      }),
    });

    const transaction = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({ hash: transaction });

    const balanceOfAlice = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: ALICE }),
    );
    expect(
      currencyAmountEqualTo(
        balanceOfAlice,
        makeCurrencyAmountFromString(mockERC20, ".5"),
      ),
    ).toBe(true);

    const balanceOfBob = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: BOB }),
    );
    expect(
      currencyAmountEqualTo(
        balanceOfBob,
        makeCurrencyAmountFromString(mockERC20, ".5"),
      ),
    ).toBe(true);
  });

  test.todo("can approve", async () => {});

  test.todo("can transfer from", async () => {});
});
