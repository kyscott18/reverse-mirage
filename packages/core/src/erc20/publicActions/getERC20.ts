import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC20, ERC20 } from "../types.js";
import { createERC20 } from "../utils.js";
import {
  type GetERC20DecimalsReturnType,
  getERC20Decimals,
} from "./getERC20Decimals.js";
import { type GetERC20NameReturnType, getERC20Name } from "./getERC20Name.js";
import {
  type GetERC20SymbolReturnType,
  getERC20Symbol,
} from "./getERC20Symbol.js";

export type GetERC20Parameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc20: Pick<BaseERC20, "address" | "chainID"> &
    Partial<Pick<BaseERC20, "blockCreated">>;
};

export type GetERC20ReturnType = ERC20;

export const getERC20 = <
  TChain extends Chain | undefined,
  T extends {
    args: GetERC20Parameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  [string, string, number],
  GetERC20ReturnType,
  GetERC20Parameters,
  TChain,
  T
> =>
  (client
    ? Promise.all([
        getERC20Name({ args, client }) as Promise<GetERC20NameReturnType>,
        getERC20Symbol({ args, client }) as Promise<GetERC20SymbolReturnType>,
        getERC20Decimals({
          args,
          client,
        }) as Promise<GetERC20DecimalsReturnType>,
      ]).then(([name, symbol, decimals]) =>
        createERC20(
          args.erc20.address,
          name,
          symbol,
          decimals,
          args.erc20.chainID,
          args.erc20.blockCreated,
        ),
      )
    : {
        read: <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) =>
          Promise.all([
            getERC20Name({ args, client }),
            getERC20Symbol({ args, client }),
            getERC20Decimals({ args, client }),
          ]),
        parse: ([name, symbol, decimals]) =>
          createERC20(
            args.erc20.address,
            name,
            symbol,
            decimals,
            args.erc20.chainID,
            args.erc20.blockCreated,
          ),
      }) as ReverseMirage<
    [string, string, number],
    GetERC20ReturnType,
    GetERC20Parameters,
    TChain,
    T
  >;
