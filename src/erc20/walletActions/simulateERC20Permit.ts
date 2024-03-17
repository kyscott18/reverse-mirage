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
import { solmateErc20Abi as solmateERC20Abi } from "../../generated.js";
import type { ERC20Permit, ERC20PermitData } from "../types.js";

export type ERC20PermitParameters = {
  signature: Hex;
  owner: Address;
  spender: Address;
  permitData: ERC20PermitData<ERC20Permit>;
  deadline: bigint;
};

export type SimulateERC20PermitParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = Omit<
  SimulateContractParameters<
    typeof solmateERC20Abi,
    "permit",
    ContractFunctionArgs<
      typeof solmateERC20Abi,
      "nonpayable" | "payable",
      "permit"
    >,
    chain,
    chainOverride,
    accountOverride
  >,
  "args" | "address" | "abi" | "functionName"
> & { args: ERC20PermitParameters };

export type SimulateERC20PermitReturnType<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
  accountOverride extends Account | Address | undefined =
    | Account
    | Address
    | undefined,
> = SimulateContractReturnType<
  typeof solmateERC20Abi,
  "permit",
  ContractFunctionArgs<
    typeof solmateERC20Abi,
    "nonpayable" | "payable",
    "permit"
  >,
  chain,
  account,
  chainOverride,
  accountOverride
>;

export const simulateERC20Permit = <
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
  accountOverride extends Account | Address | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  {
    args: { owner, spender, signature, permitData, deadline },
    ...request
  }: SimulateERC20PermitParameters<chain, chainOverride, accountOverride>,
): Promise<
  SimulateERC20PermitReturnType<chain, account, chainOverride, accountOverride>
> => {
  const r = `0x${signature.substring(2, 2 + 64)}` as const;
  const s = `0x${signature.substring(2 + 64, 2 + 64 + 64)}` as const;
  const v = Number(`0x${signature.substring(2 + 64 + 64)}`);

  return simulateContract(client, {
    address: permitData.token.address,
    abi: solmateERC20Abi,
    functionName: "permit",
    args: [owner, spender, permitData.amount, deadline, v, r, s],
    ...request,
  } as unknown as SimulateContractParameters<
    typeof solmateERC20Abi,
    "permit",
    ContractFunctionArgs<
      typeof solmateERC20Abi,
      "nonpayable" | "payable",
      "permit"
    >,
    chain,
    chainOverride,
    accountOverride
  >);
};
