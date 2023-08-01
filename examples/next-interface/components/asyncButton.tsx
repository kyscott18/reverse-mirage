import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import type { ButtonProps } from "./button";
import Button from "./button";

export default function AsyncButton(props: ButtonProps) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  return isConnected ? (
    <Button {...props} />
  ) : openConnectModal ? (
    <Button {...props} disabled={false} onClick={openConnectModal}>
      {"Connect Wallet"}
    </Button>
  ) : null;
}
