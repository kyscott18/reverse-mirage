import type {
  Account,
  Address,
  Chain,
  Client,
  SignTypedDataParameters,
  Transport,
} from "viem";
import { signTypedData } from "viem/actions";
import { getAddress } from "viem/utils";
import type { ERC20Permit, ERC20PermitData } from "../types.js";
import { PermitType } from "../utils.js";

export type SignERC20PermitParameters<TAccount extends Account | undefined> =
  Pick<
    SignTypedDataParameters<typeof PermitType, "Permit", TAccount>,
    "account"
  > & {
    permitData: ERC20PermitData<ERC20Permit>;
    spender: Address;
    deadline: bigint;
  };

export const signERC20Permit = <
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  {
    permitData,
    spender,
    deadline,
    account = client.account,
    ...request
  }: SignERC20PermitParameters<TAccount>,
) => {
  const domain = {
    name: permitData.token.name,
    version: permitData.token.version,
    chainId: permitData.token.chainID,
    verifyingContract: getAddress(permitData.token.address),
  } as const;

  const owner =
    client.account?.address ??
    (typeof account === "object" ? account.address : account);

  return signTypedData(client, {
    domain,
    types: PermitType,
    primaryType: "Permit",
    message: {
      owner: owner!,
      spender: spender,
      value: permitData.amount,
      deadline: deadline,
      nonce: permitData.nonce,
    },
    account: account!,
    ...request,
  });
};
