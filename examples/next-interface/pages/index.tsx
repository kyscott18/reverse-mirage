import AsyncButton from "@/components/asyncButton";
import ConnectButton from "@/components/connectButton";
import TokenAmountRow from "@/components/tokenAmountRow";
import { useEnvironment } from "@/contexts/environment";
import { useBalance } from "@/hooks/useBalance";
import { useSetup } from "@/hooks/useSetup";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const setupMutation = useSetup();

  useEffect(() => {
    setupMutation.mutate();
  }, []);

  const { isConnected, address } = useAccount();
  const { id, token } = useEnvironment();
  const balanceQuery = useBalance(token, address);

  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center w-full font-mono px-3"
      }
    >
      <div className="w-full max-w-md flex flex-col border-8 border-gray-200 rounded-xl bg-white p-4 gap-4">
        <div className="w-full flex gap-1 justify-between">
          <ConnectButton />
          <AsyncButton
            className="w-4"
            onClick={() => {
              setupMutation.mutateAsync();
            }}
            disabled={id === undefined}
          >
            R
          </AsyncButton>
        </div>
        {isConnected && (
          <>
            <div className=" w-full border-b-2 border-gray-200" />
            {token ? (
              <TokenAmountRow erc20={token} erc20AmountQuery={balanceQuery} />
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
