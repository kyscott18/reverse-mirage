import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC721 } from "../types.js";

export type GetERC721ApprovedParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "getApproved">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<ERC721, "address" | "id"> };

export type GetERC721ApprovedReturnType = Address;

export const getERC721Approved = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetERC721ApprovedParameters,
  type?: T,
): ReverseMirage<Address, GetERC721ApprovedReturnType, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC721ABI,
        address: args.erc721.address,
        functionName: "getApproved",
        args: [args.erc721.id],
      })
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC721ABI,
            address: args.erc721.address,
            functionName: "getApproved",
            args: [args.erc721.id],
          }),
        parse: (data) => data,
      }) as ReverseMirage<Address, GetERC721ApprovedReturnType, T>;
