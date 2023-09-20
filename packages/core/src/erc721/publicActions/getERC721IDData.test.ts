import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { foundry } from "viem/chains";
import { beforeAll, expect, test } from "vitest";
import ERC721Bytecode from "../../../../../contracts/out/ERC721.sol/ERC721.json";
import { ALICE } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { erc721ABI } from "../../generated.js";
import type { ERC721 } from "../types.js";
import { createERC721 } from "../utils.js";
import { getERC721IDData } from "./getERC721IDData.js";

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
    erc721 = createERC721(
      contractAddress,
      "name",
      "symbol",
      0n,
      "mitch.com",
      foundry.id,
    );

    const mintHash = await walletClient.writeContract({
      abi: erc721ABI,
      functionName: "mint",
      address: contractAddress,
      args: [ALICE, 0n],
    });
    await publicClient.waitForTransactionReceipt({ hash: mintHash });
  } else {
    await testClient.revert({ id });
  }
  id = await testClient.snapshot();
});

test("read id data", async () => {
  const owner = await getERC721IDData(publicClient, {
    erc721,
    address: ALICE,
  });
  expect(owner).toBe(true);
});

test("read id data select", async () => {
  const rm = getERC721IDData(
    publicClient,
    {
      erc721,
      address: ALICE,
    },
    "select",
  );

  expect(await rm.read().then((data) => rm.parse(data))).toBe(true);
});
