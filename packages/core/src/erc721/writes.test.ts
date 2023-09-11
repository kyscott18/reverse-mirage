import invariant from "tiny-invariant";
import { type Hex, getAddress } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, describe, expect, test } from "vitest";
import ERC721Bytecode from "../../../../contracts/out/ERC721.sol/ERC721.json";
import { ALICE, BOB } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { erc721ABI } from "../generated.js";
import { readAndParse } from "../readUtils.js";
import {
  erc721GetApproved,
  erc721IsApprovedForAll,
  erc721OwnerOf,
} from "./reads.js";
import type { ERC721 } from "./types.js";
import { createERC721 } from "./utils.js";
import {
  erc721Approve,
  erc721SetApprovalForAll,
  erc721Transfer,
} from "./writes.js";

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
  } else {
    await testClient.revert({ id });
  }

  id = await testClient.snapshot();
});

describe("erc721 writes", async () => {
  test("can transfer", async () => {
    const { hash } = await erc721Transfer(publicClient, walletClient, ALICE, {
      from: ALICE,
      to: BOB,
      erc721,
    });
    await publicClient.waitForTransactionReceipt({ hash });

    expect(await readAndParse(publicClient, erc721OwnerOf({ erc721 }))).toBe(
      BOB,
    );
  });

  test("can transfer safe", async () => {
    const { hash } = await erc721Transfer(publicClient, walletClient, ALICE, {
      from: ALICE,
      to: BOB,
      erc721,
      data: "safe",
    });
    await publicClient.waitForTransactionReceipt({ hash });

    expect(await readAndParse(publicClient, erc721OwnerOf({ erc721 }))).toBe(
      BOB,
    );
  });

  test("can transfer data", async () => {
    const { hash } = await erc721Transfer(publicClient, walletClient, ALICE, {
      from: ALICE,
      to: BOB,
      erc721,
      data: "0x",
    });
    await publicClient.waitForTransactionReceipt({ hash });

    expect(await readAndParse(publicClient, erc721OwnerOf({ erc721 }))).toBe(
      BOB,
    );
  });

  test("can approve", async () => {
    const { hash } = await erc721Approve(publicClient, walletClient, ALICE, {
      erc721,
      spender: BOB,
    });
    await publicClient.waitForTransactionReceipt({ hash });

    expect(
      await readAndParse(publicClient, erc721GetApproved({ erc721 })),
    ).toBe(BOB);
  });

  test("can approve for all", async () => {
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

    expect(
      await readAndParse(
        publicClient,
        erc721IsApprovedForAll({ erc721, owner: ALICE, spender: BOB }),
      ),
    ).toBe(true);
  });
});
