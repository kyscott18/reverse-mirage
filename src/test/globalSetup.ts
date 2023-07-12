import MockERC20 from "../../contracts/out/MockERC20.sol/MockERC20.json";
import { forkBlockNumber, forkUrl } from "./constants.js";
import { ALICE, BOB } from "./constants.js";
import { mockErc20ABI } from "./generated.js";
import { publicClient, testClient, walletClient } from "./utils.js";
import { startProxy } from "@viem/anvil";
import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { parseEther } from "viem/utils";

export default async function () {
  const shutdown = await startProxy({
    port: 8545, // By default, the proxy will listen on port 8545.
    host: "::", // By default, the proxy will listen on all interfaces.
    options: {
      forkUrl,
      forkBlockNumber,
    },
  });

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
  return () => Promise.all([shutdown(), testClient.reset()]);
}
