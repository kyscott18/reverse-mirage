import invariant from "tiny-invariant";
import { type Hex, getAddress } from "viem";
import { foundry } from "viem/chains";
import { beforeEach, expect, test } from "vitest";
import ERC721Bytecode from "../../../../../contracts/out/ERC721.sol/ERC721.json";
import { ALICE, BOB } from "../../_test/constants.js";
import { publicClient, testClient, walletClient } from "../../_test/utils.js";
import { erc721ABI } from "../../generated.js";
import { getERC721Approved } from "../publicActions/getERC721Approved.js";
import type { ERC721 } from "../types.js";
import { createERC721 } from "../utils.js";
import { simulateERC721Approve } from "./simulateERC721Approve.js";

let id: Hex | undefined = undefined;

let erc721: ERC721;

beforeEach(async () => {
  if (id === undefined) {
    const deployHash = await walletClient.deployContract({
      abi: erc721ABI,
      bytecode: ERC721Bytecode.bytecode.object as Hex,
      args: ["name", "symbol", "https://mitch.com"],
    });

    const { contractAddress } = await publicClient.waitForTransactionReceipt({
      hash: deployHash,
    });
    invariant(contractAddress);
    erc721 = createERC721(contractAddress, "name", "symbol", foundry.id);

    const mintHash = await walletClient.writeContract({
      abi: erc721ABI,
      functionName: "mint",
      address: getAddress(contractAddress!),
      args: [ALICE, 0n],
    });
    await publicClient.waitForTransactionReceipt({ hash: mintHash });
  } else {
    await testClient.revert({ id });
  }

  id = await testClient.snapshot();
});

test("approve", async () => {
  const { request } = await simulateERC721Approve(publicClient, {
    args: {
      erc721,
      id: 0n,
      spender: BOB,
    },
    account: ALICE,
  });
  const hash = await walletClient.writeContract(request);

  await publicClient.waitForTransactionReceipt({ hash });

  expect(await getERC721Approved(publicClient, { erc721, id: 0n })).toBe(BOB);
});
