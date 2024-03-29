import { useQuery } from "@tanstack/react-query";
import { type ERC20, getERC20BalanceOf } from "reverse-mirage";
import type { Address } from "viem";
import { useChainId, usePublicClient } from "wagmi";
import type { HookArg } from "./internal/types";
import { getQueryKey, userRefectchInterval } from "./internal/utils";

export const useBalance = <TERC20 extends ERC20>(
  erc20: HookArg<TERC20>,
  address: HookArg<Address>,
) => {
  const publicClient = usePublicClient();
  const chainID = useChainId();

  return useQuery({
    queryKey: getQueryKey(
      getERC20BalanceOf,
      { erc20: erc20!, address: address! },
      chainID,
    ),
    enabled: [erc20, address].some((a) => a === undefined) ? false : true,
    queryFn: () =>
      getERC20BalanceOf(publicClient, { erc20: erc20!, address: address! }),
    staleTime: Number.POSITIVE_INFINITY,
    refetchInterval: userRefectchInterval,
  });
};
