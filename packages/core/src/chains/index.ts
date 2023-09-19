import type { NativeCurrency } from "../native/types.js";
import type { WETH } from "../weth/types.js";

export type ChainTokens = { native: NativeCurrency; weth?: WETH };

export { arbitrumTokens } from "./arbitrum.js";
export { arbitrumGoerliTokens } from "./arbitrumGoerli.js";
export { baseTokens } from "./base.js";
export { baseGoerliTokens } from "./baseGoerli.js";
export { celoTokens } from "./celo.js";
export { celoAlfajoresTokens } from "./celoAlfajores.js";
export { foundryTokens } from "./foundry.js";
export { goerliTokens } from "./goerli.js";
export { mainnetTokens } from "./mainnet.js";
export { optimismTokens } from "./optimism.js";
export { optimismGoerliTokens } from "./optimismGoerli.js";
export { sepoliaTokens } from "./sepolia.js";
