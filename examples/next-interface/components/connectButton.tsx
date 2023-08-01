import Button from "@/components/button";
import { ConnectButton as ConnectButtonRainbow } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function ConnectButton() {
  return (
    <ConnectButtonRainbow.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="connect"
                    className="h-10 w-full"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              return (
                <div className="w-full flex gap-1 ease-in-out transform duration-300">
                  {chain.unsupported ? (
                    <Button
                      variant="danger"
                      className="h-10"
                      onClick={openChainModal}
                    >
                      Wrong network
                    </Button>
                  ) : (
                    <button onClick={openChainModal} className="" type="button">
                      <div className="flex h-10 flex-col items-center justify-center rounded-lg bg-gray-200 px-1.5">
                        <Image
                          alt={chain.name ?? "Chain icon"}
                          src={
                            chain.iconUrl ??
                            "https://assets.coingecko.com/coins/images/11090/small/InjXBNx9_400x400.jpg?1674707499"
                          }
                          className="rounded-full"
                          width={30}
                          height={30}
                        />
                      </div>
                    </button>
                  )}
                  <button onClick={openAccountModal} type="button">
                    <div className="flex h-10 px-4 items-center space-x-2">
                      <p className="p2">{account.displayName}</p>
                      <div className="rounded-[100%] bg-secondary h-2 w-2" />
                    </div>
                  </button>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButtonRainbow.Custom>
  );
}
