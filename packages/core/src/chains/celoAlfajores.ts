import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const celoAlfajoresTokens = {
  native: createNativeCurrency("Celo Native Asset", "CELO", 18, 44_787),
  weth: createWETH(
    "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
    "Celo Native Asset",
    "CELO",
    18,
    44_787,
  ),
} as const satisfies ChainTokens;
