import { describe, expect, test } from "vitest";
import { BOB, anvilEther } from "../_test/constants.js";
import { publicClient } from "../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../amountUtils.js";
import { readAndParse } from "../readUtils.js";
import { nativeBalance } from "./reads.js";

describe("native reads", () => {
  test("can read native balance", async () => {
    const nativeBalanceBob = await readAndParse(
      nativeBalance(publicClient, { nativeCurrency: anvilEther, address: BOB }),
    );

    expect(
      amountEqualTo(
        nativeBalanceBob,
        createAmountFromString(anvilEther, "10000"),
      ),
    ).toBe(true);
  });
});
