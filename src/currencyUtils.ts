import type { Currency, NativeCurrency, Token } from "./types.js";
import invariant from "tiny-invariant";

export const isToken = (a: Currency): a is Token => a.type === "token";

export const isNativeCurrency = (a: Currency): a is NativeCurrency =>
  a.type === "nativeCurrency";

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

export const currencySortsBefore = (a: Token, b: Token): boolean => {
  invariant(a.chainID === b.chainID, "chain mismatch");
  const aAddress = a.address.toLowerCase();
  const bAddress = b.address.toLowerCase();
  invariant(aAddress !== bAddress, "addresses equal");

  return aAddress < bAddress;
};
