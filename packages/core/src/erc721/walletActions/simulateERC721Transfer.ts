import type {
  Address,
  Chain,
  Client,
  Hex,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import { solmateErc721ABI as solmateERC721 } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type ERC721TransferParameters = {
  erc721: Pick<BaseERC721, "address">;
  id: bigint;
  from?: Address;
  to: Address;
  data?: "safe" | Hex;
};

export type SimulateERC721TransferParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC721,
    "transferFrom",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721TransferParameters };

export type SimulateERC721TransferReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC721,
  "transferFrom",
  TChain,
  TChainOverride
>;

export const simulateERC721Transfer = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { erc721, from, to, data, id },
    ...request
  }: SimulateERC721TransferParameters<TChain, TChainOverride>,
) =>
  data === undefined
    ? simulateContract(client, {
        address: erc721.address,
        abi: solmateERC721,
        functionName: "transferFrom",
        args: [
          (from ??
            client.account?.address ??
            (typeof request.account === "object"
              ? request.account.address
              : request.account))!,
          to,
          id,
        ],
        ...request,
      } as unknown as SimulateContractParameters<
        typeof solmateERC721,
        "transferFrom",
        TChain,
        TChainOverride
      >)
    : data === "safe"
    ? simulateContract(client, {
        address: erc721.address,
        abi: solmateERC721,
        functionName: "safeTransferFrom",
        args: [
          (from ??
            client.account?.address ??
            (typeof request.account === "object"
              ? request.account.address
              : request.account))!,
          to,
          id,
        ],
        ...request,
      } as unknown as SimulateContractParameters<
        typeof solmateERC721,
        "safeTransferFrom",
        TChain,
        TChainOverride
      >)
    : simulateContract(client, {
        address: erc721.address,
        abi: solmateERC721,
        functionName: "safeTransferFrom",
        args: [
          (from ??
            client.account?.address ??
            (typeof request.account === "object"
              ? request.account.address
              : request.account))!,
          to,
          id,
          data,
        ],
        ...request,
      } as unknown as SimulateContractParameters<
        typeof solmateERC721,
        "safeTransferFrom",
        TChain,
        TChainOverride
      >);
