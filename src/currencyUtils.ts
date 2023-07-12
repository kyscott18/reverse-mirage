import { Currency, Token } from "./types.js";
import invariant from "tiny-invariant";

export const equalTo = (a: Currency, b: Currency): boolean => {
  return a === b;
};

export const sort = (a: Token, b: Token): readonly [Token, Token] => {
  invariant(a.chainID === b.chainID, "chain mismatch");
  const aAddress = a.address.toLowerCase();
  const bAddress = b.address.toLowerCase();
  invariant(aAddress !== bAddress, "addresses equal");

  return aAddress < bAddress ? [a, b] : [b, a];
};

// TODO: export const wrapped
