import type { Token, TokenData } from "../types/token.js";

export type Amount<
  TToken extends Token & { decimals?: number } = Token & { decimals?: number },
  TType extends `${TToken["type"]}${string}` = `${TToken["type"]}${string}`,
  TData extends { amount: bigint } = { amount: bigint },
> = TokenData<TToken, TType, TData>;
