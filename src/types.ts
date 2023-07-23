import type { Abi, Address, Hash, SimulateContractReturnType } from "viem";

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

export type TokenData<TToken extends Token<string>, TData extends object> = {
  type: `${TToken["type"]}${string}`;
  token: TToken;
} & TData;

export type NativeCurrency = Token<"nativeCurrency"> & {
  decimals: number;
};

export type ERC20 = Token<"erc20"> & {
  address: Address;
  decimals: number;
};

// export type ERC1155 = Omit<Token, "type"> & {
//   type: "erc1155";
//   address: Address;
//   id: Hex;
//   decimals: number;
// };

export type NativeCurrencyAmount<TNativeCurrency extends NativeCurrency> =
  TokenData<TNativeCurrency, { amount: bigint }>;

export type ERC20Amount<TERC20 extends ERC20> = TokenData<
  TERC20,
  { amount: bigint }
>;

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
