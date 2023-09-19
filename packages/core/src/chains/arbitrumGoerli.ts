import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const arbitrumGoerliTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 421_613),
  weth: createWETH(
    "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    "Wrapped Ether",
    "WETH",
    18,
    421_613,
    16n,
  ),
} as const satisfies ChainTokens;
