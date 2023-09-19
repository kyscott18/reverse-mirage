import type { PublicClient } from "viem";
import type { ReverseMirageRead } from "./types.js";

export const createReverseMirage: <TRet, TParse, TArgs>(
  rm: (args: TArgs) => ReverseMirageRead<TRet, TParse>,
) => <TA extends { args: TArgs; publicClient?: PublicClient }>(
  a: TA,
) => TA extends { publicClient: PublicClient }
  ? Promise<ReturnType<ReturnType<typeof rm>["parse"]>>
  : ReturnType<typeof rm> = (rm) => (a) => {
  return (
    "publicClient" in a
      ? rm(a.args)
          .read(a.publicClient)
          .then((x) => rm(a.args).parse(x))
      : rm(a.args)
  ) as typeof a extends { publicClient: PublicClient }
    ? Promise<ReturnType<ReturnType<typeof rm>["parse"]>>
    : ReturnType<typeof rm>;
};

export const getQueryKey = <TArgs>(
  // biome-ignore lint/suspicious/noExplicitAny: dont need
  get: (a: { args: TArgs }) => ReverseMirageRead<any, any>,
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
