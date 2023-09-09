import invariant from "tiny-invariant";
import { type Hex, parseEther } from "viem";
import { beforeEach, describe, expect, test } from "vitest";
import MockERC20 from "../../../../contracts/out/MockERC20.sol/MockERC20.json";
import { ALICE, BOB, mockERC20 } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../amountUtils.js";
import { mockErc20ABI } from "../generated.js";
import { readAndParse } from "../readUtils.js";
import { erc20BalanceOf } from "./reads.js";
import { erc20Transfer } from "./writes.js";

let id: Hex | undefined = undefined;

beforeEach(async () => {
  if (id === undefined) {
    const deployHash = await walletClient.deployContract({
      account: ALICE,
      abi: mockErc20ABI,
      bytecode: MockERC20.bytecode.object as Hex,
      args: ["Mock ERC20", "MOCK", 18],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);

    const mintHash = await walletClient.writeContract({
      abi: mockErc20ABI,
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

describe("erc20 writes", () => {
  test("can transfer", async () => {
    const { hash } = await erc20Transfer(publicClient, walletClient, ALICE, {
      to: BOB,
      amount: createAmountFromString(mockERC20, ".5"),
    });

    await publicClient.waitForTransactionReceipt({ hash });

    const balanceOfAlice = await readAndParse(
      erc20BalanceOf(publicClient, { erc20: mockERC20, address: ALICE }),
    );
    expect(
      amountEqualTo(balanceOfAlice, createAmountFromString(mockERC20, ".5")),
    ).toBe(true);

    const balanceOfBob = await readAndParse(
      erc20BalanceOf(publicClient, { erc20: mockERC20, address: BOB }),
    );
    expect(
      amountEqualTo(balanceOfBob, createAmountFromString(mockERC20, ".5")),
    ).toBe(true);
  });

  test.todo("can approve", async () => {});

  test.todo("can transfer from", async () => {});

  test.todo("can permit");
});
