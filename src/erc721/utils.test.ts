import { zeroAddress } from "viem";
import { foundry } from "viem/chains";
import { expect, test } from "vitest";
import { createERC721, createERC721Data } from "./utils.js";

const erc721 = {
  type: "erc721",
  address: zeroAddress,
  name: "name",
  symbol: "symbol",
  chainID: foundry.id,
  blockCreated: 0n,
} as const;

test("can create erc721", () => {
  expect(createERC721(zeroAddress, "name", "symbol", foundry.id)).toStrictEqual(
    erc721,
  );
});

test("can create erc721 data", () => {
  expect(createERC721Data(erc721, 6, [0n, 1n, 2n, 3n, 4n, 5n])).toStrictEqual({
    type: "erc721Data",
    balance: 6,
    ids: [0n, 1n, 2n, 3n, 4n, 5n],
    token: erc721,
  });
});
