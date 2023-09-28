import type { Address } from "viem";
import type { Amount } from "../amount/types.js";
import type { Token } from "../types/token.js";

export type BaseERC1155<TType extends string = string> = Token<TType> & {
  address: Address;
  id: bigint;
  uri: string;
  blockCreated: bigint;
};

export type ERC1155 = BaseERC1155<"erc1155">;

export type ERC1155Data<TERC1155 extends BaseERC1155> = Amount<
  TERC1155,
  `${TERC1155["type"]}Data`
>;
