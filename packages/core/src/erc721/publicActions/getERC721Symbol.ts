import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { readContract } from "viem/contract";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC721 } from "../types.js";

export type GetERC721SymbolParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "symbol">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<ERC721, "address"> };

export type GetERC721SymbolReturnType = string;

export const getERC721Symbol = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetERC721SymbolParameters,
  type?: T,
): ReverseMirage<string, GetERC721SymbolReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "symbol",
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC721ABI,
            address: args.erc721.address,
            functionName: "symbol",
          }),
        parse: (data) => data,
      }) as ReverseMirage<string, GetERC721SymbolReturnType, T>;
