import { type Address } from "viem";
import { getAddress } from "viem/utils";
import type { Tuple } from "../types/tuple.js";
import type { BaseERC721, ERC721, ERC721Data } from "./types.js";

/**
 * Creates an {@link ERC721}
 */
export const createERC721 = (
  address: Address,
  name: string,
  symbol: string,
  chainID: number,
  blockCreated = 0n,
): ERC721 => ({
  type: "erc721",
  address: getAddress(address),
  name,
  symbol,
  chainID,
  blockCreated,
});

/**
 * Creates an {@link ERC721Data}
 */
export const createERC721Data = <
  TERC721 extends BaseERC721,
  TBalance extends number,
>(
  erc721: TERC721,
  balance: TBalance,
  ids?: Tuple<bigint, TBalance>,
): ERC721Data<TERC721, TBalance> => ({
  type: `${erc721.type as TERC721["type"]}Data`,
  token: erc721,
  balance,
  ids,
});
