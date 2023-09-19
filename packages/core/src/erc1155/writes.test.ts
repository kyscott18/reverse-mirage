import invariant from "tiny-invariant";
import { type Hex, getAddress, zeroAddress } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, describe, expect, test } from "vitest";
import ERC1155Bytecode from "../../../../contracts/out/ERC1155.sol/ERC1155.json";
import { ALICE, BOB } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { erc1155ABI } from "../generated.js";
import { erc1155BalanceOf, erc1155IsApprovedForAll } from "./reads.js";
import type { ERC1155 } from "./types.js";
import { createERC1155, createERC1155Data } from "./utils.js";
import {
  erc1155SetApprovalForAll,
  erc1155Transfer,
  erc1155TransferBatch,
} from "./writes.js";

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

describe("erc1155 writes", async () => {
  test("can transfer", async () => {
    const { request } = await erc1155Transfer(publicClient, {
      to: BOB,
      erc1155: createERC1155Data(erc1155, 5n),
      account: ALICE,
    });
    const hash = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({ hash });

    const balanceALICE = await erc1155BalanceOf({
      publicClient,
      args: { erc1155, address: ALICE },
    });
    expect(balanceALICE.amount).toBe(5n);

    const balanceBOB = await erc1155BalanceOf({
      publicClient,
      args: { erc1155, address: BOB },
    });
    expect(balanceBOB.amount).toBe(5n);
  });

  test("can transfer batch", async () => {
    await expect(
      async () =>
        await erc1155TransferBatch(publicClient, {
          to: BOB,
          erc1155: [],
          account: ALICE,
        }),
    ).rejects.toThrowError();

    await expect(
      async () =>
        await erc1155TransferBatch(publicClient, {
          account: ALICE,
          to: BOB,
          erc1155: [
            createERC1155Data(erc1155, 5n),
            createERC1155Data({ ...erc1155, address: zeroAddress }, 5n),
          ],
        }),
    ).rejects.toThrowError();

    const { request } = await erc1155TransferBatch(publicClient, {
      account: ALICE,
      to: BOB,
      erc1155: [createERC1155Data(erc1155, 5n), createERC1155Data(erc1155, 5n)],
    });
    const hash = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({ hash });

    const balanceBOB = await erc1155BalanceOf({
      publicClient,
      args: { erc1155, address: BOB },
    });
    expect(balanceBOB.amount).toBe(10n);
  });

  test("can approve for all", async () => {
    const { request } = await erc1155SetApprovalForAll(
      publicClient,

      {
        account: ALICE,
        erc1155,
        spender: BOB,
        approved: true,
      },
    );
    const hash = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({ hash });

    expect(
      await erc1155IsApprovedForAll({
        publicClient,
        args: { erc1155, owner: ALICE, spender: BOB },
      }),
    ).toBe(true);
  });
});
