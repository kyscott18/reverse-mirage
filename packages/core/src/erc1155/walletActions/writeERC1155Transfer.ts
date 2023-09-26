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
import { solmateErc1155ABI as solmateERC1155 } from "../../generated.js";
import type { BaseERC1155, ERC1155Data } from "../types.js";

export type ERC1155TransferParameters = {
  erc1155Data: ERC1155Data<BaseERC1155>;
  from?: Address;
  to: Address;
  data?: Hex;
};

export type WriteERC1155TransferParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC1155,
    "safeTransferFrom",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC1155TransferParameters };

export const writeERC1155Transfer = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { erc1155Data, to, from, data },
    ...request
  }: WriteERC1155TransferParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> =>
  writeContract(client, {
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
  } as unknown as WriteContractParameters<
    typeof solmateERC1155,
    "safeTransferFrom",
    TChain,
    TAccount,
    TChainOverride
  >);
