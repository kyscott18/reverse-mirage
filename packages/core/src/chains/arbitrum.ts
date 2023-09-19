import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const arbitrumTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 42161),
  weth: createWETH(
    "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    "Wrapped Ether",
    "WETH",
    18,
    42161,
    55n,
  ),
} as const satisfies ChainTokens;
