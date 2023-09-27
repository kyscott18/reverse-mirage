import type {
  Address,
  Chain,
  Client,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import { solmateErc721ABI as solmateERC721 } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type ERC721SetApprovalForAllParameters = {
  erc721: Pick<BaseERC721, "address">;
  spender: Address;
  approved: boolean;
};

export type SimulateERC721SetApprovalForAllParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC721,
    "setApprovalForAll",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721SetApprovalForAllParameters };

export type SimulateERC721SetApprovalForAllReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC721,
  "setApprovalForAll",
  TChain,
  TChainOverride
>;

export const simulateERC721SetApprovalForAll = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { erc721, spender, approved },
    ...request
  }: SimulateERC721SetApprovalForAllParameters<TChain, TChainOverride>,
): Promise<SimulateERC721SetApprovalForAllReturnType<TChain, TChainOverride>> =>
  simulateContract(client, {
    address: erc721.address,
    abi: solmateERC721,
    functionName: "setApprovalForAll",
    args: [spender, approved],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC721,
    "setApprovalForAll",
    TChain,
    TChainOverride
  >);
