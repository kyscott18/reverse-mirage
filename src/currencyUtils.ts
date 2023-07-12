import { Currency, NativeCurrency, Token } from "./types.js";
import invariant from "tiny-invariant";

export const isToken = (a: Currency): a is Token => "address" in a;

export const isNativeCurrency = (a: Currency): a is NativeCurrency =>
  !("address" in a);

export const currencyEqualTo = (a: Currency, b: Currency): boolean => {
  if (isToken(a) !== isToken(b)) return false;
  if (a.chainID !== b.chainID) return false;
  if (a.decimals !== b.decimals) return false;
  if (isToken(a) && isToken(b)) {
    if (a.address.toLowerCase() !== b.address.toLowerCase()) return false;
  }

  return true;
};

export const currencySortsBefore = (a: Token, b: Token): boolean => {
  invariant(a.chainID === b.chainID, "chain mismatch");
  const aAddress = a.address.toLowerCase();
  const bAddress = b.address.toLowerCase();
  invariant(aAddress !== bAddress, "addresses equal");

  return aAddress < bAddress;
};
