export type ReverseMirage<
  TRet,
  TParse,
  T extends "select" | undefined,
> = undefined extends T ? Promise<TParse> : ReverseMirageRead<TRet, TParse>;

export type ReverseMirageRead<TRet, TParse> = {
  read: () => Promise<TRet>;
  parse: (data: TRet) => TParse;
};
