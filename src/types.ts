import type { Abi, Address, Hash, SimulateContractReturnType } from "viem";

export type Fraction = {
  type: "fraction";
  numerator: bigint;
  denominator: bigint;
};

export type BigIntIsh = bigint | string | number;

export type NativeCurrency = {
  type: "nativeCurrency";
  name: string;
  symbol: string;
  decimals: number;
  chainID: number;
};

export type Token = Omit<NativeCurrency, "type"> & {
  type: "token";
  address: Address;
};

export type Currency = NativeCurrency | Token;

export type CurrencyAmount<TCurrency extends Currency> = {
  type: "currencyAmount";
  currency: TCurrency;
  amount: bigint;
};

export type Price<
  TQuoteCurrency extends Currency,
  TBaseCurrency extends Currency,
> = Omit<Fraction, "type"> & {
  type: "price";
  quote: TQuoteCurrency;
  base: TBaseCurrency;
};

export type ReverseMirageRead<TRet = unknown, TParse = unknown> = {
  read: () => TRet | Promise<TRet>;
  parse: (data: TRet) => TParse;
};

export type ReverseMirageWrite<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = Promise<{
  hash: Hash;
  request: SimulateContractReturnType<TAbi, TFunctionName>["request"];
  result: SimulateContractReturnType<TAbi, TFunctionName>["result"];
}>;
