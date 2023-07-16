import type { Currency, NativeCurrency, Token } from "./types.js";
import invariant from "tiny-invariant";

/**
 * Determines if x is a token type
 */
export const isToken = (x: Currency): x is Token => x.type === "token";

/**
 * Determines if x is a native currency type
 */
export const isNativeCurrency = (x: Currency): x is NativeCurrency =>
  x.type === "nativeCurrency";

/**
 * Determines if currency a is equal to currency b
 */
export const currencyEqualTo = (a: Currency, b: Currency): boolean => {
  return (
    isToken(a) === isToken(b) &&
    a.chainID === b.chainID &&
    a.decimals === b.decimals &&
    (isToken(a)
      ? a.address.toLowerCase() === (b as Token).address.toLowerCase()
      : true)
  );
};

/**
 * Determines if the address of a is less than the address of b
 */
export const currencySortsBefore = (a: Token, b: Token): boolean => {
  invariant(a.chainID === b.chainID, "chain mismatch");
  const aAddress = a.address.toLowerCase();
  const bAddress = b.address.toLowerCase();
  invariant(aAddress !== bAddress, "addresses equal");

  return aAddress < bAddress;
};
