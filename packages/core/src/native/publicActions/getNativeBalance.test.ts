import { expect, test } from "vitest";
import { BOB, anvilEther } from "../../_test/constants.js";
import { publicClient } from "../../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../../amount/utils.js";
import { getNativeBalance } from "./getNativeBalance.js";

test("get native balance", async () => {
  const nativeBalanceBob = await getNativeBalance({
    args: { nativeCurrency: anvilEther, address: BOB },
    client: publicClient,
  });

  expect(
    amountEqualTo(
      nativeBalanceBob,
      createAmountFromString(anvilEther, "10000"),
    ),
  ).toBe(true);
});
