export {
  MaxUint256,
  MaxUint128,
  MaxUint64,
  MaxUint32,
  MaxUint16,
  MaxUint8,
} from "./constants.js";

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
} from "./amountUtils.js";

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
} from "./fractionUtils.js";

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
} from "./priceUtils.js";

export { readAndParse } from "./readUtils.js";

export {
  erc20BalanceOf,
  erc20Allowance,
  erc20TotalSupply,
  erc20Name,
  erc20Symbol,
  erc20Decimals,
  erc20GetToken,
} from "./erc20/reads.js";

export { createErc20 } from "./erc20/utils.js";

export {
  erc20Transfer,
  erc20Approve,
  erc20TransferFrom,
} from "./erc20/writes.js";

export type { ERC20, ERC20Amount } from "./erc20/types.js";

export { nativeBalance } from "./native/reads.js";

export { createNativeCurrency } from "./native/utils.js";

export type { NativeCurrency, NativeCurrencyAmount } from "./native/types.js";

export type {
  BigIntIsh,
  Fraction,
  Token,
  TokenData,
  Price,
  ReverseMirageRead,
  ReverseMirageWrite,
} from "./types.js";
