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
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ERC20Permit, ERC20PermitData } from "../types.js";

export type ERC20PermitParameters = {
  signature: Hex;
  owner: Address;
  spender: Address;
  permitData: ERC20PermitData<ERC20Permit>;
  deadline: bigint;
};

export type WriteERC20PermitParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> = Omit<
  WriteContractParameters<
    typeof solmateERC20ABI,
    "permit",
    TChain,
    TAccount,
    TChainOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20PermitParameters };

export const writeERC20Permit = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    args: { owner, spender, signature, permitData, deadline },
    ...request
  }: WriteERC20PermitParameters<TChain, TAccount, TChainOverride>,
): Promise<WriteContractReturnType> => {
  const r = `0x${signature.substring(2, 2 + 64)}` as const;
  const s = `0x${signature.substring(2 + 64, 2 + 64 + 64)}` as const;
  const v = Number(`0x${signature.substring(2 + 64 + 64)}`);

  return writeContract(client, {
    address: permitData.token.address,
    abi: solmateERC20ABI,
    functionName: "permit",
    args: [owner, spender, permitData.amount, deadline, v, r, s],
    ...request,
  } as unknown as WriteContractParameters<
    typeof solmateERC20ABI,
    "permit",
    TChain,
    TAccount,
    TChainOverride
  >);
};
