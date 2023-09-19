import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { foundry } from "viem/chains";
import { getAddress, isAddress, parseEther } from "viem/utils";
import { beforeAll, describe, expect, test } from "vitest";
import ERC20PermitBytecode from "../../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE, BOB } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../amount/utils.js";
import { erc20PermitABI } from "../generated.js";
import {
  erc20Allowance,
  erc20BalanceOf,
  erc20Decimals,
  erc20Name,
  erc20PermitData,
  erc20PermitDomainSeparator,
  erc20PermitNonce,
  erc20Symbol,
  erc20TotalSupply,
  getERC20,
  getERC20Permit,
} from "./reads.js";
import type { ERC20Permit } from "./types.js";
import { createERC20, createERC20Permit } from "./utils.js";

let id: Hex | undefined = undefined;

let mockERC20: ERC20Permit;

beforeAll(async () => {
  if (id === undefined || mockERC20 === undefined) {
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
    mockERC20 = createERC20Permit(
      contractAddress,
      "Mock ERC20",
      "MOCK",
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

    const transferHash = await walletClient.writeContract({
      abi: erc20PermitABI,
      functionName: "transfer",
      address: contractAddress,
      args: [BOB, parseEther("0.25")],
    });
    await publicClient.waitForTransactionReceipt({ hash: transferHash });

    const approveHash = await walletClient.writeContract({
      abi: erc20PermitABI,
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
    const name = await erc20Name({ args: { erc20: mockERC20 }, publicClient });

    expect(name).toBe("Mock ERC20");
  });

  test("can read symbol", async () => {
    const symbol = await erc20Symbol({
      args: { erc20: mockERC20 },
      publicClient,
    });

    expect(symbol).toBe("MOCK");
  });

  test("can read decimals", async () => {
    const decimals = await erc20Decimals({
      args: { erc20: mockERC20 },
      publicClient,
    });

    expect(decimals).toBe(18);
  });

  test("can read balance", async () => {
    const balanceOfAlice = await erc20BalanceOf({
      args: { erc20: mockERC20, address: ALICE },
      publicClient,
    });
    expect(
      amountEqualTo(balanceOfAlice, createAmountFromString(mockERC20, ".75")),
    ).toBe(true);

    const balanceOfBob = await erc20BalanceOf({
      args: { erc20: mockERC20, address: BOB },
      publicClient,
    });
    expect(
      amountEqualTo(balanceOfBob, createAmountFromString(mockERC20, ".25")),
    ).toBe(true);
  });

  test("can read allowance", async () => {
    const allowance = await erc20Allowance({
      args: {
        erc20: mockERC20,
        address: ALICE,
        spender: BOB,
      },
      publicClient,
    });
    expect(
      amountEqualTo(allowance, createAmountFromString(mockERC20, "2")),
    ).toBe(true);
  });

  test("can read totalSupply", async () => {
    const totalSupply = await erc20TotalSupply({
      args: { erc20: mockERC20 },
      publicClient,
    });
    expect(
      amountEqualTo(totalSupply, createAmountFromString(mockERC20, "1")),
    ).toBe(true);
  });

  test("can read nonce", async () => {
    expect(
      await erc20PermitNonce({
        args: { erc20: mockERC20, address: ALICE },
        publicClient,
      }),
    ).toBe(0n);
  });

  test("can read permit data", async () => {
    const permitData = await erc20PermitData({
      args: { erc20: mockERC20, address: ALICE },
      publicClient,
    });

    expect(permitData.amount).toBe(75n * 10n ** 16n);
    expect(permitData.nonce).toBe(0n);
  });

  test("can read domain seperator", async () => {
    expect(
      await erc20PermitDomainSeparator({
        args: { erc20: mockERC20 },
        publicClient,
      }),
    ).toBeTruthy();
  });

  test("can get token", async () => {
    const token = await getERC20({
      args: {
        erc20: mockERC20,
      },
      publicClient,
    });

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainID).toBe(31337);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.decimals).toBe(18);
  });

  test("can get permit token", async () => {
    const token = await getERC20Permit({
      args: {
        erc20: mockERC20,
      },
      publicClient,
    });

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainID).toBe(31337);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.version).toBe("1");
    expect(token.decimals).toBe(18);
  });

  test("can get permit token no version", async () => {
    const token = await getERC20Permit({
      args: {
        erc20: createERC20(
          mockERC20.address,
          mockERC20.name,
          mockERC20.symbol,
          mockERC20.decimals,
          mockERC20.chainID,
        ),
      },
      publicClient,
    });

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainID).toBe(31337);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.version).toBe("1");
    expect(token.decimals).toBe(18);
  });
});
