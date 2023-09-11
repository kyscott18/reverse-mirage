import { zeroAddress } from "viem";
import { foundry } from "viem/chains";
import { describe, expect, test } from "vitest";
import { createERC721, createERC721Data, createERC721IDData } from "./utils.js";

const erc721 = {
  type: "erc721",
  address: zeroAddress,
  name: "name",
  symbol: "symbol",
  id: 0n,
  tokenURI: "https://mitch.com",
  chainID: foundry.id,
} as const;

describe("utils", () => {
  test("can create erc721", () => {
    expect(
      createERC721(
        zeroAddress,
        "name",
        "symbol",
        0n,
        "https://mitch.com",
        foundry.id,
      ),
    ).toStrictEqual(erc721);
  });

  test("can create erc721 id data", () => {
    expect(createERC721IDData(erc721, true)).toStrictEqual({
      type: "erc721IDData",
      token: erc721,
      owned: true,
    });
  });

  test("can create erc721 data", () => {
    expect(createERC721Data(erc721, 6, [0n, 1n, 2n, 3n, 4n, 5n])).toStrictEqual(
      {
        type: "erc721Data",
        balance: 6,
        ids: [0n, 1n, 2n, 3n, 4n, 5n],
        token: erc721,
      },
    );
  });
});
