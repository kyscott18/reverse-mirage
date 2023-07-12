import { Address } from "viem";

export type Fraction = {
  numerator: bigint;
  denominator: bigint;
};

export type BigIntIsh = bigint | string | number;

export type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
  chainID: number;
};

export type Token = NativeCurrency & { address: Address };

export type Currency = NativeCurrency | Token;

export type CurrencyAmount<TCurrency extends Currency> = {
  currency: TCurrency;
  amount: bigint;
};

export type Price<
  TBaseCurrency extends Currency,
  TQuoteCurrency extends Currency,
> = {
  numerator: CurrencyAmount<TBaseCurrency>;
  denominator: CurrencyAmount<TQuoteCurrency>;
};

export type ReverseMirageRead<TRet = unknown, TParse = unknown> = {
  read: () => TRet | Promise<TRet>;
  parse: (data: TRet) => TParse;
};
