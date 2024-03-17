import { createNativeCurrency } from "../native/utils.js";
import type { ChainTokens } from "./index.js";

export const foundryTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 31_337),
} as const satisfies ChainTokens;
