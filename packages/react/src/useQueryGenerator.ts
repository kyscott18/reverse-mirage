import type { ReverseMirageRead } from "reverse-mirage";
import { type PublicClient, useChainId, usePublicClient } from "wagmi";

export const getQueryKey = <TArgs extends object>(
  // rome-ignore lint/suspicious/noExplicitAny: dont need
  get: (publicClient: any, args: TArgs) => any,
  args: Partial<TArgs>,
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

export const useQueryGenerator = <TArgs extends object, TRet, TParse>(
  reverseMirage: (
    publicClient: PublicClient,
    args: TArgs,
  ) => ReverseMirageRead<TRet, TParse>,
) => {
  const publicClient = usePublicClient();
  const chainID = useChainId();

  return (args: Partial<TArgs>) =>
    ({
      queryKey: getQueryKey(reverseMirage, args, chainID),
      queryFn: () => reverseMirage(publicClient, args as TArgs).read(),
      select: (data: TRet) =>
        reverseMirage(publicClient, args as TArgs).parse(data),
      enabled: !Object.keys(args).some(
        (key) => args[key as keyof Partial<TArgs>] === undefined,
      ),
    }) as const;
};
