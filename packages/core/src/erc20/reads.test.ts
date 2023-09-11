import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { getAddress, isAddress, parseEther } from "viem/utils";
import { beforeAll, describe, expect, test } from "vitest";
import ERC20Permit from "../../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE, BOB, mockERC20 } from "../_test/constants.js";
import { publicClient, testClient, walletClient } from "../_test/utils.js";
import { amountEqualTo, createAmountFromString } from "../amountUtils.js";
import { erc20PermitABI } from "../generated.js";
import { readAndParse } from "../readUtils.js";
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
  getErc20,
  getErc20Permit,
} from "./reads.js";
import { createErc20 } from "./utils.js";

let id: Hex | undefined = undefined;

beforeAll(async () => {
  if (id === undefined) {
    const deployHash = await walletClient.deployContract({
      account: ALICE,
      abi: erc20PermitABI,
      bytecode: ERC20Permit.bytecode.object as Hex,
      args: ["Mock ERC20", "MOCK", 18],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);

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
    const name = await readAndParse(
      publicClient,
      erc20Name({ erc20: mockERC20 }),
    );

    expect(name).toBe("Mock ERC20");
  });

  test("can read symbol", async () => {
    const symbol = await readAndParse(
      publicClient,
      erc20Symbol({ erc20: mockERC20 }),
    );

    expect(symbol).toBe("MOCK");
  });

  test("can read decimals", async () => {
    const decimals = await readAndParse(
      publicClient,
      erc20Decimals({ erc20: mockERC20 }),
    );

    expect(decimals).toBe(18);
  });

  test("can read balance", async () => {
    const balanceOfAlice = await readAndParse(
      publicClient,
      erc20BalanceOf({ erc20: mockERC20, address: ALICE }),
    );
    expect(
      amountEqualTo(balanceOfAlice, createAmountFromString(mockERC20, ".75")),
    ).toBe(true);

    const balanceOfBob = await readAndParse(
      publicClient,
      erc20BalanceOf({ erc20: mockERC20, address: BOB }),
    );
    expect(
      amountEqualTo(balanceOfBob, createAmountFromString(mockERC20, ".25")),
    ).toBe(true);
  });

  test("can read allowance", async () => {
    const allowance = await readAndParse(
      publicClient,
      erc20Allowance({
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
      publicClient,
      erc20TotalSupply({ erc20: mockERC20 }),
    );
    expect(
      amountEqualTo(totalSupply, createAmountFromString(mockERC20, "1")),
    ).toBe(true);
  });

  test("can read nonce", async () => {
    expect(
      await readAndParse(
        publicClient,
        erc20PermitNonce({ erc20: mockERC20, address: ALICE }),
      ),
    ).toBe(0n);
  });

  test("can read permit data", async () => {
    const permitData = await readAndParse(
      publicClient,
      erc20PermitData({ erc20: mockERC20, address: ALICE }),
    );

    expect(permitData.amount).toBe(75n * 10n ** 16n);
    expect(permitData.nonce).toBe(0n);
  });

  test("can read domain seperator", async () => {
    expect(
      await readAndParse(
        publicClient,
        erc20PermitDomainSeparator({ erc20: mockERC20 }),
      ),
    ).toBeTruthy();
  });

  test("can get token", async () => {
    const token = await readAndParse(
      publicClient,
      getErc20({
        erc20: mockERC20,
      }),
    );

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainID).toBe(31337);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.decimals).toBe(18);
  });

  test("can get permit token", async () => {
    const token = await readAndParse(
      publicClient,
      getErc20Permit({
        erc20: mockERC20,
      }),
    );

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainID).toBe(31337);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.version).toBe("1");
    expect(token.decimals).toBe(18);
  });

  test("can get permit token no version", async () => {
    const token = await readAndParse(
      publicClient,
      getErc20Permit({
        erc20: createErc20(
          mockERC20.address,
          mockERC20.name,
          mockERC20.symbol,
          mockERC20.decimals,
          mockERC20.chainID,
        ),
      }),
    );

    expect(token.address).toBe(getAddress(mockERC20.address));
    expect(token.chainID).toBe(31337);
    expect(token.name).toBe("Mock ERC20");
    expect(token.symbol).toBe("MOCK");
    expect(token.version).toBe("1");
    expect(token.decimals).toBe(18);
  });
});
