import type {
  Account,
  Address,
  Chain,
  Client,
  ContractFunctionArgs,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import { solmateErc721Abi as solmateERC721Abi } from "../../generated.js";
import type { BaseERC721 } from "../types.js";

export type ERC721SetApprovalForAllParameters = {
  erc721: Pick<BaseERC721, "address">;
  spender: Address;
  approved: boolean;
};

export type SimulateERC721SetApprovalForAllParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC721Abi,
    "setApprovalForAll",
    ContractFunctionArgs<
      typeof solmateERC721Abi,
      "nonpayable" | "payable",
      "setApprovalForAll"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721SetApprovalForAllParameters };

export type SimulateERC721SetApprovalForAllReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC721Abi,
  "setApprovalForAll",
  ContractFunctionArgs<
    typeof solmateERC721Abi,
    "nonpayable" | "payable",
    "setApprovalForAll"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC721SetApprovalForAll = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { erc721, spender, approved },
    ...request
  }: SimulateERC721SetApprovalForAllParameters<
    chain,
    chainOverride,
    accountOverride
  >,
): Promise<
  SimulateERC721SetApprovalForAllReturnType<
    chain,
    account,
    chainOverride,
    accountOverride
  >
> =>
  simulateContract(client, {
    address: erc721.address,
    abi: solmateERC721Abi,
    functionName: "setApprovalForAll",
    args: [spender, approved],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC721Abi,
    "setApprovalForAll",
    ContractFunctionArgs<
      typeof solmateERC721Abi,
      "nonpayable" | "payable",
      "setApprovalForAll"
    >,
    chain,
    chainOverride,
    accountOverride
  >);
