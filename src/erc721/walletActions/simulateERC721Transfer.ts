import type {
  Account,
  Address,
  Chain,
  Client,
  ContractFunctionArgs,
  Hex,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import { solmateErc721Abi as solmateERC721Abi } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type ERC721TransferParameters = {
  erc721: Pick<BaseERC721, "address">;
  id: bigint;
  from?: Address;
  to: Address;
  data?: "safe" | Hex;
};

export type SimulateERC721TransferParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC721Abi,
    "transferFrom",
    ContractFunctionArgs<
      typeof solmateERC721Abi,
      "nonpayable" | "payable",
      "transferFrom"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721TransferParameters };

export type SimulateERC721TransferReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC721Abi,
  "transferFrom",
  ContractFunctionArgs<
    typeof solmateERC721Abi,
    "nonpayable" | "payable",
    "transferFrom"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC721Transfer = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { erc721, from, to, data, id },
    ...request
  }: SimulateERC721TransferParameters<chain, chainOverride, accountOverride>,
): Promise<
  SimulateERC721TransferReturnType<
    chain,
    account,
    chainOverride,
    accountOverride
  >
> =>
  data === undefined
    ? simulateContract(client, {
        address: erc721.address,
        abi: solmateERC721Abi,
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
        typeof solmateERC721Abi,
        "transferFrom",
        ContractFunctionArgs<
          typeof solmateERC721Abi,
          "nonpayable" | "payable",
          "transferFrom"
        >,
        chain,
        chainOverride,
        accountOverride
      >)
    : data === "safe"
      ? simulateContract(client, {
          address: erc721.address,
          abi: solmateERC721Abi,
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
          typeof solmateERC721Abi,
          "transferFrom",
          ContractFunctionArgs<
            typeof solmateERC721Abi,
            "nonpayable" | "payable",
            "transferFrom"
          >,
          chain,
          chainOverride,
          accountOverride
        >)
      : simulateContract(client, {
          address: erc721.address,
          abi: solmateERC721Abi,
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
          typeof solmateERC721Abi,
          "transferFrom",
          ContractFunctionArgs<
            typeof solmateERC721Abi,
            "nonpayable" | "payable",
            "transferFrom"
          >,
          chain,
          chainOverride,
          accountOverride
        >);
