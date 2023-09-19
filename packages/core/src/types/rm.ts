import type { Chain, Client, Transport } from "viem";

export type ReverseMirage<
  TRet,
  TParse,
  TArgs,
  TChain extends Chain | undefined,
  T extends { args: TArgs; client?: Client<Transport, TChain> },
> = T extends {
  client: Client<Transport, TChain>;
}
  ? Promise<TParse>
  : ReverseMirageRead<TRet, TParse, TChain>;

export type ReverseMirageRead<
  TRet,
  TParse,
  TChain extends Chain | undefined,
> = {
  read: (client: Client<Transport, TChain>) => Promise<TRet>;
  parse: (data: TRet) => TParse;
};
