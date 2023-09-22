import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC721, ERC721Data } from "../types.js";
import { createERC721Data } from "../utils.js";
import { getERC721BalanceOf } from "./getERC721BalanceOf.js";

export type GetERC721DataParameters<TERC721 extends ERC721> = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "balanceOf">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: TERC721; address: Address };

export type GetERC721DataReturnType<TERC721 extends ERC721> =
  ERC721Data<TERC721>;

export const getERC721Data = <
  TChain extends Chain | undefined,
  TERC721 extends ERC721,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc721, address, ...request }: GetERC721DataParameters<TERC721>,
  type?: T,
): ReverseMirage<bigint, GetERC721DataReturnType<TERC721>, T> =>
  (type === undefined
    ? getERC721BalanceOf(client, { erc721, address, ...request }).then(
        (data) => {
          if (data > Number.MAX_SAFE_INTEGER)
            throw Error("balance exceeds maximum representable number");
          return createERC721Data(erc721, Number(data));
        },
      )
    : {
        read: () =>
          getERC721BalanceOf(
            client,
            { erc721, address, ...request },
            "select",
          ).read(),
        parse: (data) => {
          if (data > Number.MAX_SAFE_INTEGER)
            throw Error("balance exceeds maximum representable number");
          return createERC721Data(erc721, Number(data));
        },
      }) as ReverseMirage<bigint, GetERC721DataReturnType<TERC721>, T>;
