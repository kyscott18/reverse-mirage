import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { solmateErc1155ABI as solmateERC1155ABI } from "../../generated.js";
import type { BaseERC1155, ERC1155Data } from "../types.js";
import { createERC1155Data } from "../utils.js";

export type GetERC1155BalanceOfParameters<TERC1155 extends BaseERC1155> = Omit<
  ReadContractParameters<typeof solmateERC1155ABI, "balanceOf">,
  "address" | "abi" | "functionName" | "args"
> & { erc1155: TERC1155; address: Address };

export type GetERC1155BalanceOfReturnType<TERC1155 extends BaseERC1155> =
  ERC1155Data<TERC1155>;

export const getERC1155BalanceOf = <
  TChain extends Chain | undefined,
  TERC1155 extends BaseERC1155,
>(
  client: Client<Transport, TChain>,
  { erc1155, address, ...request }: GetERC1155BalanceOfParameters<TERC1155>,
): Promise<GetERC1155BalanceOfReturnType<TERC1155>> =>
  readContract(client, {
    abi: solmateERC1155ABI,
    address: erc1155.address,
    functionName: "balanceOf",
    args: [address, erc1155.id],
    ...request,
  }).then((data) => createERC1155Data(erc1155, data));
