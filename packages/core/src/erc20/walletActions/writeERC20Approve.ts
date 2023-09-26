import type {
  Account,
  Address,
  Chain,
  Client,
  Transport,
  WriteContractParameters,
  WriteContractReturnType,
} from "viem";
import { writeContract } from "viem/contract";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { BaseERC20, ERC20Amount } from "../types.js";

export type ERC20ApproveParameters = {
  amount: ERC20Amount<BaseERC20>;
  spender: Address;
};

export type WriteERC20ApproveParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC20ABI,
    "approve",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20ApproveParameters };

export const writeERC20Approve = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { amount, spender },
    ...request
  }: WriteERC20ApproveParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> =>
  writeContract(client, {
    address: amount.token.address,
    abi: solmateERC20ABI,
    functionName: "approve",
    args: [spender, amount.amount],
    ...request,
  } as unknown as WriteContractParameters<
    typeof solmateERC20ABI,
    "approve",
    TChain,
    TAccount,
    TChainOverride
  >);
