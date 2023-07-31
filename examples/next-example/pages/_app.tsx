// import { EnvironmentProvider } from "@/contexts/environment";
import "@/styles/globals.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { goerli, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, goerli],
  [
    // alchemyProvider({ apiKey: process.env.SEPOLIA_ALCHEMY_KEY! }),
    publicProvider(),
  ],
  { pollingInterval: 1000 },
);

export { chains };

const { connectors } = getDefaultWallets({
  appName: "web3",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RainbowKitProvider
          modalSize="compact"
          theme={lightTheme({ borderRadius: "medium" })}
          coolMode
          chains={chains}
        >
          {/* <EnvironmentProvider> */}
          <Component {...pageProps} />;
          <Toaster
            toastOptions={{
              style: {
                width: "310px",
              },
            }}
          />
          {/* </EnvironmentProvider> */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
