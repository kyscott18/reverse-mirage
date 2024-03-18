import { recoverTypedDataAddress, zeroAddress } from "viem";
import { foundry } from "viem/chains";
import { expect, test } from "vitest";
import { ALICE, BOB } from "../_test/constants.js";
import { walletClient } from "../_test/utils.js";
import {
  PermitType,
  createERC20Permit,
  createERC20PermitDataFromString,
} from "../erc20/index.js";
import { walletActionReverseMirage } from "./walletActions.js";

const erc20 = createERC20Permit(
  zeroAddress,
  "name",
  "symbol",
  18,
  "1",
  foundry.id,
);

test("sign erc20 permit", async () => {
  const signature = await walletClient
    .extend(walletActionReverseMirage)
    .signERC20Permit({
      permitData: createERC20PermitDataFromString(erc20, ".5", 0n),
      spender: BOB,
      deadline: 2n ** 256n - 1n,
    });

  const signer = await recoverTypedDataAddress({
    domain: {
      name: "name",
      version: "1",
      chainId: foundry.id,
      verifyingContract: zeroAddress,
    },
    types: PermitType,
    primaryType: "Permit",
    message: {
      owner: ALICE,
      spender: BOB,
      value: 5n * 10n ** 17n,
      deadline: 2n ** 256n - 1n,
      nonce: 0n,
    },
    signature,
  });

  expect(signer).toBe(ALICE);
});
