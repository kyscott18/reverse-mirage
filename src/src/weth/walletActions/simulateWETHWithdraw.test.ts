import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, expect, test } from "vitest";
import WETH9Bytecode from "../../../../contracts/out/WETH9.sol/WETH9.json";
import { ALICE } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { createAmountFromString } from "../../amount/utils.js";
import { getERC20BalanceOf } from "../../erc20/publicActions/getERC20BalanceOf.js";
import { weth9Abi } from "../../generated.js";
import type { WETH } from "../types.js";
import { createWETH } from "../utils.js";
import { simulateWETHDeposit } from "./simulateWETHDeposit.js";
import { simulateWETHWithdraw } from "./simulateWETHWithdraw.js";

let id: Hex | undefined = undefined;

let weth: WETH;

beforeEach(async () => {
  if (id === undefined) {
    const deployHash = await walletClient.deployContract({
      abi: weth9Abi,
      bytecode: WETH9Bytecode.bytecode.object as Hex,
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);
    weth = createWETH(contractAddress, "name", "symbol", 18, foundry.id);
  } else {
    await testClient.revert({ id });
  }

  id = await testClient.snapshot();
});

test("simulate withdraw", async () => {
  const { request } = await simulateWETHDeposit(publicClient, {
    args: { amount: createAmountFromString(weth, "1") },
    account: ALICE,
  });

  const hash = await walletClient.writeContract(request);

  await publicClient.waitForTransactionReceipt({ hash });

  const { request: withdrawRequest } = await simulateWETHWithdraw(
    publicClient,
    {
      args: { amount: createAmountFromString(weth, "1") },
      account: ALICE,
    },
  );

  const requestHash = await walletClient.writeContract(withdrawRequest);

  await publicClient.waitForTransactionReceipt({ hash: requestHash });

  const balance = await getERC20BalanceOf(publicClient, {
    erc20: weth,
    address: ALICE,
  });

  expect(balance.amount).toBe(0n);
  expect(balance.token).toStrictEqual(weth);
});
