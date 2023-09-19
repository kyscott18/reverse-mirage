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

export type GetERC20PermitDataParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "nonces">,
  "address" | "abi" | "functionName" | "args"
> & { erc20Permit: ERC20Permit; address: Address };

export type GetERC20PermitDataReturnType<TERC20 extends ERC20Permit> =
  ERC20PermitData<TERC20>;

export const getERC20PermitData = <
  TChain extends Chain | undefined,
  T extends {
    args: GetERC20PermitDataParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  [bigint, bigint],
  GetERC20PermitDataReturnType<T["args"]["erc20Permit"]>,
  GetERC20PermitDataParameters,
  TChain,
  T
> =>
  (client
    ? Promise.all([
        readContract(client, {
          abi: solmateERC20ABI,
          address: args.erc20Permit.address,
          functionName: "balanceOf",
          args: [args.address],
        }),
        readContract(client, {
          abi: solmateERC20ABI,
          address: args.erc20Permit.address,
          functionName: "nonces",
          args: [args.address],
        }),
      ]).then(([balance, nonce]) =>
        createERC20PermitDataFromRaw(args.erc20Permit, balance, nonce),
      )
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          Promise.all([
            readContract(client, {
              abi: solmateERC20ABI,
              address: args.erc20Permit.address,
              functionName: "balanceOf",
              args: [args.address],
            }),
            readContract(client, {
              abi: solmateERC20ABI,
              address: args.erc20Permit.address,
              functionName: "nonces",
              args: [args.address],
            }),
          ]),
        parse: ([balance, nonce]) =>
          createERC20PermitDataFromRaw(args.erc20Permit, balance, nonce),
      }) as ReverseMirage<
    [bigint, bigint],
    GetERC20PermitDataReturnType<T["args"]["erc20Permit"]>,
    GetERC20PermitDataParameters,
    TChain,
    T
  >;
