import { foundry } from "viem/chains";
import { describe, expect, test } from "vitest";
import { anvilEther } from "../_test/constants.js";
import { createNativeCurrency } from "./utils.js";

describe("utils", () => {
  test("can create nativeCurrency", () => {
    expect(
      createNativeCurrency("Anvil Ether", "ETH", 18, foundry.id),
    ).toStrictEqual(anvilEther);
  });
});
