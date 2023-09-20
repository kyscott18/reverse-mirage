import invariant from "tiny-invariant";
import { type Hex, getAddress, parseEther } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, expect, test } from "vitest";
import ERC1155Bytecode from "../../../../../contracts/out/ERC1155.sol/ERC1155.json";
import { ALICE, BOB } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { erc1155ABI } from "../../generated.js";
import { getERC1155IsApprovedForAll } from "../publicActions/getERC1155IsApprovedForAll.js";
import type { ERC1155 } from "../types.js";
import { createERC1155 } from "../utils.js";
import { simulateERC1155SetApprovalForAll } from "./simulateERC1155SetApprovalForAll.js";

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
      args: [ALICE, 0n, parseEther("1"), "0x"],
    });
    await publicClient.waitForTransactionReceipt({ hash: mintHash });
  } else {
    await testClient.revert({ id });
  }

  id = await testClient.snapshot();
});

test("set approval for all", async () => {
  const { request } = await simulateERC1155SetApprovalForAll(publicClient, {
    args: {
      erc1155,
      spender: BOB,
      approved: true,
    },
    account: ALICE,
  });
  const hash = await walletClient.writeContract(request);

  await publicClient.waitForTransactionReceipt({ hash });

  expect(
    await getERC1155IsApprovedForAll(publicClient, {
      erc1155,
      spender: BOB,
      owner: ALICE,
    }),
  ).toBe(true);
});
