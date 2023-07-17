import MockERC20 from "../../contracts/out/MockERC20.sol/MockERC20.json";
import {
  currencyAmountEqualTo,
  makeCurrencyAmountFromString,
} from "../currencyAmountUtils.js";
import { readAndParse } from "../readUtils.js";
import { ALICE, BOB, mockERC20 } from "../test/constants.js";
import { mockErc20ABI } from "../test/generated.js";
import { publicClient, testClient, walletClient } from "../test/utils.js";
import { erc20BalanceOf } from "./reads.js";
import { erc20Transfer } from "./writes.js";
import invariant from "tiny-invariant";
import { type Hex, parseEther } from "viem";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

beforeAll(async () => {
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
});

afterAll(async () => {
  await testClient.reset();
});

describe("erc20 writes", () => {
  test("can transfer", async () => {
    const { hash } = await erc20Transfer(publicClient, walletClient, ALICE, {
      to: BOB,
      amount: makeCurrencyAmountFromString(mockERC20, ".5"),
    });

    await publicClient.waitForTransactionReceipt({ hash });

    const balanceOfAlice = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: ALICE }),
    );
    expect(
      currencyAmountEqualTo(
        balanceOfAlice,
        makeCurrencyAmountFromString(mockERC20, ".5"),
      ),
    ).toBe(true);

    const balanceOfBob = await readAndParse(
      erc20BalanceOf(publicClient, { token: mockERC20, address: BOB }),
    );
    expect(
      currencyAmountEqualTo(
        balanceOfBob,
        makeCurrencyAmountFromString(mockERC20, ".5"),
      ),
    ).toBe(true);
  });

  test.todo("can approve", async () => {});

  test.todo("can transfer from", async () => {});
});
