import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { ERC20Permit } from "../types.js";
import { createERC20Permit } from "../utils.js";
import { getERC20Decimals } from "./getERC20Decimals.js";
import { getERC20Name } from "./getERC20Name.js";
import { getERC20Symbol } from "./getERC20Symbol.js";

export type GetERC20PermitParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc20: Pick<ERC20Permit, "address" | "chainID"> &
    Partial<Pick<ERC20Permit, "version" | "blockCreated">>;
};

export type GetERC20PermitReturnType = ERC20Permit;

export const getERC20Permit = <
  TChain extends Chain | undefined,
  T extends "select" | undefined,
>(
  client: Client<Transport, TChain>,
  args: GetERC20PermitParameters,
  type?: T,
): ReverseMirage<[string, string, number], GetERC20PermitReturnType, T> =>
  (type === undefined
    ? Promise.all([
        getERC20Name(client, args),
        getERC20Symbol(client, args),
        getERC20Decimals(client, args),
      ]).then(([name, symbol, decimals]) =>
        createERC20Permit(
          args.erc20.address,
          name,
          symbol,
          decimals,
          args.erc20.version ?? "1",
          args.erc20.chainID,
          args.erc20.blockCreated,
        ),
      )
    : {
        read: () =>
          Promise.all([
            getERC20Name(client, args, "select").read(),
            getERC20Symbol(client, args, "select").read(),
            getERC20Decimals(client, args, "select").read(),
          ]),
        parse: ([name, symbol, decimals]) =>
          createERC20Permit(
            args.erc20.address,
            name,
            symbol,
            decimals,
            args.erc20.version ?? "1",
            args.erc20.chainID,
            args.erc20.blockCreated,
          ),
      }) as ReverseMirage<
    [string, string, number],
    GetERC20PermitReturnType,
    T
  >;
