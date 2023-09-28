import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { BaseERC721 } from "../types.js";
import { createERC721 } from "../utils.js";
import { getERC721Name } from "./getERC721Name.js";
import { getERC721Symbol } from "./getERC721Symbol.js";

export type GetERC721Parameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc721: Pick<BaseERC721, "address" | "chainID"> &
    Partial<Pick<BaseERC721, "blockCreated">>;
};

export type GetERC721ReturnType = BaseERC721;

export const getERC721 = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc721, ...request }: GetERC721Parameters,
): Promise<GetERC721ReturnType> =>
  Promise.all([
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
  );
