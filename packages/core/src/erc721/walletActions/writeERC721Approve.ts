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

export type ERC721ApproveParameters = {
  erc721: Pick<BaseERC721, "address">;
  id: bigint;
  spender: Address;
};

export type WriteERC721ApproveParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC721,
    "approve",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721ApproveParameters };

export const writeERC721Approve = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { erc721, spender, id },
    ...request
  }: WriteERC721ApproveParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> =>
  writeContract(client, {
    address: erc721.address,
    abi: solmateERC721,
    functionName: "approve",
    args: [spender, id],
    ...request,
  } as unknown as WriteContractParameters<
    typeof solmateERC721,
    "approve",
    TChain,
    TAccount,
    TChainOverride
  >);
