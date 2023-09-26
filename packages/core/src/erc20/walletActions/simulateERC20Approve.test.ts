import invariant from "tiny-invariant";
import { type Hex } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, expect, test } from "vitest";
import ERC20PermitBytecode from "../../../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE, BOB } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { createAmountFromString } from "../../amount/utils.js";
import { erc20PermitABI } from "../../generated.js";
import { getERC20Allowance } from "../publicActions/getERC20Allowance.js";
import type { ERC20 } from "../types.js";
import { createERC20 } from "../utils.js";
import { simulateERC20Approve } from "./simulateERC20Approve.js";

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
  } else {
    await testClient.revert({ id });
  }
  id = await testClient.snapshot();
});

test("simulate approve", async () => {
  const { request } = await simulateERC20Approve(publicClient, {
    args: { amount: createAmountFromString(erc20, "1"), spender: BOB },
    account: ALICE,
  });

  const hash = await walletClient.writeContract(request);

  await publicClient.waitForTransactionReceipt({ hash });

  const allowance = await getERC20Allowance(publicClient, {
    erc20,
    owner: ALICE,
    spender: BOB,
  });

  expect(allowance.amount).toBe(10n ** 18n);
  expect(allowance.token).toStrictEqual(erc20);
});
