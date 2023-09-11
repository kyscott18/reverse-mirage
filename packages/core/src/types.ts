import type { Abi, Hash, SimulateContractReturnType } from "viem";

export type BigIntIsh = bigint | string | number;

export type Fraction = {
  type: "fraction";
  numerator: bigint;
  denominator: bigint;
};

export type Token<TType extends string = string> = {
  type: TType;
  name: string;
  symbol: string;
  chainID: number;
};

export type TokenData<
  TToken extends Token = Token,
  TType extends `${TToken["type"]}${string}` = `${TToken["type"]}${string}`,
  TData extends object = object,
> = {
  type: TType;
  token: TToken;
} & TData;

export type Price<
  TQuoteCurrency extends Token,
  TBaseCurrency extends Token,
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
