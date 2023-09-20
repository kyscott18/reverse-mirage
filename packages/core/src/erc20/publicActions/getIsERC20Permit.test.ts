import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { foundry } from "viem/chains";
import { getAddress } from "viem/utils";
import { expect, test } from "vitest";
import ERC20 from "../../../../../contracts/out/ERC20.sol/ERC20.json";
import ERC20Permit from "../../../../../contracts/out/ERC20Permit.sol/ERC20Permit.json";
import { ALICE } from "../../_test/constants.js";
import { publicClient, walletClient } from "../../_test/utils.js";
import { erc20ABI, erc20PermitABI } from "../../generated.js";
import { getIsERC20Permit } from "./getIsERC20Permit.js";

test("can check if permit true", async () => {
  const deployHash = await walletClient.deployContract({
    account: ALICE,
    abi: erc20PermitABI,
    bytecode: ERC20Permit.bytecode.object as Hex,
    args: ["name", "symbol", 18],
  });

  const { contractAddress } = await publicClient.waitForTransactionReceipt({
    hash: deployHash,
  });
  invariant(contractAddress);

  const token = await getIsERC20Permit(publicClient, {
    erc20: { address: contractAddress, chainID: foundry.id },
  });

  expect(token.type).toBe("erc20Permit");
  expect(token.address).toBe(getAddress(contractAddress));
  expect(token.chainID).toBe(31337);
  expect(token.name).toBe("name");
  expect(token.symbol).toBe("symbol");
  expect(token.decimals).toBe(18);
});

test("can check if permit false", async () => {
  const deployHash = await walletClient.deployContract({
    account: ALICE,
    abi: erc20ABI,
    bytecode: ERC20.bytecode.object as Hex,
    args: ["name", "symbol", 18],
  });

  const { contractAddress } = await publicClient.waitForTransactionReceipt({
    hash: deployHash,
  });
  invariant(contractAddress);

  const token = await getIsERC20Permit(publicClient, {
    erc20: { address: contractAddress, chainID: foundry.id },
  });

  expect(token.type).toBe("erc20");
  expect(token.address).toBe(getAddress(contractAddress));
  expect(token.chainID).toBe(31337);
  expect(token.name).toBe("name");
  expect(token.symbol).toBe("symbol");
  expect(token.decimals).toBe(18);
});
