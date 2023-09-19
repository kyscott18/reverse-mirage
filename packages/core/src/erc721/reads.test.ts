import invariant from "tiny-invariant";
import { type Hex, getAddress } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, describe, expect, test } from "vitest";
import ERC721Bytecode from "../../../../contracts/out/ERC721.sol/ERC721.json";
import { ALICE, BOB } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { erc721ABI } from "../generated.js";
import {
  erc721BalanceOf,
  erc721Data,
  erc721GetApproved,
  erc721IDData,
  erc721IsApprovedForAll,
  erc721Name,
  erc721OwnerOf,
  erc721SupportsInterface,
  erc721Symbol,
  erc721TokenURI,
  getERC721,
} from "./reads.js";
import type { ERC721 } from "./types.js";
import { createERC721 } from "./utils.js";
import { erc721Approve, erc721SetApprovalForAll } from "./writes.js";

let id: Hex | undefined = undefined;

let erc721: ERC721;

beforeEach(async () => {
  if (id === undefined) {
    const deployHash = await walletClient.deployContract({
      abi: erc721ABI,
      bytecode: ERC721Bytecode.bytecode.object as Hex,
      args: ["name", "symbol", "https://mitch.com"],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);
    erc721 = createERC721(
      contractAddress,
      "name",
      "symbol",
      0n,
      "https://mitch.com",
      foundry.id,
    );

    const mintHash = await walletClient.writeContract({
      abi: erc721ABI,
      functionName: "mint",
      address: getAddress(contractAddress!),
      args: [ALICE, 0n],
    });
    await publicClient.waitForTransactionReceipt({ hash: mintHash });

    const { hash: approveHash } = await erc721Approve(
      publicClient,
      walletClient,
      ALICE,
      {
        erc721,
        spender: BOB,
      },
    );
    await publicClient.waitForTransactionReceipt({ hash: approveHash });

    const { hash } = await erc721SetApprovalForAll(
      publicClient,
      walletClient,
      ALICE,
      {
        erc721,
        spender: BOB,
        approved: true,
      },
    );
    await publicClient.waitForTransactionReceipt({ hash });
  } else {
    await testClient.revert({ id });
  }

  id = await testClient.snapshot();
});

describe("erc721 reads", async () => {
  test("name", async () => {
    const name = await erc721Name({ args: { erc721 }, publicClient });

    expect(name).toBe("name");
  });

  test("symbol", async () => {
    const symbol = await erc721Symbol({ args: { erc721 }, publicClient });

    expect(symbol).toBe("symbol");
  });

  test("tokenURI", async () => {
    const tokenURI = await erc721TokenURI({ publicClient, args: { erc721 } });

    expect(tokenURI).toBe("https://mitch.com");
  });

  test("ownerOf", async () => {
    const owner = await erc721OwnerOf({ publicClient, args: { erc721 } });

    expect(owner).toBe(ALICE);
  });

  test("balanceOf", async () => {
    const balance = await erc721BalanceOf({
      publicClient,
      args: { erc721, owner: ALICE },
    });

    expect(balance).toBe(1n);
  });

  test("getApproved", async () => {
    const approved = await erc721GetApproved({
      publicClient,
      args: { erc721 },
    });

    expect(approved).toBe(BOB);
  });

  test("isApprovedForAll", async () => {
    const approved = await erc721IsApprovedForAll({
      publicClient,
      args: { erc721, owner: ALICE, spender: BOB },
    });

    expect(approved).toBe(true);
  });

  test("supportsInterface", async () => {
    const supportsInterface = await erc721SupportsInterface({
      publicClient,
      args: { erc721, interfaceID: "0x01ffc9a7" },
    });

    expect(supportsInterface).toBe(true);
  });

  test("getERC721", async () => {
    expect(await getERC721({ publicClient, args: { erc721 } })).toStrictEqual(
      erc721,
    );
  });

  test("erc721IDData", async () => {
    const idData = await erc721IDData({
      publicClient,
      args: { erc721, owner: ALICE },
    });

    expect(idData.owned).toBe(true);
    expect(idData.token).toStrictEqual(erc721);
    expect(idData.type).toBe("erc721IDData");
  });

  test("erc721Data", async () => {
    const data = await erc721Data({
      publicClient,
      args: { erc721, owner: ALICE },
    });

    expect(data.balance).toBe(1);
    expect(data.token).toStrictEqual(erc721);
    expect(data.type).toBe("erc721Data");
    expect(data.ids).toBe(undefined);
  });
});
