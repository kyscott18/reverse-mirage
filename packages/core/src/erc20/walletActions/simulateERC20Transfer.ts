import type {
  Address,
  Chain,
  Client,
  SimulateContractParameters,
  SimulateContractReturnType,
  Transport,
} from "viem";
import { simulateContract } from "viem/actions";
import type { BaseERC20, ERC20Amount } from "../../erc20/types.js";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";

export type ERC20TransferParameters = {
  amount: ERC20Amount<BaseERC20>;
  to: Address;
};

export type SimulateERC20TransferParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC20ABI,
    "transfer",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20TransferParameters };

export type SimulateERC20TransferReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC20ABI,
  "transfer",
  TChain,
  TChainOverride
>;

export const simulateERC20Transfer = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { amount, to },
    ...request
  }: SimulateERC20TransferParameters<TChain, TChainOverride>,
): Promise<SimulateERC20TransferReturnType<TChain, TChainOverride>> =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20ABI,
    functionName: "transfer",
    args: [to, amount.amount],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC20ABI,
    "transfer",
    TChain,
    TChainOverride
  >);
