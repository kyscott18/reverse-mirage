import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { BaseERC20, ERC20 } from "../types.js";
import { createERC20 } from "../utils.js";
import { getERC20Decimals } from "./getERC20Decimals.js";
import { getERC20Name } from "./getERC20Name.js";
import { getERC20Symbol } from "./getERC20Symbol.js";

export type GetERC20Parameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc20: Pick<BaseERC20, "address" | "chainID"> &
    Partial<Pick<BaseERC20, "blockCreated">>;
};

export type GetERC20ReturnType = ERC20;

export const getERC20 = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20Parameters,
): Promise<GetERC20ReturnType> =>
  Promise.all([
    getERC20Name(client, { erc20, ...request }),
    getERC20Symbol(client, { erc20, ...request }),
    getERC20Decimals(client, { erc20, ...request }),
  ]).then(([name, symbol, decimals]) =>
    createERC20(
      erc20.address,
      name,
      symbol,
      decimals,
      erc20.chainID,
      erc20.blockCreated,
    ),
  );
