import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { createAmountFromRaw } from "../../amount/utils.js";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { BaseERC20, ERC20Amount } from "../types.js";

export type GetERC20AllowanceParameters<TERC20 extends BaseERC20> = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "allowance">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: TERC20; owner: Address; spender: Address };

export type GetERC20AllowanceReturnType<TERC20 extends BaseERC20> =
  ERC20Amount<TERC20>;

export const getERC20Allowance = <
  TChain extends Chain | undefined,
  TERC20 extends BaseERC20,
>(
  client: Client<Transport, TChain>,
  { erc20, owner, spender, ...request }: GetERC20AllowanceParameters<TERC20>,
): Promise<GetERC20AllowanceReturnType<TERC20>> =>
  readContract(client, {
    abi: solmateERC20ABI,
    address: erc20.address,
    functionName: "allowance",
    args: [owner, spender],
    ...request,
  }).then((data) => createAmountFromRaw(erc20, data));
