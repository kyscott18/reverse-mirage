import {
  currencyAmountEqualTo,
  makeCurrencyAmountFromString,
} from "../currencyAmountUtils.js";
import { readAndParse } from "../readUtils.js";
import { ALICE, BOB, mockERC20 } from "../test/constants.js";
import { publicClient, walletClient } from "../test/utils.js";
import { erc20BalanceOf } from "./reads.js";
import { erc20Transfer } from "./writes.js";
import { describe, expect, test } from "vitest";

describe("erc20 writes", () => {
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
    console.log(balanceOfAlice);
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
