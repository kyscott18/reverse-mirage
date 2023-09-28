# Getting Started

## Overview

`reverse-mirage` is a set of TypeScript utilities that provide low-level building blocks for Ethereum app development. `reverse-mirage` is focued on developer experience, stability, bundle size, and performance:

- **Developer experience** Automatic type safety and inference, comprehensive documentation, expressive types.
- **Stability** Test suite runs against local Ethereum networks, near complete test coverage.
- **Bundle size** Tree-shakable and lightweight.
- **Performance** Optimized arithmetic functions, decoding, and parsing all taking advantage of modern javascript.

`reverse-mirage` relies heavily on [`viem`](https://viem.sh). All users should be familiar with this package before continuing.

## Types

### Tokens

Tokens represent an asset on Ethereum. Tokens by themselves don't hold any specific state, but can be used to read from Ethereum or send a transaction. Currently `reverse-mirage` has:

- **ERC20**: Fungible tokens
- **ERC721**: Non-fungible tokens
- **ERC1155**: Semi-fungible tokens
- **Native**: Native currency i.e. Ether
- **WETH**: ERC20 wrapped native currency

### Convenience

Convenience types help make it easier to use Ethereum in TypeScript. This includes:

- **Amount**: Token amounts with support for decimals
- **Price**: Exchange rates between tokens with support for decimals

## Utilities

There are many functions for creating certain types.

::: code-group

```ts [create.ts]
import { mainnet } from 'viem/chains'
import {
  createNativeCurrency,
  createAmountFromString,
  createAmountFromRaw,
  } from 'reverse-mirage'
// [!code focus:5]
const eth = createNativeCurrency('Ether', 'ETH', 18, mainnet.id)

createAmountFromString(eth, '15')
createAmountFromRaw(1000000000000000000n)

```

:::

### Convenience Utilities

Convenience types also contain certain arithmetic and decoding functions.

::: code-group

```ts [amounts.ts]
import { mainnet } from 'viem/chains'
import {
  createNativeCurrency,
  createAmountFromString,
  amountAdd,
  amountMultiply,
  amountEqual,
  amountToNumber,
  } from 'reverse-mirage'
// [!code focus:9]
const eth = createNativeCurrency('Ether', 'ETH', 18, mainnet.id)
const amount = createAmountFromString(eth, '15')

const a = amountAdd(amount, amount)
const b = amountMultiply(amount, 2)

console.log(amountEqual(a, b)) // true
console.log(amountToNumber(a)) // 30

```

:::

## Read actions

Read actions are used to read data from Ethereum. There are many functions for each token type.

::: code-group

```ts [read.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { publicActionsReverseMirage, amountToNumber } from 'reverse-mirage'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsReverseMirage)
// [!code focus:12]
// read token metadata
const usdc = await publicClient.getERC20({
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // usdc
  id: mainnet.id,
})

// read a balance
const vitalikBalance = await publicClient.getERC20Balance({
  erc20: usdc,
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik
})

```

:::

## Write actions

Write actions are used to prepare a transaction for Ethereum. Each token type has its own set of write actions.

::: code-group

```ts [read.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { publicActionsReverseMirage, amountToNumber } from 'reverse-mirage'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsReverseMirage)
// [!code focus:13]
const usdc = await publicClient.getERC20({
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // usdc
  id: mainnet.id
})

// send usdc
const { request } = await publicClient.simulateERC20Transfer({
  args: { 
    amount: createAmountFromString(usdc, '5'),
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik
  },
})

```

:::

## Extras

### Chains

Known tokens are also exported for popular chains.

::: code-group

```ts [chains.ts]
import { celoTokens } from 'reverse-mirage'
// [!code focus:3]
console.log(celoTokens.native.decimals) // 18
console.log(celoTokens.weth.address) // 0x471E...a438

```

:::

`native` and `weth` are exported for:

- **mainnet**
- **goerli**
- **sepolia**
- **celo**
- **celoAlfajores**
- **optimism**
- **optimismGoerli**
- **base**
- **baseGoerli**
- **arbitrum**
- **arbitrumGoerli**

### ABIs

`erc20`, `erc721`, `erc1155`, and `weth` all have a corresponding exported Abi.
