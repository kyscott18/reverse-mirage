import type {
  Address,
  Chain,
  Client,
  ReadContractParameters,
  Transport,
} from "viem";
import { readContract } from "viem/actions";
import { solmateErc20ABI as solmateERC20ABI } from "../../generated.js";
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
>(
  client: Client<Transport, TChain>,
  { erc20, address, ...request }: GetERC20PermitDataParameters<TERC20>,
): Promise<GetERC20PermitDataReturnType<TERC20>> =>
  Promise.all([
    readContract(client, {
      abi: solmateERC20ABI,
      address: erc20.address,
      functionName: "balanceOf",
      args: [address],
      ...request,
    }),
    readContract(client, {
      abi: solmateERC20ABI,
      address: erc20.address,
      functionName: "nonces",
      args: [address],
      ...request,
    }),
  ]).then(([balance, nonce]) =>
    createERC20PermitDataFromRaw(erc20, balance, nonce),
  );
