import type { PublicClient } from "viem";
import type { ReverseMirageRead } from "./types.js";

export const createReverseMirage: <TRet, TParse, TArgs>(
  rm: (args: TArgs) => ReverseMirageRead<TRet, TParse>,
) => <
  TA extends { args: TArgs } & (
    | { type: "split" }
    | { publicClient: PublicClient }
  ),
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

export const getQueryKey = <TArgs>(
  // biome-ignore lint/suspicious/noExplicitAny: dont need
  get: (a: { args: TArgs; type: "split" }) => ReverseMirageRead<any, any>,
  args: TArgs,
  chainID: number,
) => {
  return [
    {
      chainID,
      read: {
        name: get.name,
        args,
      },
    },
  ] as const;
};
