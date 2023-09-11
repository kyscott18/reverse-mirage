import { type Address, getAddress } from "viem";
import type { ERC1155, ERC1155Data } from "./types.js";

/**
 * Creates an {@link ERC1155}
 */
export const createERC1155 = (
  address: Address,
  id: bigint,
  uri: string,
  chainID: number,
): ERC1155 => ({
  type: "erc1155",
  address: getAddress(address),
  id,
  uri,
  chainID,
});

/**
 * Creates an {@link ERC1155Data}
 */
export const createERC1155Data = <TERC1155 extends ERC1155>(
  erc1155: TERC1155,
  amount: bigint,
): ERC1155Data<TERC1155> => ({
  type: `${erc1155.type as TERC1155["type"]}Data`,
  token: erc1155,
  amount,
});
