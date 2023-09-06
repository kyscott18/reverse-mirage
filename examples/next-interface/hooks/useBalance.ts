import { useQuery } from "@tanstack/react-query";
import { type ERC20, erc20BalanceOf } from "reverse-mirage";
import { useQueryGenerator } from "reverse-mirage-react";
import type { Address } from "wagmi";
import type { HookArg } from "./internal/types";
import { userRefectchInterval } from "./internal/utils";

export const useBalance = <TERC20 extends ERC20>(
  erc20: HookArg<TERC20>,
  address: HookArg<Address>,
) => {
  const balanceOfQuery = useQueryGenerator(erc20BalanceOf);

  return useQuery({
    ...balanceOfQuery({ erc20, address }),
    staleTime: Infinity,
    refetchInterval: userRefectchInterval,
  });
};
