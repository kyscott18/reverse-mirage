import { createNativeCurrency } from "../native/utils.js";
import { createWETH } from "../weth/utils.js";
import type { ChainTokens } from "./index.js";

export const goerliTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 5),
  weth: createWETH(
    "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    "Wrapped Ether",
    "WETH",
    18,
    5,
    1036651n,
  ),
} as const satisfies ChainTokens;
