import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { foundry } from "viem/chains";
import { parseEther } from "viem/utils";
import { beforeAll, expect, test } from "vitest";
import ERC20PermitBytecode from "../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { amountEqualTo } from "../../amount/utils.js";
import { erc20PermitAbi } from "../../generated.js";
import type { ERC20Permit } from "../types.js";
import {
  createERC20Permit,
  createERC20PermitDataFromString,
} from "../utils.js";
import { getERC20PermitData } from "./getERC20PermitData.js";

let id: Hex | undefined = undefined;

let erc20: ERC20Permit;

beforeAll(async () => {
  if (id === undefined || erc20 === undefined) {
    const deployHash = await walletClient.deployContract({
      account: ALICE,
      abi: erc20PermitAbi,
      bytecode: ERC20PermitBytecode.bytecode.object as Hex,
      args: ["name", "symbol", 18],
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
      abi: erc20PermitAbi,
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

test("read permit data", async () => {
  const data = await getERC20PermitData(publicClient, {
    erc20,
    address: ALICE,
  });
  expect(
    amountEqualTo(data, createERC20PermitDataFromString(erc20, "1", 0n)),
  ).toBe(true);
});
