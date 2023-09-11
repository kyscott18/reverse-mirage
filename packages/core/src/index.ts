// ERC20

export {
  erc20BalanceOf,
  erc20Allowance,
  erc20TotalSupply,
  erc20Name,
  erc20Symbol,
  erc20Decimals,
  erc20PermitNonce,
  erc20PermitData,
  erc20PermitDomainSeparator,
  getERC20,
  getERC20Permit,
  erc20IsPermit,
} from "./erc20/reads.js";

export {
  createERC20,
  createERC20Permit,
  createERC20PermitDataFromString,
  createERC20PermitDataFromRaw,
  createERC20PermitDataFromFraction,
  PermitType,
  erc20PermitTypedDataHash,
} from "./erc20/utils.js";

export {
  erc20Transfer,
  erc20Approve,
  erc20TransferFrom,
  erc20Permit,
  erc20SignPermit,
} from "./erc20/writes.js";

// ERC721

export {
  erc721Name,
  erc721Symbol,
  erc721TokenURI,
  erc721GetApproved,
  erc721IsApprovedForAll,
  erc721OwnerOf,
  erc721BalanceOf,
  erc721SupportsInterface,
  getERC721,
  erc721Data,
  erc721IDData,
} from "./erc721/reads.js";

export {
  createERC721,
  createERC721Data,
  createERC721IDData,
} from "./erc721/utils.js";

export {
  erc721Transfer,
  erc721Approve,
  erc721SetApprovalForAll,
} from "./erc721/writes.js";

// ERC1155

export {
  erc1155IsApprovedForAll,
  erc1155URI,
  erc1155BalanceOf,
  getERC1155,
} from "./erc1155/reads.js";

export { createERC1155, createERC1155Data } from "./erc1155/utils.js";

export {
  erc1155SetApprovalForAll,
  erc1155Transfer,
  erc1155TransferBatch,
} from "./erc1155/writes.js";

// NATIVE

export { nativeBalance } from "./native/reads.js";

export { createNativeCurrency } from "./native/utils.js";

// WETH

export { createWETH } from "./weth/utils.js";

export { wethDeposit, wethWithdraw } from "./weth/writes.js";

// UTILS

export { readAndParse } from "./readUtils.js";

// AMOUNT

export {
  type Amount,
  isAmount,
  createAmountFromString,
  createAmountFromFraction,
  createAmountFromRaw,
  amountAdd,
  amountSubtract,
  amountMultiply,
  amountDivide,
  amountLessThan,
  amountEqualTo,
  amountGreaterThan,
  amountToNumber,
} from "./amountUtils.js";

// FRACTION

export {
  isFraction,
  createFraction,
  fractionQuotient,
  fractionRemainder,
  fractionInvert,
  fractionAdd,
  fractionSubtract,
  fractionMultiply,
  fractionDivide,
  fractionLessThan,
  fractionEqualTo,
  fractionGreaterThan,
  fractionToNumber,
} from "./fractionUtils.js";

// PRICE

export {
  isPrice,
  createPriceFromFraction,
  createPriceFromAmounts,
  createPrice,
  priceInvert,
  priceAdd,
  priceSubtract,
  priceMultiply,
  priceDivide,
  priceLessThan,
  priceEqualTo,
  priceGreaterThan,
  priceQuote,
  rawPrice,
  adjustedPrice,
  priceToNumber,
} from "./priceUtils.js";

// ABI

export {
  solmateErc20ABI as erc20ABI,
  solmateErc721ABI as erc721ABI,
  solmateErc1155ABI as erc1155ABI,
  weth9ABI,
} from "./generated.js";

// TYPES

export type {
  BaseERC20,
  ERC20,
  ERC20Permit,
  ERC20Data,
  ERC20Amount,
  ERC20PermitData,
} from "./erc20/types.js";

export type { ERC721, ERC721IDData, ERC721Data } from "./erc721/types.js";

export type { ERC1155, ERC1155Data } from "./erc1155/types.js";

export type {
  NativeCurrency,
  NativeCurrencyAmount,
  NativeCurrencyData,
} from "./native/types.js";

export type { WETH } from "./weth/types.js";

export type {
  BigIntIsh,
  Fraction,
  Token,
  TokenData,
  Price,
  ReverseMirageRead,
  ReverseMirageWrite,
  Tuple,
} from "./types.js";

// CONSTANTS

export {
  type ChainTokens,
  mainnetTokens,
  sepoliaTokens,
  goerliTokens,
  optimismTokens,
  optimismGoerliTokens,
  arbitrumTokens,
  arbitrumGoerliTokens,
  baseTokens,
  baseGoerliTokens,
  celoTokens,
  celoAlfajoresTokens,
  foundryTokens,
} from "./constants.js";
