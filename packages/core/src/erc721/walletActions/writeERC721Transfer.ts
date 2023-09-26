import type {
  Account,
  Address,
  Chain,
  Client,
  Hex,
  Transport,
  WriteContractParameters,
  WriteContractReturnType,
} from "viem";
import { writeContract } from "viem/contract";
import { solmateErc721ABI as solmateERC721 } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type ERC721TransferParameters = {
  erc721: Pick<BaseERC721, "address">;
  id: bigint;
  from?: Address;
  to: Address;
  data?: "safe" | Hex;
};

export type WriteERC721TransferParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC721,
    "transferFrom",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721TransferParameters };

export const writeERC721Transfer = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { erc721, from, to, data, id },
    ...request
  }: WriteERC721TransferParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> =>
  data === undefined
    ? writeContract(client, {
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
      } as unknown as WriteContractParameters<
        typeof solmateERC721,
        "transferFrom",
        TChain,
        TAccount,
        TChainOverride
      >)
    : data === "safe"
    ? writeContract(client, {
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
      } as unknown as WriteContractParameters<
        typeof solmateERC721,
        "safeTransferFrom",
        TChain,
        TAccount,
        TChainOverride
      >)
    : writeContract(client, {
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
      } as unknown as WriteContractParameters<
        typeof solmateERC721,
        "safeTransferFrom",
        TChain,
        TAccount,
        TChainOverride
      >);
