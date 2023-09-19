import type { Address } from "viem";
import type { Amount } from "../amount.js";
import type { Token } from "../types.js";

export type ERC1155 = Token<"erc1155"> & {
  address: Address;
  id: bigint;
  uri: string;
  blockCreated: bigint;
};

export type ERC1155Data<TERC1155 extends ERC1155> = Amount<
  TERC1155,
  `${TERC1155["type"]}Data`
>;
