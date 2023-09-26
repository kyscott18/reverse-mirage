import type {
  Account,
  Address,
  Chain,
  Client,
  Transport,
  WriteContractParameters,
  WriteContractReturnType,
} from "viem";
import { writeContract } from "viem/contract";
import { solmateErc721ABI as solmateERC721 } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type ERC721SetApprovalForAllParameters = {
  erc721: Pick<BaseERC721, "address">;
  spender: Address;
  approved: boolean;
};

export type WriteERC721SetApprovalForAllParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC721,
    "setApprovalForAll",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721SetApprovalForAllParameters };

export const writeERC721SetApprovalForAll = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { erc721, spender, approved },
    ...request
  }: WriteERC721SetApprovalForAllParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> =>
  writeContract(client, {
    address: erc721.address,
    abi: solmateERC721,
    functionName: "setApprovalForAll",
    args: [spender, approved],
    ...request,
  } as unknown as WriteContractParameters<
    typeof solmateERC721,
    "setApprovalForAll",
    TChain,
    TAccount,
    TChainOverride
  >);
