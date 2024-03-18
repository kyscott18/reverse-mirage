import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const celoTokens = {
  native: createNativeCurrency("Celo Native Asset", "CELO", 18, 42_220),
  weth: createWETH(
    "0x471EcE3750Da237f93B8E339c536989b8978a438",
    "Celo Native Asset",
    "CELO",
    18,
    42_220,
    2919n,
  ),
} as const satisfies ChainTokens;
