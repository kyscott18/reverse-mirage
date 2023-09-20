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
  rm: (
    client: Client<Transport, TChain>,
    args: TArgs,
  ) => ReverseMirageRead<TRet, TParse>,
) => <T extends "select" | "full">(
  client: Client<Transport, TChain>,
  args: TArgs,
  type: T,
) => T extends "full" ? Promise<TParse> : ReverseMirageRead<TRet, TParse> =
  (rm) => (client, args, type = "full") =>
    (type === "full"
      ? rm(client, args)
          .read()
          .then((x) => rm(client, args).parse(x))
      : rm(client, args)) as typeof type extends "full"
      ? Promise<ReturnType<ReturnType<typeof rm>["parse"]>>
      : ReturnType<typeof rm>;
