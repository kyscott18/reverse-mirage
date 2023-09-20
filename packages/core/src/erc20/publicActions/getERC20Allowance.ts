import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { createAmountFromRaw } from "../../amount/utils.js";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
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
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetERC20AllowanceParameters<TERC20>,
  type?: T,
): ReverseMirage<bigint, GetERC20AllowanceReturnType<TERC20>, T> =>
  (type === undefined
    ? readContract(client, {
        abi: solmateERC20ABI,
        address: args.erc20.address,
        functionName: "allowance",
        args: [args.owner, args.spender],
      }).then((data) => createAmountFromRaw(args.erc20, data))
    : {
        read: () =>
          readContract(client, {
            abi: solmateERC20ABI,
            address: args.erc20.address,
            functionName: "allowance",
            args: [args.owner, args.spender],
          }),
        parse: (data) => createAmountFromRaw(args.erc20, data),
      }) as ReverseMirage<bigint, GetERC20AllowanceReturnType<TERC20>, T>;
