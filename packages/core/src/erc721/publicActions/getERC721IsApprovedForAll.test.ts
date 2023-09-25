import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { foundry } from "viem/chains";
import { beforeAll, expect, test } from "vitest";
import ERC721Bytecode from "../../../../../contracts/out/ERC721.sol/ERC721.json";
import { ALICE, BOB } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { erc721ABI } from "../../generated.js";
import type { ERC721 } from "../types.js";
import { createERC721 } from "../utils.js";
import { getERC721IsApprovedForAll } from "./getERC721IsApprovedForAll.js";

let id: Hex | undefined = undefined;

let erc721: ERC721;

beforeAll(async () => {
  if (id === undefined || erc721 === undefined) {
    const deployHash = await walletClient.deployContract({
      account: ALICE,
      abi: erc721ABI,
      bytecode: ERC721Bytecode.bytecode.object as Hex,
      args: ["name", "symbol", "mitch.com"],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);
    erc721 = createERC721(contractAddress, "name", "symbol", foundry.id);

    const approvedHash = await walletClient.writeContract({
      abi: erc721ABI,
      functionName: "setApprovalForAll",
      address: contractAddress,
      args: [BOB, true],
    });
    await publicClient.waitForTransactionReceipt({ hash: approvedHash });
  } else {
    await testClient.revert({ id });
  }
  id = await testClient.snapshot();
});

test("read is approved for all", async () => {
  const owner = await getERC721IsApprovedForAll(publicClient, {
    erc721,
    owner: ALICE,
    spender: BOB,
  });
  expect(owner).toBe(true);
});
