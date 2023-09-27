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

export type ERC721ApproveParameters = {
  erc721: Pick<BaseERC721, "address">;
  id: bigint;
  spender: Address;
};

export type SimulateERC721ApproveParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC721,
    "approve",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721ApproveParameters };

export type SimulateERC721ApproveReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC721,
  "approve",
  TChain,
  TChainOverride
>;

export const simulateERC721Approve = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { erc721, spender, id },
    ...request
  }: SimulateERC721ApproveParameters<TChain, TChainOverride>,
): Promise<SimulateERC721ApproveReturnType<TChain, TChainOverride>> =>
  simulateContract(client, {
    address: erc721.address,
    abi: solmateERC721,
    functionName: "approve",
    args: [spender, id],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC721,
    "approve",
    TChain,
    TChainOverride
  >);
