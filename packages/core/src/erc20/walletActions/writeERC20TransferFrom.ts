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

export type ERC20TransferFromParameters = {
  amount: ERC20Amount<BaseERC20>;
  from: Address;
  to: Address;
};

export type WriteERC20TransferFromParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC20ABI,
    "transferFrom",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20TransferFromParameters };

export const writeERC20TransferFrom = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { amount, from, to },
    ...request
  }: WriteERC20TransferFromParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> =>
  writeContract(client, {
    address: amount.token.address,
    abi: solmateERC20ABI,
    functionName: "transferFrom",
    args: [from, to, amount.amount],
    ...request,
  } as unknown as WriteContractParameters<
    typeof solmateERC20ABI,
    "transferFrom",
    TChain,
    TAccount,
    TChainOverride
  >);
