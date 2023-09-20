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
