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
} from "./token.js";
import { readAndParse } from "./utils.js";
import { CurrencyAmount } from "@uniswap/sdk-core";
import { getAddress, isAddress, parseEther } from "viem";
import { describe, expect, test } from "vitest";

describe("token", () => {
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

    expect(nativeBalanceBob.equalTo("10000000000000000000000")).toBe(true);
  });

  test("can read balance", async () => {
    const balanceOfALICE = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: ALICE }),
    );
    expect(balanceOfALICE.equalTo("750000000000000000")).toBe(true);

    const balanceOfBOB = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: BOB }),
    );
    expect(balanceOfBOB.equalTo("250000000000000000")).toBe(true);
  });

  test("can read allowance", async () => {
    const allowance = await readAndParse(
      erc20Allowance(publicClient, {
        token: mockERC20,
        address: ALICE,
        spender: BOB,
      }),
    );
    expect(allowance.equalTo("2000000000000000000")).toBe(true);
  });

  test("can read totalSupply", async () => {
    const totalSupply = await readAndParse(
      erc20TotalSupply(publicClient, { token: mockERC20 }),
    );
    expect(totalSupply.equalTo("1000000000000000000")).toBe(true);
  });

  test("can get token", async () => {
    const token = await readAndParse(
      erc20GetToken(publicClient, {
        token: mockERC20,
      }),
    );

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainId).toBe(1);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.decimals).toBe(18);
  });

  test("can native transfer", async () => {
    const transaction = await walletClient.sendTransaction({
      ...nativeTransfer({
        to: BOB,
        amount: CurrencyAmount.fromRawAmount(
          anvilEther,
          parseEther("1").toString(),
        ),
      }),
    });

    await publicClient.waitForTransactionReceipt({ hash: transaction });

    const nativeBalanceBob = await readAndParse(
      nativeBalance(publicClient, { nativeCurrency: anvilEther, address: BOB }),
    );

    expect(nativeBalanceBob.equalTo("10001000000000000000000")).toBe(true);
  });

  test("can transfer", async () => {
    const { request } = await publicClient.simulateContract({
      account: ALICE,
      ...erc20Transfer({
        to: BOB,
        amount: CurrencyAmount.fromRawAmount(
          mockERC20,
          parseEther(".25").toString(),
        ),
      }),
    });

    const transaction = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({ hash: transaction });

    const balanceOfALICE = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: ALICE }),
    );
    expect(balanceOfALICE.equalTo("500000000000000000")).toBe(true);

    const balanceOfBOB = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: BOB }),
    );
    expect(balanceOfBOB.equalTo("500000000000000000")).toBe(true);
  });

  test.todo("can approve", async () => {});

  test.todo("can transfer from", async () => {});
});
