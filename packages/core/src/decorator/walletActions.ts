import type { Account, Chain, Client, Transport } from "viem";
import {
  type SignERC20PermitParameters,
  signERC20Permit,
} from "../erc20/walletActions/signERC20Permit.js";
import {
  type WriteERC1155TransferParameters,
  writeERC1155Transfer,
} from "../erc1155/walletActions/writeERC1155Transfer.js";
import {
  type WriteERC1155TransferBatchParameters,
  writeERC1155TransferBatch,
} from "../erc1155/walletActions/writeERC1155TransferBatch.js";
import {
  type WriteWETHDepositParameters,
  writeWETHDeposit,
} from "../weth/walletActions/writeWETHDeposit.js";
import {
  type WriteWETHWithdrawParameters,
  writeWETHWithdraw,
} from "../weth/walletActions/writeWETHWithdraw.js";

import {
  type WriteERC20ApproveParameters,
  writeERC20Approve,
} from "../erc20/walletActions/writeERC20Approve.js";
import {
  type WriteERC20PermitParameters,
  writeERC20Permit,
} from "../erc20/walletActions/writeERC20Permit.js";
import {
  type WriteERC20TransferParameters,
  writeERC20Transfer,
} from "../erc20/walletActions/writeERC20Transfer.js";
import {
  type WriteERC20TransferFromParameters,
  writeERC20TransferFrom,
} from "../erc20/walletActions/writeERC20TransferFrom.js";
import {
  type WriteERC721ApproveParameters,
  writeERC721Approve,
} from "../erc721/walletActions/writeERC721Approve.js";
import {
  type WriteERC721SetApprovalForAllParameters,
  writeERC721SetApprovalForAll,
} from "../erc721/walletActions/writeERC721SetApprovalForAll.js";
import {
  type WriteERC721TransferParameters,
  writeERC721Transfer,
} from "../erc721/walletActions/writeERC721Transfer.js";
import {
  type WriteERC1155SetApprovalForAllParameters,
  writeERC1155SetApprovalForAll,
} from "../erc1155/walletActions/writeERC1155SetApprovalForAll.js";

export const walletActionReverseMirage = <
  TChain extends Chain = Chain,
  TAccount extends Account | undefined = Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
) => ({
  signERC20Permit: (args: SignERC20PermitParameters<TAccount>) =>
    signERC20Permit(client, args),

  writeWETHDeposit: (args: WriteWETHDepositParameters<TChain, TAccount>) =>
    writeWETHDeposit(client, args),
  writeWETHWithdraw: (args: WriteWETHWithdrawParameters<TChain, TAccount>) =>
    writeWETHWithdraw(client, args),

  writeERC20Approve: (args: WriteERC20ApproveParameters<TChain, TAccount>) =>
    writeERC20Approve(client, args),
  writeERC20Permit: (args: WriteERC20PermitParameters<TChain, TAccount>) =>
    writeERC20Permit(client, args),
  writeERC20Transfer: (args: WriteERC20TransferParameters<TChain, TAccount>) =>
    writeERC20Transfer(client, args),
  writeERC20TransferFrom: (
    args: WriteERC20TransferFromParameters<TChain, TAccount>,
  ) => writeERC20TransferFrom(client, args),

  writeERC721Approve: (args: WriteERC721ApproveParameters<TChain, TAccount>) =>
    writeERC721Approve(client, args),
  writeERC721SetApprovalForAll: (
    args: WriteERC721SetApprovalForAllParameters<TChain, TAccount>,
  ) => writeERC721SetApprovalForAll(client, args),
  writeERC721Transfer: (
    args: WriteERC721TransferParameters<TChain, TAccount>,
  ) => writeERC721Transfer(client, args),

  writeERC1155SetApprovalForAll: (
    args: WriteERC1155SetApprovalForAllParameters<TChain, TAccount>,
  ) => writeERC1155SetApprovalForAll(client, args),
  writeERC1155Transfer: (
    args: WriteERC1155TransferParameters<TChain, TAccount>,
  ) => writeERC1155Transfer(client, args),
  writeERC1155TransferBatch: (
    args: WriteERC1155TransferBatchParameters<TChain, TAccount>,
  ) => writeERC1155TransferBatch(client, args),
});
