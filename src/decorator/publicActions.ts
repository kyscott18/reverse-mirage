import type { Chain, Client, Transport } from "viem";
import {
  type BaseERC20,
  type ERC20Permit,
  getERC20,
  getERC20Allowance,
  getERC20BalanceOf,
  getERC20Decimals,
  getERC20DomainSeparator,
  getERC20Name,
  getERC20Permit,
  getERC20PermitData,
  getERC20PermitNonce,
  getERC20Symbol,
  getERC20TotalSupply,
  getIsERC20Permit,
} from "../erc20/index.js";
import type { GetERC20Parameters } from "../erc20/publicActions/getERC20.js";
import type { GetERC20AllowanceParameters } from "../erc20/publicActions/getERC20Allowance.js";
import type { GetERC20BalanceOfParameters } from "../erc20/publicActions/getERC20BalanceOf.js";
import type { GetERC20DecimalsParameters } from "../erc20/publicActions/getERC20Decimals.js";
import type { GetERC20DomainSeparatorParameters } from "../erc20/publicActions/getERC20DomainSeparator.js";
import type { GetERC20NameParameters } from "../erc20/publicActions/getERC20Name.js";
import type { GetERC20PermitParameters } from "../erc20/publicActions/getERC20Permit.js";
import type { GetERC20PermitDataParameters } from "../erc20/publicActions/getERC20PermitData.js";
import type { GetERC20PermitNonceParameters } from "../erc20/publicActions/getERC20PermitNonce.js";
import type { GetERC20SymbolParameters } from "../erc20/publicActions/getERC20Symbol.js";
import type { GetERC20TotalSupplyParameters } from "../erc20/publicActions/getERC20TotalSupply.js";
import type { GetIsERC20PermitParameters } from "../erc20/publicActions/getIsERC20Permit.js";
import {
  type SimulateERC20ApproveParameters,
  simulateERC20Approve,
} from "../erc20/walletActions/simulateERC20Approve.js";
import {
  type SimulateERC20PermitParameters,
  simulateERC20Permit,
} from "../erc20/walletActions/simulateERC20Permit.js";
import {
  type SimulateERC20TransferParameters,
  simulateERC20Transfer,
} from "../erc20/walletActions/simulateERC20Transfer.js";
import {
  type SimulateERC20TransferFromParameters,
  simulateERC20TransferFrom,
} from "../erc20/walletActions/simulateERC20TransferFrom.js";
import {
  type BaseERC721,
  getERC721,
  getERC721Approved,
  getERC721BalanceOf,
  getERC721Data,
  getERC721IsApprovedForAll,
  getERC721Name,
  getERC721OwnerOf,
  getERC721SupportsInterface,
  getERC721Symbol,
  getERC721TokenURI,
} from "../erc721/index.js";
import type { GetERC721Parameters } from "../erc721/publicActions/getERC721.js";
import type { GetERC721ApprovedParameters } from "../erc721/publicActions/getERC721Approved.js";
import type { GetERC721BalanceOfParameters } from "../erc721/publicActions/getERC721BalanceOf.js";
import type { GetERC721DataParameters } from "../erc721/publicActions/getERC721Data.js";
import type { GetERC721IsApprovedForAllParameters } from "../erc721/publicActions/getERC721IsApprovedForAll.js";
import type { GetERC721NameParameters } from "../erc721/publicActions/getERC721Name.js";
import type { GetERC721OwnerOfParameters } from "../erc721/publicActions/getERC721OwnerOf.js";
import type { GetERC721SupportsInterfaceParameters } from "../erc721/publicActions/getERC721SupportsInterface.js";
import type { GetERC721SymbolParameters } from "../erc721/publicActions/getERC721Symbol.js";
import type { GetERC721TokenURIParameters } from "../erc721/publicActions/getERC721TokenURI.js";
import {
  type SimulateERC721ApproveParameters,
  simulateERC721Approve,
} from "../erc721/walletActions/simulateERC721Approve.js";
import {
  type SimulateERC721SetApprovalForAllParameters,
  simulateERC721SetApprovalForAll,
} from "../erc721/walletActions/simulateERC721SetApprovalForAll.js";
import {
  type SimulateERC721TransferParameters,
  simulateERC721Transfer,
} from "../erc721/walletActions/simulateERC721Transfer.js";
import {
  type BaseERC1155,
  getERC1155,
  getERC1155BalanceOf,
  getERC1155IsApprovedForAll,
  getERC1155URI,
} from "../erc1155/index.js";
import type { GetERC1155Parameters } from "../erc1155/publicActions/getERC1155.js";
import type { GetERC1155BalanceOfParameters } from "../erc1155/publicActions/getERC1155BalanceOf.js";
import type { GetERC1155IsApprovedForAllParameters } from "../erc1155/publicActions/getERC1155IsApprovedForAll.js";
import type { GetERC1155URIParameters } from "../erc1155/publicActions/getERC1155URI.js";
import {
  type SimulateERC1155SetApprovalForAllParameters,
  simulateERC1155SetApprovalForAll,
} from "../erc1155/walletActions/simulateERC1155SetApprovalForAll.js";
import {
  type SimulateERC1155TransferParameters,
  simulateERC1155Transfer,
} from "../erc1155/walletActions/simulateERC1155Transfer.js";
import {
  type SimulateERC1155TransferBatchParameters,
  simulateERC1155TransferBatch,
} from "../erc1155/walletActions/simulateERC1155TransferBatch.js";
import {
  type GetNativeBalanceParameters,
  getNativeBalance,
} from "../native/publicActions/getNativeBalance.js";
import type { NativeCurrency } from "../native/types.js";
import {
  type SimulateWETHDepositParameters,
  simulateWETHDeposit,
} from "../weth/walletActions/simulateWETHDeposit.js";
import {
  type SimulateWETHWithdrawParameters,
  simulateWETHWithdraw,
} from "../weth/walletActions/simulateWETHWithdraw.js";

export const publicActionReverseMirage = <
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: Client<Transport, TChain>,
) => ({
  getNativeBalance: <TNativeCurrency extends NativeCurrency>(
    args: GetNativeBalanceParameters<TNativeCurrency>,
  ) => getNativeBalance(client, args),

  getERC20: (args: GetERC20Parameters) => getERC20(client, args),
  getERC20Allowance: <TERC20 extends BaseERC20>(
    args: GetERC20AllowanceParameters<TERC20>,
  ) => getERC20Allowance(client, args),
  getERC20BalanceOf: <TERC20 extends BaseERC20>(
    args: GetERC20BalanceOfParameters<TERC20>,
  ) => getERC20BalanceOf(client, args),
  getERC20TotalSupply: <TERC20 extends BaseERC20>(
    args: GetERC20TotalSupplyParameters<TERC20>,
  ) => getERC20TotalSupply(client, args),
  getERC20Name: (args: GetERC20NameParameters) => getERC20Name(client, args),
  getERC20Symbol: (args: GetERC20SymbolParameters) =>
    getERC20Symbol(client, args),
  getERC20Decimals: (args: GetERC20DecimalsParameters) =>
    getERC20Decimals(client, args),
  getERC20DomainSeparator: (args: GetERC20DomainSeparatorParameters) =>
    getERC20DomainSeparator(client, args),
  getERC20Permit: (args: GetERC20PermitParameters) =>
    getERC20Permit(client, args),
  getERC20PermitNonce: (args: GetERC20PermitNonceParameters) =>
    getERC20PermitNonce(client, args),
  getERC20PermitData: <TERC20 extends ERC20Permit>(
    args: GetERC20PermitDataParameters<TERC20>,
  ) => getERC20PermitData(client, args),
  getIsERC20Permit: (args: GetIsERC20PermitParameters) =>
    getIsERC20Permit(client, args),

  getERC721: (args: GetERC721Parameters) => getERC721(client, args),
  getERC721Approved: (args: GetERC721ApprovedParameters) =>
    getERC721Approved(client, args),
  getERC721BalanceOf: (args: GetERC721BalanceOfParameters) =>
    getERC721BalanceOf(client, args),
  getERC721OwnerOf: (args: GetERC721OwnerOfParameters) =>
    getERC721OwnerOf(client, args),
  getERC721Data: <TERC721 extends BaseERC721>(
    args: GetERC721DataParameters<TERC721>,
  ) => getERC721Data(client, args),
  getERC721Name: (args: GetERC721NameParameters) => getERC721Name(client, args),
  getERC721Symbol: (args: GetERC721SymbolParameters) =>
    getERC721Symbol(client, args),
  getERC721TokenURI: (args: GetERC721TokenURIParameters) =>
    getERC721TokenURI(client, args),
  getERC721IsApprovedForAll: (args: GetERC721IsApprovedForAllParameters) =>
    getERC721IsApprovedForAll(client, args),
  getERC721SupportsInterface: (args: GetERC721SupportsInterfaceParameters) =>
    getERC721SupportsInterface(client, args),

  getERC1155: (args: GetERC1155Parameters) => getERC1155(client, args),
  getERC1155BalanceOf: <TERC1155 extends BaseERC1155>(
    args: GetERC1155BalanceOfParameters<TERC1155>,
  ) => getERC1155BalanceOf(client, args),
  getERC1155IsApprovedForAll: (args: GetERC1155IsApprovedForAllParameters) =>
    getERC1155IsApprovedForAll(client, args),
  getERC1155URI: (args: GetERC1155URIParameters) => getERC1155URI(client, args),

  simulateWETHDeposit: (args: SimulateWETHDepositParameters<TChain>) =>
    simulateWETHDeposit(client, args),
  simulateWETHWithdraw: (args: SimulateWETHWithdrawParameters) =>
    simulateWETHWithdraw(client, args),

  simulateERC20Approve: (args: SimulateERC20ApproveParameters) =>
    simulateERC20Approve(client, args),
  simulateERC20Permit: (args: SimulateERC20PermitParameters) =>
    simulateERC20Permit(client, args),
  simulateERC20Transfer: (args: SimulateERC20TransferParameters) =>
    simulateERC20Transfer(client, args),
  simulateERC20TransferFrom: (args: SimulateERC20TransferFromParameters) =>
    simulateERC20TransferFrom(client, args),

  simulateERC721Approve: (args: SimulateERC721ApproveParameters) =>
    simulateERC721Approve(client, args),
  simulateERC721SetApprovalForAll: (
    args: SimulateERC721SetApprovalForAllParameters,
  ) => simulateERC721SetApprovalForAll(client, args),
  simulateERC721Transfer: (args: SimulateERC721TransferParameters) =>
    simulateERC721Transfer(client, args),

  simulateERC1155SetApprovalForAll: (
    args: SimulateERC1155SetApprovalForAllParameters,
  ) => simulateERC1155SetApprovalForAll(client, args),
  simulateERC1155Transfer: (args: SimulateERC1155TransferParameters) =>
    simulateERC1155Transfer(client, args),
  simulateERC1155TransferBatch: (
    args: SimulateERC1155TransferBatchParameters,
  ) => simulateERC1155TransferBatch(client, args),
});
