import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const sepoliaTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 11155111),
  weth: createWETH(
    "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    "Wrapped Ether",
    "WETH",
    18,
    11155111,
    3518216n,
  ),
} as const satisfies ChainTokens;
