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
import { solmateErc1155ABI as solmateERC1155 } from "../../generated.js";
import type { BaseERC1155 } from "../types.js";

export type ERC1155SetApprovalForAllParameters = {
  erc1155: Pick<BaseERC1155, "address">;
  spender: Address;
  approved: boolean;
};

export type WriteERC1155SetApprovalForAllParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC1155,
    "setApprovalForAll",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155SetApprovalForAllParameters };

export const writeERC1155SetApprovalForAll = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { erc1155, spender, approved },
    ...request
  }: WriteERC1155SetApprovalForAllParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> =>
  writeContract(client, {
    address: erc1155.address,
    abi: solmateERC1155,
    functionName: "setApprovalForAll",
    args: [spender, approved],
    ...request,
  } as unknown as WriteContractParameters<
    typeof solmateERC1155,
    "setApprovalForAll",
    TChain,
    TAccount,
    TChainOverride
  >);
