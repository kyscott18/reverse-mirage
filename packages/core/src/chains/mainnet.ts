import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const mainnetTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 1),
  weth: createWETH(
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "Wrapped Ether",
    "WETH",
    18,
    1,
    4719568n,
  ),
} as const satisfies ChainTokens;
