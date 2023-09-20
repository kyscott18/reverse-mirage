import invariant from "tiny-invariant";
import { type Hex, getAddress } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, expect, test } from "vitest";
import ERC1155Bytecode from "../../../../../contracts/out/ERC1155.sol/ERC1155.json";
import { ALICE, BOB } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { erc1155ABI } from "../../generated.js";
import { getERC1155BalanceOf } from "../publicActions/getERC1155BalanceOf.js";
import type { ERC1155 } from "../types.js";
import { createERC1155, createERC1155Data } from "../utils.js";
import { simulateERC1155Transfer } from "./simulateERC1155Transfer.js";

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
  } else {
    await testClient.revert({ id });
  }

  id = await testClient.snapshot();
});

test("can transfer", async () => {
  const { request } = await simulateERC1155Transfer(publicClient, {
    args: { to: BOB, erc1155Data: createERC1155Data(erc1155, 5n) },
    account: ALICE,
  });
  const hash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash });

  const balanceALICE = await getERC1155BalanceOf(publicClient, {
    erc1155,
    address: ALICE,
  });
  expect(balanceALICE.amount).toBe(5n);

  const balanceBOB = await getERC1155BalanceOf(publicClient, {
    erc1155,
    address: BOB,
  });
  expect(balanceBOB.amount).toBe(5n);
});
