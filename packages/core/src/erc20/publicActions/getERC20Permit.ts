import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
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

export const getERC20Permit = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetERC20PermitParameters,
): Promise<GetERC20PermitReturnType> =>
  Promise.all([
    getERC20Name(client, { erc20, ...request }),
    getERC20Symbol(client, { erc20, ...request }),
    getERC20Decimals(client, { erc20, ...request }),
  ]).then(([name, symbol, decimals]) =>
    createERC20Permit(
      erc20.address,
      name,
      symbol,
      decimals,
      erc20.version ?? "1",
      erc20.chainID,
      erc20.blockCreated,
    ),
  );
