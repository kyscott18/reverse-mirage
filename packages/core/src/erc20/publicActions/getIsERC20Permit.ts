import type {
  Chain,
  Client,
  Hex,
  ReadContractParameters,
  Transport,
} from "viem";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
import type { ReverseMirage } from "../../types/rm.js";
import type { BaseERC20, ERC20, ERC20Permit } from "../types.js";
import { createERC20, createERC20Permit } from "../utils.js";
import { getERC20 } from "./getERC20.js";
import { getERC20DomainSeparator } from "./getERC20DomainSeparator.js";

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
export const getIsERC20Permit = <
  TChain extends Chain | undefined,
  T extends {
    args: GetIsERC20PermitParameters;
    client?: Client<Transport, TChain>;
  },
>({
  args,
  client,
}: T): ReverseMirage<
  [[string, string, number]] | [[string, string, number], Hex],
  GetIsERC20PermitReturnType,
  GetIsERC20PermitParameters,
  TChain,
  T
> =>
  (client
    ? Promise.all([
        getERC20({ args }).read(client),
        getERC20DomainSeparator({
          args: { erc20Permit: args.erc20 },
        }).read(client),
      ])
        .then(([[name, symbol, decimals]]) =>
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
        .catch(() =>
          getERC20({ args })
            .read(client)
            .then(([name, symbol, decimals]) =>
              createERC20(
                args.erc20.address,
                name,
                symbol,
                decimals,
                args.erc20.chainID,
                args.erc20.blockCreated,
              ),
            ),
        )
    : {
        read: async <TChain extends Chain | undefined>(
          client: Client<Transport, TChain>,
        ) => {
          try {
            return await Promise.all([
              getERC20({ args }).read(client),
              getERC20DomainSeparator({
                args: { erc20Permit: args.erc20 },
              }).read(client),
            ]);
          } catch {
            return await Promise.all([getERC20({ args }).read(client)]);
          }
        },
        parse: (data) =>
          data.length === 1
            ? createERC20(
                args.erc20.address,
                data[0][0],
                data[0][1],
                data[0][2],
                args.erc20.chainID,
                args.erc20.blockCreated,
              )
            : createERC20Permit(
                args.erc20.address,
                data[0][0],
                data[0][1],
                data[0][2],
                args.erc20.version ?? "1",
                args.erc20.chainID,
                args.erc20.blockCreated,
              ),
      }) as ReverseMirage<
    [[string, string, number]] | [[string, string, number], Hex],
    GetIsERC20PermitReturnType,
    GetIsERC20PermitParameters,
    TChain,
    T
  >;
