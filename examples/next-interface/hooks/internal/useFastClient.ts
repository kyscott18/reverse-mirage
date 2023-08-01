import { usePublicClient, useWebSocketPublicClient } from "wagmi";

// use web socket client if it is available for time sensitive actions
export const useFastClient = () => {
  const webSocketPublicClient = useWebSocketPublicClient();
  const publicClient = usePublicClient();

  return webSocketPublicClient ?? publicClient;
};
