import AsyncButton from "./asyncButton";
import { Beet } from "./beet";

import { useTransfer } from "@/hooks/useTransfer";
import { type UseQueryResult } from "@tanstack/react-query";
import {
  type ERC20,
  type ERC20Amount,
  amountLessThan,
  createAmountFromString,
} from "reverse-mirage";
import invariant from "tiny-invariant";
import TokenAmountDisplay from "./tokenAmountDisplay";
import TokenInfo from "./tokenInfo";

export default function TokenAmountRow<TERC20 extends ERC20>({
  erc20,
  erc20AmountQuery,
}: {
  erc20: TERC20;
  erc20AmountQuery: UseQueryResult<ERC20Amount<ERC20>>;
}) {
  const transferMutation = useTransfer(
    createAmountFromString(erc20, "0.5"),
    "0x59A6AbC89C158ef88d5872CaB4aC3B08474883D9",
  );

  return (
    <div className="w-full items-center justify-between flex">
      <TokenInfo erc20={erc20} size={18} />
      <div className="flex gap-2">
        {erc20AmountQuery.data ? (
          <div className="bg-gray-200 rounded-lg h-8 w-30 w-full flex flex-col items-center justify-center overflow-clip px-1">
            <TokenAmountDisplay amount={erc20AmountQuery.data} />
          </div>
        ) : (
          <div className="bg-gray-200 rounded-lg h-8 w-30 animate-pulse" />
        )}
        <AsyncButton
          className="h-8"
          disabled={
            !erc20AmountQuery.data ||
            amountLessThan(
              erc20AmountQuery.data,
              createAmountFromString(erc20, "0.001"),
            ) ||
            transferMutation.status !== "success"
          }
          onClick={async () => {
            invariant(transferMutation.status === "success");
            await Beet(transferMutation.data);
          }}
        >
          Transfer
        </AsyncButton>
      </div>
    </div>
  );
}
