import type { HookArg } from "./internal/types";
import { useFastClient } from "./internal/useFastClient";
import { type BeetStage, type TxToast, toaster } from "@/components/beet";
import type { ERC20 } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  type ERC20Amount,
  erc20BalanceOf,
  erc20Transfer,
} from "reverse-mirage";
import { useQueryGenerator } from "reverse-mirage-react";
import { getAddress } from "viem";
import { type Address, useWalletClient } from "wagmi";

export const useTransfer = (
  amount: HookArg<ERC20Amount<ERC20>>,
  to: HookArg<Address>,
) => {
  const queryClient = useQueryClient();
  const balanceOfQuery = useQueryGenerator(erc20BalanceOf);
  const client = useFastClient();
  const walletClient = useWalletClient();

  const title = "Transfer";

  const mutate = useMutation({
    mutationFn: async ({
      amount,
      to,
      toast,
    }: {
      amount: ERC20Amount<ERC20>;
      to: Address;
    } & {
      toast: TxToast;
    }) => {
      const transfer = await erc20Transfer(
        client,
        walletClient.data!,
        walletClient.data!.account,
        {
          to,
          amount,
        },
      );
      const hash = transfer.hash;

      toaster.txPending({ ...toast, hash });

      const start = Date.now();

      const tx = await client.waitForTransactionReceipt({ hash });

      console.log(Date.now() - start);
      return tx;
    },
    onMutate: ({ toast }) => toaster.txSending(toast),
    onError: (_, { toast }) => toaster.txError(toast),
    onSuccess: async (data, input) => {
      toaster.txSuccess({ ...input.toast, receipt: data });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: balanceOfQuery({
            erc20: input.amount.token,
            address: getAddress(data.from),
          }).queryKey,
        }),
      ]);
    },
  });

  return useMemo(() => {
    if (!amount || !to || !walletClient.data)
      return { status: "error" } as const;

    return {
      status: "success",
      data: [
        {
          title,
          parallelTxs: [
            {
              title,
              description: title,
              callback: (toast: TxToast) =>
                mutate.mutateAsync({
                  amount,
                  to,
                  toast,
                }),
            },
          ],
        },
      ],
    } as const satisfies { data: readonly BeetStage[]; status: "success" };
  }, [to, amount, mutate]);
};
