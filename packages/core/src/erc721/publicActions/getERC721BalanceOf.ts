import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type GetERC721BalanceOfParameters = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "balanceOf">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: Pick<BaseERC721, "address">; address: Address };

export type GetERC721BalanceOfReturnType = bigint;

export const getERC721BalanceOf = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc721, address, ...request }: GetERC721BalanceOfParameters,
): Promise<GetERC721BalanceOfReturnType> =>
  readContract(client, {
    abi: solmateERC721ABI,
    address: erc721.address,
    functionName: "balanceOf",
    args: [address],
    ...request,
  });
