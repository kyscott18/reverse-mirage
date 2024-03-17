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

export type ERC721ApproveParameters = {
  erc721: Pick<BaseERC721, "address">;
  id: bigint;
  spender: Address;
};

export type SimulateERC721ApproveParameters<
  args extends ContractFunctionArgs<
    typeof solmateERC721Abi,
    "nonpayable" | "payable",
    "approve"
  > = ContractFunctionArgs<
    typeof solmateERC721Abi,
    "nonpayable" | "payable",
    "approve"
  >,
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC721Abi,
    "approve",
    args,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC721ApproveParameters };

export type SimulateERC721ApproveReturnType<
  args extends ContractFunctionArgs<
    typeof solmateERC721Abi,
    "nonpayable" | "payable",
    "approve"
  > = ContractFunctionArgs<
    typeof solmateERC721Abi,
    "nonpayable" | "payable",
    "approve"
  >,
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC721Abi,
  "approve",
  args,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC721Approve = <
  args extends ContractFunctionArgs<
    typeof solmateERC721Abi,
    "nonpayable" | "payable",
    "approve"
  > = ContractFunctionArgs<
    typeof solmateERC721Abi,
    "nonpayable" | "payable",
    "approve"
  >,
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { erc721, spender, id },
    ...request
  }: SimulateERC721ApproveParameters<
    args,
    chain,
    chainOverride,
    accountOverride
  >,
): Promise<
  SimulateERC721ApproveReturnType<
    args,
    chain,
    account,
    chainOverride,
    accountOverride
  >
> =>
  simulateContract(client, {
    address: erc721.address,
    abi: solmateERC721Abi,
    functionName: "approve",
    args: [spender, id],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC721Abi,
    "approve",
    args,
    chain,
    chainOverride,
    accountOverride
  >);
