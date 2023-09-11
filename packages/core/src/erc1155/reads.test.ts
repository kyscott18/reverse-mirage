import invariant from "tiny-invariant";
import { type Hex, getAddress } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, describe, expect, test } from "vitest";
import ERC1155Bytecode from "../../../../contracts/out/ERC1155.sol/ERC1155.json";
import { ALICE, BOB } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { erc1155ABI } from "../generated.js";
import { readAndParse } from "../readUtils.js";
import {
  erc1155BalanceOf,
  erc1155IsApprovedForAll,
  erc1155URI,
  getERC1155,
} from "./reads.js";
import type { ERC1155 } from "./types.js";
import { createERC1155 } from "./utils.js";
import { erc1155SetApprovalForAll } from "./writes.js";

let id: Hex | undefined = undefined;

let erc1155: ERC1155;

beforeEach(async () => {
  if (id === undefined) {
    const deployHash = await walletClient.deployContract({
      abi: erc1155ABI,
      bytecode: ERC1155Bytecode.bytecode.object as Hex,
      args: ["https://mitch.com"],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);
    erc1155 = createERC1155(
      contractAddress,
      0n,
      "https://mitch.com",
      foundry.id,
    );

    const mintHash = await walletClient.writeContract({
      abi: erc1155ABI,
      functionName: "mint",
      address: getAddress(contractAddress!),
      args: [ALICE, 0n, 10n, "0x"],
    });
    await publicClient.waitForTransactionReceipt({ hash: mintHash });

    const { hash } = await erc1155SetApprovalForAll(
      publicClient,
      walletClient,
      ALICE,
      {
        erc1155,
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

describe("erc1155 reads", async () => {
  test("isApprovedForAll", async () => {
    const isApprovedForAll = await readAndParse(
      publicClient,
      erc1155IsApprovedForAll({ erc1155, owner: ALICE, spender: BOB }),
    );

    expect(isApprovedForAll).toBe(true);
  });

  test("uri", async () => {
    const uri = await readAndParse(publicClient, erc1155URI({ erc1155 }));

    expect(uri).toBe("https://mitch.com");
  });

  test("balanceOf", async () => {
    const balance = await readAndParse(
      publicClient,
      erc1155BalanceOf({ erc1155, owner: ALICE }),
    );

    expect(balance.amount).toBe(10n);
    expect(balance.token).toBe(erc1155);
  });

  test("getERC1155", async () => {
    expect(
      await readAndParse(publicClient, getERC1155({ erc1155 })),
    ).toStrictEqual(erc1155);
  });
});
