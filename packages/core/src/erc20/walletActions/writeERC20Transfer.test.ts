import invariant from "tiny-invariant";
import { type Hex, parseEther } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, expect, test } from "vitest";
import ERC20PermitBytecode from "../../../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE, BOB } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { createAmountFromString } from "../../amount/utils.js";
import { erc20PermitABI } from "../../generated.js";
import { getERC20BalanceOf } from "../publicActions/getERC20BalanceOf.js";
import type { ERC20 } from "../types.js";
import { createERC20 } from "../utils.js";
import { writeERC20Transfer } from "./writeERC20Transfer.js";

let id: Hex | undefined = undefined;

let erc20: ERC20;

beforeEach(async () => {
  if (id === undefined || erc20 === undefined) {
    const deployHash = await walletClient.deployContract({
      account: ALICE,
      abi: erc20PermitABI,
      bytecode: ERC20PermitBytecode.bytecode.object as Hex,
      args: ["name", "symbol", 18],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);
    erc20 = createERC20(contractAddress, "name", "symbol", 18, foundry.id);

    const mintHash = await walletClient.writeContract({
      abi: erc20PermitABI,
      functionName: "mint",
      address: contractAddress,
      args: [ALICE, parseEther("1")],
    });
    await publicClient.waitForTransactionReceipt({ hash: mintHash });
  } else {
    await testClient.revert({ id });
  }
  id = await testClient.snapshot();
});

test("write transfer", async () => {
  const hash = await writeERC20Transfer(walletClient, {
    args: { amount: createAmountFromString(erc20, "1"), to: BOB },
  });

  await publicClient.waitForTransactionReceipt({ hash });

  const balance = await getERC20BalanceOf(publicClient, {
    erc20,
    address: BOB,
  });

  expect(balance.amount).toBe(10n ** 18n);
  expect(balance.token).toStrictEqual(erc20);
});
