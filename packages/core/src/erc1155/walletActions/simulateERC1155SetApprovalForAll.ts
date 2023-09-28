import type {
  Address,
  Chain,
  Client,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import { solmateErc1155ABI as solmateERC1155 } from "../../generated.js";
import type { BaseERC1155 } from "../types.js";

export type ERC1155SetApprovalForAllParameters = {
  erc1155: Pick<BaseERC1155, "address">;
  spender: Address;
  approved: boolean;
};

export type SimulateERC1155SetApprovalForAllParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC1155,
    "setApprovalForAll",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155SetApprovalForAllParameters };

export type SimulateERC1155SetApprovalForAllReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC1155,
  "setApprovalForAll",
  TChain,
  TChainOverride
>;

export const simulateERC1155SetApprovalForAll = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { erc1155, spender, approved },
    ...request
  }: SimulateERC1155SetApprovalForAllParameters<TChain, TChainOverride>,
): Promise<
  SimulateERC1155SetApprovalForAllReturnType<TChain, TChainOverride>
> =>
  simulateContract(client, {
    address: erc1155.address,
    abi: solmateERC1155,
    functionName: "setApprovalForAll",
    args: [spender, approved],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC1155,
    "setApprovalForAll",
    TChain,
    TChainOverride
  >);
