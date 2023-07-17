import {
  currencyAmountEqualTo,
  makeCurrencyAmountFromString,
} from "../currencyAmountUtils.js";
import { readAndParse } from "../readUtils.js";
import { BOB, anvilEther } from "../test/constants.js";
import { publicClient } from "../test/utils.js";
import { nativeBalance } from "./reads.js";
import { describe, expect, test } from "vitest";

describe("native reads", () => {
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
});
