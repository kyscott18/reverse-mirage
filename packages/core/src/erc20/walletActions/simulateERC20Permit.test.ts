import invariant from "tiny-invariant";
import { type Hex, parseEther } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, expect, test } from "vitest";
import ERC20PermitBytecode from "../../../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE, BOB } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { erc20PermitABI } from "../../generated.js";
import { getERC20Allowance } from "../publicActions/getERC20Allowance.js";
import type { ERC20Permit } from "../types.js";
import {
  createERC20Permit,
  createERC20PermitDataFromString,
} from "../utils.js";
import { signERC20Permit } from "./signERC20Permit.js";
import { simulateERC20Permit } from "./simulateERC20Permit.js";

let id: Hex | undefined = undefined;

let erc20: ERC20Permit;

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

test("simulate permit", async () => {
  const signature = await signERC20Permit(walletClient, {
    permitData: createERC20PermitDataFromString(erc20, "1", 0n),
    spender: BOB,
    deadline: 2n ** 256n - 1n,
  });

  const { request } = await simulateERC20Permit(publicClient, {
    args: {
      permitData: createERC20PermitDataFromString(erc20, "1", 0n),
      owner: ALICE,
      spender: BOB,
      signature,
      deadline: 2n ** 256n - 1n,
    },
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
