import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/contract";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC20Permit, ERC20PermitData } from "../types.js";
import { createERC20PermitDataFromRaw } from "../utils.js";

export type GetERC20PermitDataParameters<TERC20 extends ERC20Permit> = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "nonces">,
  "address" | "abi" | "functionName" | "args"
> & { erc20: TERC20; address: Address };

export type GetERC20PermitDataReturnType<TERC20 extends ERC20Permit> =
  ERC20PermitData<TERC20>;

export const getERC20PermitData = <
  TChain extends Chain | undefined,
  TERC20 extends ERC20Permit,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetERC20PermitDataParameters<TERC20>,
  type?: T,
): ReverseMirage<[bigint, bigint], GetERC20PermitDataReturnType<TERC20>, T> =>
  (type === undefined
    ? Promise.all([
        readContract(client, {
          abi: solmateERC20ABI,
          address: args.erc20.address,
          functionName: "balanceOf",
          args: [args.address],
        }),
        readContract(client, {
          abi: solmateERC20ABI,
          address: args.erc20.address,
          functionName: "nonces",
          args: [args.address],
        }),
      ]).then(([balance, nonce]) =>
        createERC20PermitDataFromRaw(args.erc20, balance, nonce),
      )
    : {
        read: () =>
          Promise.all([
            readContract(client, {
              abi: solmateERC20ABI,
              address: args.erc20.address,
              functionName: "balanceOf",
              args: [args.address],
            }),
            readContract(client, {
              abi: solmateERC20ABI,
              address: args.erc20.address,
              functionName: "nonces",
              args: [args.address],
            }),
          ]),
        parse: ([balance, nonce]) =>
          createERC20PermitDataFromRaw(args.erc20, balance, nonce),
      }) as ReverseMirage<
    [bigint, bigint],
    GetERC20PermitDataReturnType<TERC20>,
    T
  >;
