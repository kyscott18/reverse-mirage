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
import { getERC721SupportsInterface } from "./getERC721SupportsInterface.js";

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
  } else {
    await testClient.revert({ id });
  }
  id = await testClient.snapshot();
});

test("read supports interface", async () => {
  const symbol = await getERC721SupportsInterface(publicClient, {
    erc721,
    interfaceID: "0x01ffc9a7",
  });
  expect(symbol).toBe(true);
});
