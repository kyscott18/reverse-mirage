import { type Address, getAddress } from "viem";
import type { BaseERC1155, ERC1155, ERC1155Data } from "./types.js";

/**
 * Creates an {@link ERC1155}
 */
export const createERC1155 = (
  address: Address,
  id: bigint,
  uri: string,
  chainID: number,
  blockCreated = 0n,
): ERC1155 => ({
  type: "erc1155",
  address: getAddress(address),
  id,
  uri,
  chainID,
  blockCreated,
});

/**
 * Creates an {@link ERC1155Data}
 */
export const createERC1155Data = <TERC1155 extends BaseERC1155>(
  erc1155: TERC1155,
  amount: bigint,
): ERC1155Data<TERC1155> => ({
  type: `${erc1155.type as TERC1155["type"]}Data`,
  token: erc1155,
  amount,
});
