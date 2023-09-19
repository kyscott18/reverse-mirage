import type { Abi, Hash, PublicClient, SimulateContractReturnType } from "viem";

export type BigIntIsh = bigint | string | number;

export type Fraction = {
  type: "fraction";
  numerator: bigint;
  denominator: bigint;
};

export type Token<TType extends string = string> = {
  type: TType;
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

export type ReverseMirage<TRet, TParse, TArgs> = <
  TA extends { args: TArgs } & (
    | { type: "split" }
    | { publicClient: PublicClient }
  ),
>(a: TA) => TA extends {
  type: "split";
}
  ? ReverseMirageRead<TRet, TParse>
  : Promise<TParse>;

export type ReverseMirageRead<TRet, TParse> = {
  read: (publicClient: PublicClient) => Promise<TRet>;
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

/**
 * A tuple of length `N` with elements of type `T`.
 * @see https://github.com/saber-hq/saber-common/blob/master/packages/tuple-utils/src/tuple.ts
 */
export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends T[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;
