import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const optimismGoerliTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 420),
  weth: createWETH(
    "0x4200000000000000000000000000000000000006",
    "Wrapped Ether",
    "WETH",
    18,
    420,
  ),
} as const satisfies ChainTokens;
