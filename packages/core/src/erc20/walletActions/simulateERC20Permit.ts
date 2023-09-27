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
import type { ERC20Permit, ERC20PermitData } from "../../erc20/types.js";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";

export type ERC20PermitParameters = {
  signature: Hex;
  owner: Address;
  spender: Address;
  permitData: ERC20PermitData<ERC20Permit>;
  deadline: bigint;
};

export type SimulateERC20PermitParameters<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC20ABI,
    "permit",
    TChain,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20PermitParameters };

export type SimulateERC20PermitReturnType<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = SimulateContractReturnType<
  typeof solmateERC20ABI,
  "permit",
  TChain,
  TChainOverride
>;

export const simulateERC20Permit = <
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain>,
  {
    args: { owner, spender, signature, permitData, deadline },
    ...request
  }: SimulateERC20PermitParameters<TChain, TChainOverride>,
): Promise<SimulateERC20PermitReturnType<TChain, TChainOverride>> => {
  const r = `0x${signature.substring(2, 2 + 64)}` as const;
  const s = `0x${signature.substring(2 + 64, 2 + 64 + 64)}` as const;
  const v = Number(`0x${signature.substring(2 + 64 + 64)}`);

  return simulateContract(client, {
    address: permitData.token.address,
    abi: solmateERC20ABI,
    functionName: "permit",
    args: [owner, spender, permitData.amount, deadline, v, r, s],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC20ABI,
    "permit",
    TChain,
    TChainOverride
  >);
};
