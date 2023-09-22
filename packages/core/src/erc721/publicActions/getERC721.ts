import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC721 } from "../types.js";
import { createERC721 } from "../utils.js";
import { getERC721Name } from "./getERC721Name.js";
import { getERC721Symbol } from "./getERC721Symbol.js";

export type GetERC721Parameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc721: Pick<ERC721, "address" | "chainID"> &
    Partial<Pick<ERC721, "blockCreated">>;
};

export type GetERC721ReturnType = ERC721;

export const getERC721 = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  { erc721, ...request }: GetERC721Parameters,
  type?: T,
): ReverseMirage<[string, string], GetERC721ReturnType, T> =>
  (type === undefined
    ? Promise.all([
        getERC721Name(client, { erc721, ...request }),
        getERC721Symbol(client, { erc721, ...request }),
      ]).then(([name, symbol]) =>
        createERC721(
          erc721.address,
          name,
          symbol,
          erc721.chainID,
          erc721.blockCreated,
        ),
      )
    : {
        read: () =>
          Promise.all([
            getERC721Name(client, { erc721, ...request }, "select").read(),
            getERC721Symbol(client, { erc721, ...request }, "select").read(),
          ]),
        parse: ([name, symbol]) =>
          createERC721(
            erc721.address,
            name,
            symbol,
            erc721.chainID,
            erc721.blockCreated,
          ),
      }) as ReverseMirage<[string, string], GetERC721ReturnType, T>;