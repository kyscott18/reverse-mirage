import invariant from "tiny-invariant";
import { type Hex, getAddress, parseEther } from "viem";
import { beforeEach, describe, expect, test } from "vitest";
import ERC20Permit from "../../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE, BOB, mockERC20 } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../amountUtils.js";
import { erc20PermitABI } from "../generated.js";
import { readAndParse } from "../readUtils.js";
import { erc20Allowance, erc20BalanceOf } from "./reads.js";
import { createERC20PermitDataFromString } from "./utils.js";
import {
  erc20Approve,
  erc20Permit,
  erc20SignPermit,
  erc20Transfer,
  erc20TransferFrom,
} from "./writes.js";

let id: Hex | undefined = undefined;

beforeEach(async () => {
  if (id === undefined) {
    const deployHash = await walletClient.deployContract({
      abi: erc20PermitABI,
      bytecode: ERC20Permit.bytecode.object as Hex,
      args: [mockERC20.name, mockERC20.symbol, mockERC20.decimals],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(getAddress(contractAddress!) === mockERC20.address);

    const mintHash = await walletClient.writeContract({
      abi: erc20PermitABI,
      functionName: "mint",
      address: getAddress(contractAddress!),
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
      publicClient,
      erc20BalanceOf({ erc20: mockERC20, address: ALICE }),
    );
    expect(
      amountEqualTo(balanceOfAlice, createAmountFromString(mockERC20, ".5")),
    ).toBe(true);

    const balanceOfBob = await readAndParse(
      publicClient,
      erc20BalanceOf({ erc20: mockERC20, address: BOB }),
    );
    expect(
      amountEqualTo(balanceOfBob, createAmountFromString(mockERC20, ".5")),
    ).toBe(true);
  });

  test("can approve", async () => {
    const { hash } = await erc20Approve(publicClient, walletClient, ALICE, {
      spender: ALICE,
      amount: createAmountFromString(mockERC20, ".5"),
    });

    await publicClient.waitForTransactionReceipt({ hash });

    const allowance = await readAndParse(
      publicClient,
      erc20Allowance({
        erc20: mockERC20,
        address: ALICE,
        spender: ALICE,
      }),
    );
    expect(
      amountEqualTo(allowance, createAmountFromString(mockERC20, ".5")),
    ).toBe(true);
  });

  test("can transfer from", async () => {
    const { hash: approveHash } = await erc20Approve(
      publicClient,
      walletClient,
      ALICE,
      {
        spender: ALICE,
        amount: createAmountFromString(mockERC20, ".5"),
      },
    );

    await publicClient.waitForTransactionReceipt({ hash: approveHash });

    const { hash } = await erc20TransferFrom(
      publicClient,
      walletClient,
      ALICE,
      {
        from: ALICE,
        to: BOB,
        amount: createAmountFromString(mockERC20, ".5"),
      },
    );
    await publicClient.waitForTransactionReceipt({ hash });

    const balanceOfAlice = await readAndParse(
      publicClient,
      erc20BalanceOf({ erc20: mockERC20, address: ALICE }),
    );
    expect(
      amountEqualTo(balanceOfAlice, createAmountFromString(mockERC20, ".5")),
    ).toBe(true);

    const balanceOfBob = await readAndParse(
      publicClient,
      erc20BalanceOf({ erc20: mockERC20, address: BOB }),
    );
    expect(
      amountEqualTo(balanceOfBob, createAmountFromString(mockERC20, ".5")),
    ).toBe(true);

    const allowance = await readAndParse(
      publicClient,
      erc20Allowance({
        erc20: mockERC20,
        address: ALICE,
        spender: ALICE,
      }),
    );
    expect(
      amountEqualTo(allowance, createAmountFromString(mockERC20, "0")),
    ).toBe(true);
  });

  test("can permit", async () => {
    const signature = await erc20SignPermit(walletClient, ALICE, {
      permitData: createERC20PermitDataFromString(mockERC20, ".5", 0n),
      owner: ALICE,
      spender: BOB,
      deadline: 2n ** 256n - 1n,
    });

    const { hash } = await erc20Permit(publicClient, walletClient, ALICE, {
      owner: ALICE,
      spender: BOB,
      permitData: createERC20PermitDataFromString(mockERC20, ".5", 0n),
      deadline: 2n ** 256n - 1n,
      signature,
    });
    await publicClient.waitForTransactionReceipt({ hash });

    const allowance = await readAndParse(
      publicClient,
      erc20Allowance({
        erc20: mockERC20,
        address: ALICE,
        spender: BOB,
      }),
    );
    expect(
      amountEqualTo(allowance, createAmountFromString(mockERC20, ".5")),
    ).toBe(true);
  });
});
