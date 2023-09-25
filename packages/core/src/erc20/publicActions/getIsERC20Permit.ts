import type { Chain, Client, ReadContractParameters, Transport } from "viem";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { BaseERC20, ERC20, ERC20Permit } from "../types.js";
import { getERC20 } from "./getERC20.js";
import { getERC20DomainSeparator } from "./getERC20DomainSeparator.js";
import { getERC20Permit } from "./getERC20Permit.js";

export type GetIsERC20PermitParameters = Omit<
  ReadContractParameters<typeof solmateERC20ABI, "name">,
  "address" | "abi" | "functionName" | "args"
> & {
  erc20: Pick<BaseERC20, "address" | "chainID"> &
    Partial<Pick<BaseERC20, "blockCreated">> &
    Partial<Pick<ERC20Permit, "version">>;
};

export type GetIsERC20PermitReturnType = ERC20 | ERC20Permit;

/**
 * Returns either a {@link ERC20} or {@link ERC20Permit} depending on whether the specified token implements EIP 2616
 *
 * Implementation is determined by checking if calling `DOMAIN_SEPARATOR()` reverts
 */
export const getIsERC20Permit = <TChain extends Chain | undefined,>(
  client: Client<Transport, TChain>,
  { erc20, ...request }: GetIsERC20PermitParameters,
): Promise<GetIsERC20PermitReturnType> =>
  Promise.all([
    getERC20Permit(client, { erc20, ...request }),
    getERC20DomainSeparator(client, { erc20, ...request }),
  ])
    .then(([erc20]) => erc20)
    .catch(() => getERC20(client, { erc20, ...request }));
