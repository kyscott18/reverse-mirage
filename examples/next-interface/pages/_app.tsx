import { ALICE } from "@/constants";
import { EnvironmentProvider } from "@/contexts/environment";
import "@/styles/globals.css";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { http, createTestClient, createWalletClient } from "viem";
import { WagmiProvider, createConfig } from "wagmi";
import { foundry } from "wagmi/chains";

export const testClient = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: foundry,
  transport: http(),
  account: ALICE,
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

const config = createConfig({
  chains: [foundry],
  transports: {
    [foundry.id]: http(),
  },
  ssr: true,
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RainbowKitProvider
          modalSize="compact"
          theme={lightTheme({ borderRadius: "medium" })}
          initialChain={foundry}
          coolMode
        >
          <EnvironmentProvider>
            <Component {...pageProps} />;
            <Toaster
              toastOptions={{
                style: {
                  width: "310px",
                },
              }}
            />
          </EnvironmentProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
