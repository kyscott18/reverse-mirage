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
import { solmateErc1155ABI as solmateERC1155 } from "../../generated.js";
import type { BaseERC1155, ERC1155Data } from "../types.js";

export type ERC1155TransferParameters = {
  erc1155Data: ERC1155Data<BaseERC1155>;
  from?: Address;
  to: Address;
  data?: Hex;
};

export type SimulateERC1155TransferParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC1155,
    "safeTransferFrom",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155TransferParameters };

export type SimulateERC1155TransferReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC1155,
  "safeTransferFrom",
  TChain,
  TChainOverride
>;

export const simulateERC1155Transfer = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { erc1155Data, to, from, data },
    ...request
  }: SimulateERC1155TransferParameters<TChain, TChainOverride>,
): Promise<SimulateERC1155TransferReturnType<TChain, TChainOverride>> =>
  simulateContract(client, {
    address: erc1155Data.token.address,
    abi: solmateERC1155,
    functionName: "safeTransferFrom",
    args: [
      (from ??
        client.account?.address ??
        (typeof request.account === "object"
          ? request.account.address
          : request.account))!,
      to,
      erc1155Data.token.id,
      erc1155Data.amount,
      data ?? "0x",
    ],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC1155,
    "safeTransferFrom",
    TChain,
    TChainOverride
  >);
