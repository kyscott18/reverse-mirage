import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { getAddress, isAddress, parseEther } from "viem/utils";
import { beforeAll, describe, expect, test } from "vitest";
import MockERC20 from "../../../../contracts/out/MockERC20.sol/MockERC20.json";
import { ALICE, BOB, mockERC20 } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../amountUtils.js";
import { mockErc20ABI } from "../generated.js";
import { readAndParse } from "../readUtils.js";
import {
  erc20Allowance,
  erc20BalanceOf,
  erc20Decimals,
  erc20Name,
  erc20Symbol,
  erc20TotalSupply,
  getErc20,
} from "./reads.js";

let id: Hex | undefined = undefined;

beforeAll(async () => {
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

    const transferHash = await walletClient.writeContract({
      abi: mockErc20ABI,
      functionName: "transfer",
      address: contractAddress,
      args: [BOB, parseEther("0.25")],
    });
    await publicClient.waitForTransactionReceipt({ hash: transferHash });

    const approveHash = await walletClient.writeContract({
      abi: mockErc20ABI,
      functionName: "approve",
      address: contractAddress,
      args: [BOB, parseEther("2")],
    });
    await publicClient.waitForTransactionReceipt({ hash: approveHash });
  } else {
    await testClient.revert({ id });
  }
  id = await testClient.snapshot();
});

describe("erc20 reads", () => {
  test("can deploy the token contract", async () => {
    expect(mockERC20.address).toBeDefined();
    expect(isAddress(mockERC20.address)).toBe(true);
  });

  test("can read name", async () => {
    const name = await readAndParse(
      erc20Name(publicClient, { erc20: mockERC20 }),
    );

    expect(name).toBe("Mock ERC20");
  });

  test("can read symbol", async () => {
    const symbol = await readAndParse(
      erc20Symbol(publicClient, { erc20: mockERC20 }),
    );

    expect(symbol).toBe("MOCK");
  });

  test("can read decimals", async () => {
    const decimals = await readAndParse(
      erc20Decimals(publicClient, { erc20: mockERC20 }),
    );

    expect(decimals).toBe(18);
  });

  test("can read balance", async () => {
    const balanceOfAlice = await readAndParse(
      erc20BalanceOf(publicClient, { erc20: mockERC20, address: ALICE }),
    );
    expect(
      amountEqualTo(balanceOfAlice, createAmountFromString(mockERC20, ".75")),
    ).toBe(true);

    const balanceOfBob = await readAndParse(
      erc20BalanceOf(publicClient, { erc20: mockERC20, address: BOB }),
    );
    expect(
      amountEqualTo(balanceOfBob, createAmountFromString(mockERC20, ".25")),
    ).toBe(true);
  });

  test("can read allowance", async () => {
    const allowance = await readAndParse(
      erc20Allowance(publicClient, {
        erc20: mockERC20,
        address: ALICE,
        spender: BOB,
      }),
    );
    expect(
      amountEqualTo(allowance, createAmountFromString(mockERC20, "2")),
    ).toBe(true);
  });

  test("can read totalSupply", async () => {
    const totalSupply = await readAndParse(
      erc20TotalSupply(publicClient, { erc20: mockERC20 }),
    );
    expect(
      amountEqualTo(totalSupply, createAmountFromString(mockERC20, "1")),
    ).toBe(true);
  });

  test.todo("can read nonce");

  test("can get token", async () => {
    const token = await readAndParse(
      getErc20(publicClient, {
        erc20: mockERC20,
      }),
    );

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainID).toBe(31337);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.decimals).toBe(18);
  });

  test.todo("can get permit token");

  test.todo("can check if permit");
});
