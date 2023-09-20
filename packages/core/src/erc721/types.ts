import type { Address } from "viem";
import type { Token, TokenData } from "../types/token.js";
import type { Tuple } from "../types/tuple.js";

export type ERC721 = Token<"erc721"> & {
  address: Address;
  name: string;
  symbol: string;
  id: bigint;
  tokenURI: string;
  blockCreated: bigint;
};

export type ERC721IDData<TERC721 extends ERC721> = TokenData<
  TERC721,
  `${TERC721["type"]}IDData`,
  {
    owned: boolean;
  }
>;

export type ERC721Data<
  TERC721 extends ERC721,
  TBalance extends number = number,
> = TokenData<
  TERC721,
  `${TERC721["type"]}Data`,
  {
    balance: TBalance;
    ids: Tuple<bigint, TBalance> | undefined;
  }
>;
