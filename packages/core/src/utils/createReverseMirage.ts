import type { Chain, Client, Transport } from "viem";
import type { ReverseMirageRead } from "../types/rm.js";

/**
 * Helper function for creating a wrapped contract read and parsing function
 */
export const createReverseMirage: <
  TRet,
  TParse,
  TArgs,
  TChain extends Chain | undefined,
>(
  rm: (args: TArgs) => ReverseMirageRead<TRet, TParse, TChain>,
) => <TA extends { args: TArgs; client?: Client<Transport, TChain> }>(
  a: TA,
) => TA extends { client: Client }
  ? Promise<ReturnType<ReturnType<typeof rm>["parse"]>>
  : ReturnType<typeof rm> = (rm) => (a) => {
  return (
    "client" in a
      ? rm(a.args)
          .read(a.client)
          .then((x) => rm(a.args).parse(x))
      : rm(a.args)
  ) as typeof a extends { client: Client }
    ? Promise<ReturnType<ReturnType<typeof rm>["parse"]>>
    : ReturnType<typeof rm>;
};
