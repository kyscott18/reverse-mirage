// import ConnectButton from "@/components/connectButton";
// import CurrencyAmountRow from "@/components/currencyAmountRow";
// import { useEnvironment } from "@/contexts/environment";
// import { useBalances } from "@/hooks/useBalances";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  // const { nativeCurrency, wrappedNative } = useEnvironment();

  // const tokens = useMemo(
  //   () => [nativeCurrency, wrappedNative] as const,
  //   [nativeCurrency, wrappedNative],
  // );

  // const balanceQueries = useBalances(tokens, address);

  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center w-full font-mono px-3"
      }
    >
      <div className="w-full max-w-md flex flex-col border-2 border-gray-200 rounded-xl bg-white p-4 gap-4">
        {/* <div className="w-full flex gap-1">
          <ConnectButton />
        </div> */}
        {isConnected && (
          <>
            <div className=" w-full border-b-2 border-gray-200" />
            {/* {balanceQueries.map((b, i) => (
              <CurrencyAmountRow
                key={tokens[i]?.name}
                currency={tokens[i]!}
                currencyAmountQuery={b}
              />
            ))} */}
          </>
        )}
      </div>
    </main>
  );
}
