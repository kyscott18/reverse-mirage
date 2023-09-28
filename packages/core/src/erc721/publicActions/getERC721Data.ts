import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { solmateErc721ABI as solmateERC721ABI } from "../../generated.js";
import type { BaseERC721, ERC721Data } from "../types.js";
import { createERC721Data } from "../utils.js";
import { getERC721BalanceOf } from "./getERC721BalanceOf.js";

export type GetERC721DataParameters<TERC721 extends BaseERC721> = Omit<
  ReadContractParameters<typeof solmateERC721ABI, "balanceOf">,
  "address" | "abi" | "functionName" | "args"
> & { erc721: TERC721; address: Address };

export type GetERC721DataReturnType<TERC721 extends BaseERC721> =
  ERC721Data<TERC721>;

export const getERC721Data = <
  TChain extends Chain | undefined,
  TERC721 extends BaseERC721,
>(
  client: Client<Transport, TChain>,
  { erc721, address, ...request }: GetERC721DataParameters<TERC721>,
): Promise<GetERC721DataReturnType<TERC721>> =>
  getERC721BalanceOf(client, { erc721, address, ...request }).then((data) => {
    if (data > Number.MAX_SAFE_INTEGER)
      throw Error("balance exceeds maximum representable number");
    return createERC721Data(erc721, Number(data));
  });
