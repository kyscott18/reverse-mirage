import { chains } from "@/pages/_app";
import { useChainId } from "wagmi";

export type SupportedChainIDs = typeof chains[number]["id"];

export const useChainID = (): SupportedChainIDs => {
  const chainNumber = useChainId();
  return chainNumber as SupportedChainIDs;
};
