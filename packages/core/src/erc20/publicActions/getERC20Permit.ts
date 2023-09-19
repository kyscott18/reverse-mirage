import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC20Permit } from "../types.js";
import { createERC20Permit } from "../utils.js";
import {
  type GetERC20DecimalsReturnType,
  getERC20Decimals,
} from "./getERC20Decimals.js";
import { type GetERC20NameReturnType, getERC20Name } from "./getERC20Name.js";
import {
  type GetERC20SymbolReturnType,
  getERC20Symbol,
} from "./getERC20Symbol.js";

export type GetERC20PermitParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc20Permit: Pick<ERC20Permit, "address" | "chainID"> &
    Partial<Pick<ERC20Permit, "version" | "blockCreated">>;
};

export type GetERC20PermitReturnType = ERC20Permit;

export const getERC20Permit = <
  TChain extends Chain | undefined,
  T extends {
    args: GetERC20PermitParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  [string, string, number],
  GetERC20PermitReturnType,
  GetERC20PermitParameters,
  TChain,
  T
> =>
  (client
    ? Promise.all([
        getERC20Name({
          args: { erc20: args.erc20Permit },
          client,
        }) as Promise<GetERC20NameReturnType>,
        getERC20Symbol({
          args: { erc20: args.erc20Permit },
          client,
        }) as Promise<GetERC20SymbolReturnType>,
        getERC20Decimals({
          args: { erc20: args.erc20Permit },
          client,
        }) as Promise<GetERC20DecimalsReturnType>,
      ]).then(([name, symbol, decimals]) =>
        createERC20Permit(
          args.erc20Permit.address,
          name,
          symbol,
          decimals,
          args.erc20Permit.version ?? "1",
          args.erc20Permit.chainID,
          args.erc20Permit.blockCreated,
        ),
      )
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          Promise.all([
            getERC20Name({ args: { erc20: args.erc20Permit }, client }),
            getERC20Symbol({ args: { erc20: args.erc20Permit }, client }),
            getERC20Decimals({ args: { erc20: args.erc20Permit }, client }),
          ]),
        parse: ([name, symbol, decimals]) =>
          createERC20Permit(
            args.erc20Permit.address,
            name,
            symbol,
            decimals,
            args.erc20Permit.version ?? "1",
            args.erc20Permit.chainID,
            args.erc20Permit.blockCreated,
          ),
      }) as ReverseMirage<
    [string, string, number],
    GetERC20PermitReturnType,
    GetERC20PermitParameters,
    TChain,
    T
  >;
