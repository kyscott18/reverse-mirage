import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC721 } from "../types.js";
import { createERC721 } from "../utils.js";
import { getERC721Name } from "./getERC721Name.js";
import { getERC721Symbol } from "./getERC721Symbol.js";
import { getERC721TokenURI } from "./getERC721TokenURI.js";

export type GetERC721Parameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc721: Pick<ERC721, "address" | "id" | "chainID"> &
    Partial<Pick<ERC721, "blockCreated">>;
};

export type GetERC721ReturnType = ERC721;

export const getERC721 = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetERC721Parameters,
  type?: T,
): ReverseMirage<[string, string, string], GetERC721ReturnType, T> =>
  (type === undefined
    ? Promise.all([
        getERC721Name(client, args),
        getERC721Symbol(client, args),
        getERC721TokenURI(client, args),
      ]).then(([name, symbol, tokenURI]) =>
        createERC721(
          args.erc721.address,
          name,
          symbol,
          args.erc721.id,
          tokenURI,
          args.erc721.chainID,
          args.blockNumber,
        ),
      )
    : {
        read: () =>
          Promise.all([
            getERC721Name(client, args, "select").read(),
            getERC721Symbol(client, args, "select").read(),
            getERC721TokenURI(client, args, "select").read(),
          ]),
        parse: ([name, symbol, tokenURI]) =>
          createERC721(
            args.erc721.address,
            name,
            symbol,
            args.erc721.id,
            tokenURI,
            args.erc721.chainID,
            args.blockNumber,
          ),
      }) as ReverseMirage<[string, string, string], GetERC721ReturnType, T>;
