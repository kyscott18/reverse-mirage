import {
  currencyAmountEqualTo,
  makeCurrencyAmountFromString,
} from "../currencyAmountUtils.js";
import { readAndParse } from "../readUtils.js";
import { BOB, anvilEther } from "../test/constants.js";
import { publicClient, walletClient } from "../test/utils.js";
import { nativeBalance } from "./reads.js";
import { nativeTransfer } from "./writes.js";
import { describe, expect, test } from "vitest";

describe("native writes", () => {
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
});
