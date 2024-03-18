import type { Address } from "viem";
import type { Token, TokenData } from "../types/token.js";
import type { Tuple } from "../types/tuple.js";

export type BaseERC721<TType extends string = string> = Token<TType> & {
  address: Address;
  name: string;
  symbol: string;
  blockCreated: bigint;
};

export type ERC721 = BaseERC721<"erc721">;

export type ERC721Data<
  TERC721 extends BaseERC721,
  TBalance extends number = number,
> = TokenData<
  TERC721,
  `${TERC721["type"]}Data`,
  {
    balance: TBalance;
    ids: Tuple<bigint, TBalance> | undefined;
  }
>;
