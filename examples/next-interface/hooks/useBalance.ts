import { useQuery } from "@tanstack/react-query";
import { type ERC20, erc20BalanceOf, getQueryKey } from "reverse-mirage";
import { type Address, usePublicClient } from "wagmi";
import type { HookArg } from "./internal/types";
import { userRefectchInterval } from "./internal/utils";
import { useChainID } from "./useChain";

export const useBalance = <TERC20 extends ERC20>(
  erc20: HookArg<TERC20>,
  address: HookArg<Address>,
) => {
  const publicClient = usePublicClient();
  const chainID = useChainID();

  return useQuery({
    queryKey: getQueryKey(
      erc20BalanceOf,
      { erc20: erc20!, address: address! },
      chainID,
    ),
    enabled: [erc20, address].some((a) => a === undefined) ? false : true,
    queryFn: () =>
      erc20BalanceOf({
        args: { erc20: erc20!, address: address! },
      }).read(publicClient),
    select: (data) =>
      erc20BalanceOf({
        args: { erc20: erc20!, address: address! },
      }).parse(data),
    staleTime: Infinity,
    refetchInterval: userRefectchInterval,
  });
};
