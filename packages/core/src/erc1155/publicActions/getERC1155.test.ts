import invariant from "tiny-invariant";
import { type Hex } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, expect, test } from "vitest";
import ERC1155Bytecode from "../../../../../contracts/out/ERC1155.sol/ERC1155.json";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { erc1155ABI } from "../../generated.js";
import type { ERC1155 } from "../types.js";
import { createERC1155 } from "../utils.js";
import { getERC1155 } from "./getERC1155.js";

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
  } else {
    await testClient.revert({ id });
  }

  id = await testClient.snapshot();
});

test("getERC1155", async () => {
  expect(await getERC1155(publicClient, { erc1155 })).toStrictEqual(erc1155);
});
