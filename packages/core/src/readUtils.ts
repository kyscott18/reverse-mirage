import type { PublicClient } from "viem";
import type { ReverseMirageRead } from "./types.js";

/**
 * Read data using a json-rpc request and parse the returned data
 */
export const readAndParse = async <TRet, TParse>(
  publicClient: PublicClient,
  reverseMirageRead: ReverseMirageRead<TRet, TParse>,
) => {
  return reverseMirageRead.parse(await reverseMirageRead.read(publicClient));
};

export const createReverseMirage: <TRet, TParse, TArgs>(
  rm: (args: TArgs) => ReverseMirageRead<TRet, TParse>,
) => <
  TA extends
    | { args: TArgs; type: "split" }
    | { args: TArgs; publicClient: PublicClient },
>(a: TA) => TA extends {
  type: "split";
}
  ? ReverseMirageRead<TRet, TParse>
  : Promise<TParse> = (rm) => (a) => {
  return (
    "type" in a
      ? rm(a.args)
      : rm(a.args)
          .read(a.publicClient)
          .then((x) => rm(a.args).parse(x))
  ) as typeof a extends { type: "split" }
    ? ReturnType<typeof rm>
    : Promise<ReturnType<ReturnType<typeof rm>["parse"]>>;
};
