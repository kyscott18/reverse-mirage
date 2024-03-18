import { expect, test } from "vitest";
import { BOB, anvilEther } from "../_test/constants.js";
import { publicClient } from "../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../amount/utils.js";
import { publicActionReverseMirage } from "./publicActions.js";

test("public actions decorator", async () => {
  const nativeBalanceBob = await publicClient
    .extend(publicActionReverseMirage)
    .getNativeBalance({
      nativeCurrency: anvilEther,
      address: BOB,
    });

  expect(
    amountEqualTo(
      nativeBalanceBob,
      createAmountFromString(anvilEther, "10000"),
    ),
  ).toBe(true);
});
