/**
 * Return a query key for a specific `get` action and its arguments
 * @description Used specifically for frontend data collection
 * @see https://tanstack.com/query/v4/docs/react/guides/query-keys
 */
export const getQueryKey = <TArgs>(
  get:
    | ((
        // biome-ignore lint/suspicious/noExplicitAny: dont need
        client: any,
        args: TArgs,
      ) => unknown)
    | ((args: TArgs) => unknown),
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
