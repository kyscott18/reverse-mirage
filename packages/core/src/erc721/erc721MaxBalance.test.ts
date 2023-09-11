import invariant from "tiny-invariant";
import type { Hex } from "viem";
import { foundry } from "viem/chains";
import { expect, test } from "vitest";
import ERC721Bytecode from "../../../../contracts/out/ERC721MaxBalance.sol/ERC721MaxBalance.json";
import { ALICE } from "../_test/constants.js";
import { publicClient, walletClient } from "../_test/utils.js";
import { erc721ABI } from "../generated.js";
import { readAndParse } from "../readUtils.js";
import { erc721Data } from "./reads.js";
import { createERC721 } from "./utils.js";

test("erc721 max balance", async () => {
  const deployHash = await walletClient.deployContract({
    abi: erc721ABI,
    bytecode: ERC721Bytecode.bytecode.object as Hex,
    args: ["name", "symbol", "https://mitch.com"],
  });

  const { contractAddress } = await publicClient.waitForTransactionReceipt({
    hash: deployHash,
  });
  invariant(contractAddress);
  const erc721 = createERC721(
    contractAddress,
    "name",
    "symbol",
    0n,
    "https://mitch.com",
    foundry.id,
  );
  await expect(() =>
    readAndParse(publicClient, erc721Data({ erc721, owner: ALICE })),
  ).rejects.toThrowError();
});
