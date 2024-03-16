import type { Account, Chain, Client, Transport } from "viem";
import {
  type SignERC20PermitParameters,
  signERC20Permit,
} from "../erc20/walletActions/signERC20Permit.js";

export const walletActionReverseMirage = <
  TChain extends Chain = Chain,
  TAccount extends Account | undefined = Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
) => ({
  signERC20Permit: (args: SignERC20PermitParameters<TAccount>) =>
    signERC20Permit(client, args),
});
