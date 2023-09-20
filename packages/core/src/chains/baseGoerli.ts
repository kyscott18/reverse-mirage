import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const baseGoerliTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 84531),
  weth: createWETH(
    "0x4200000000000000000000000000000000000006",
    "Wrapped Ether",
    "WETH",
    18,
    84531,
  ),
} as const satisfies ChainTokens;
