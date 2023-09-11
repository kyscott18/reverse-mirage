import { zeroAddress } from "viem";
import { foundry } from "viem/chains";
import { describe, expect, test } from "vitest";
import { createERC1155, createERC1155Data } from "./utils.js";

const erc1155 = {
  type: "erc1155",
  address: zeroAddress,
  id: 0n,
  uri: "https://mitch.com",
  chainID: foundry.id,
  blockCreated: 0n,
} as const;

describe("utils", () => {
  test("can create erc1155", () => {
    expect(
      createERC1155(zeroAddress, 0n, "https://mitch.com", foundry.id),
    ).toStrictEqual(erc1155);
  });

  test("can create erc1155 data", () => {
    const data = createERC1155Data(erc1155, 10n);

    expect(data.token).toBe(erc1155);
    expect(data.amount).toBe(10n);
    expect(data.type).toBe("erc1155Data");
  });
});
