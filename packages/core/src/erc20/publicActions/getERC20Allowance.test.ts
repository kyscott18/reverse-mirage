import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { foundry } from "viem/chains";
import { parseEther } from "viem/utils";
import { beforeAll, expect, test } from "vitest";
import ERC20PermitBytecode from "../../../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE, BOB } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../../amount/utils.js";
import { erc20PermitABI } from "../../generated.js";
import type { ERC20Permit } from "../types.js";
import { createERC20Permit } from "../utils.js";
import { getERC20Allowance } from "./getERC20Allowance.js";

let id: Hex | undefined = undefined;

let erc20: ERC20Permit;

beforeAll(async () => {
  if (id === undefined || erc20 === undefined) {
    const deployHash = await walletClient.deployContract({
      account: ALICE,
      abi: erc20PermitABI,
      bytecode: ERC20PermitBytecode.bytecode.object as Hex,
      args: ["Mock ERC20", "MOCK", 18],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);
    erc20 = createERC20Permit(
      contractAddress,
      "name",
      "symbol",
      18,
      "1",
      foundry.id,
    );

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

test("can read allowance", async () => {
  const allowance = await getERC20Allowance({
    args: {
      erc20,
      owner: ALICE,
      spender: BOB,
    },
    client: publicClient,
  });
  expect(amountEqualTo(allowance, createAmountFromString(erc20, "2"))).toBe(
    true,
  );
});
