import type { NativeCurrency } from "./native/types.js";
import { createNativeCurrency } from "./native/utils.js";
import type { WETH } from "./weth/types.js";
import { createWETH } from "./weth/utils.js";

export type ChainTokens = { native: NativeCurrency; weth?: WETH };

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

export const sepoliaTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 11155111),
} as const satisfies ChainTokens;

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

export const optimismTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 10),
  weth: createWETH(
    "0x4200000000000000000000000000000000000006",
    "Wrapped Ether",
    "WETH",
    18,
    10,
  ),
} as const satisfies ChainTokens;

export const optimismGoerliTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 420),
} as const satisfies ChainTokens;

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

export const arbitrumGoerliTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 421_613),
} as const satisfies ChainTokens;

export const baseTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 8453),
  weth: createWETH(
    "0x4200000000000000000000000000000000000006",
    "Wrapped Ether",
    "WETH",
    18,
    8453,
  ),
} as const satisfies ChainTokens;

export const baseGoerliTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 84531),
} as const satisfies ChainTokens;

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

export const foundryTokens = {
  native: createNativeCurrency("Ether", "ETH", 18, 31_337),
} as const satisfies ChainTokens;
