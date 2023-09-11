import { type Address, getAddress } from "viem";
import type { Tuple } from "../types.js";
import type { ERC721, ERC721Data, ERC721IDData } from "./types.js";

/**
 * Creates an {@link ERC721}
 */
export const createERC721 = (
  address: Address,
  name: string,
  symbol: string,
  id: bigint,
  tokenURI: string,
  chainID: number,
): ERC721 => ({
  type: "erc721",
  address: getAddress(address),
  name,
  symbol,
  id,
  tokenURI,
  chainID,
});

/**
 * Creates an {@link ERC721IDData}
 */
export const createERC721IDData = <TERC721 extends ERC721>(
  erc721: TERC721,
  owned: boolean,
): ERC721IDData<TERC721> => ({
  type: `${erc721.type as TERC721["type"]}IDData`,
  token: erc721,
  owned,
});

/**
 * Creates an {@link ERC721Data}
 */
export const createERC721Data = <
  TERC721 extends ERC721,
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
