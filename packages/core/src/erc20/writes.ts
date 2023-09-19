import invariant from "tiny-invariant";
import {
  type Account,
  type Client,
  type Hex,
  type WalletClient,
  getAddress,
} from "viem";
import type { Address } from "viem/accounts";
import { simulateContract } from "viem/contract";
import { solmateErc20ABI as solmateERC20ABI } from "../generated.js";
import type {
  BaseERC20,
  ERC20Amount,
  ERC20Permit,
  ERC20PermitData,
} from "./types.js";
import { PermitType } from "./utils.js";

export const erc20Transfer = (
  client: Client,
  {
    to,
    amount,
    ...request
  }: {
    to: Address;
    amount: ERC20Amount<BaseERC20>;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20ABI,
    functionName: "transfer",
    args: [to, amount.amount],
    ...request,
  });

export const erc20Approve = (
  client: Client,
  {
    spender,
    amount,
    ...request
  }: {
    spender: Address;
    amount: ERC20Amount<BaseERC20>;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20ABI,
    functionName: "approve",
    args: [spender, amount.amount],
    ...request,
  });

export const erc20TransferFrom = (
  client: Client,
  {
    from,
    to,
    amount,
    ...request
  }: {
    from: Address;
    to: Address;
    amount: ERC20Amount<BaseERC20>;
    account?: Account | Address;
  },
) =>
  simulateContract(client, {
    address: amount.token.address,
    abi: solmateERC20ABI,
    functionName: "transferFrom",
    args: [from, to, amount.amount],
    ...request,
  });

export const erc20SignPermit = (
  client: WalletClient,
  {
    permitData,
    account,
    spender,
    deadline,
  }: {
    permitData: ERC20PermitData<ERC20Permit>;
    account: Account | Address;
    spender: Address;
    deadline: bigint;
  },
) => {
  const domain = {
    name: permitData.token.name,
    version: permitData.token.version,
    chainId: permitData.token.chainID,
    verifyingContract: getAddress(permitData.token.address),
  } as const;

  const owner = typeof account === "object" ? account.address : account;

  return client.signTypedData({
    domain,
    types: PermitType,
    primaryType: "Permit",
    message: {
      owner: owner,
      spender: spender,
      value: permitData.amount,
      deadline: deadline,
      nonce: permitData.nonce,
    },
    account,
  });
};

export const erc20Permit = (
  client: Client,
  {
    spender,
    permitData,
    deadline,
    signature,
    ...request
  }: {
    spender: Address;
    permitData: ERC20PermitData<ERC20Permit>;
    deadline: bigint;
    signature: Hex;
    account?: Account | Address;
  },
) => {
  invariant(signature.length === 132, "Invalid signature length");

  const r = `0x${signature.substring(2, 2 + 64)}` as const;
  const s = `0x${signature.substring(2 + 64, 2 + 64 + 64)}` as const;
  const v = Number(`0x${signature.substring(2 + 64 + 64)}`);

  const address =
    client.account?.address ??
    (typeof request.account === "object"
      ? request.account.address
      : request.account);

  invariant(address, "no address specified in permit");

  return simulateContract(client, {
    address: permitData.token.address,
    abi: solmateERC20ABI,
    functionName: "permit",
    args: [address, spender, permitData.amount, deadline, v, r, s],
    ...request,
  });
};
