# `reverse-mirage`

## Overview

Building blocks for Ethereum app development. Built using [Viem](https://viem.sh).

::: warning
This documentation is still under active development.
:::

## Features

- ✅ 10x-100x faster, 10.4x smaller than [`@uniswap/sdk-core`](https://github.com/uniswap/sdk-core)
- ✅ Abstactions for most commonly used token standards
- ✅ Extensible to build apps and libraries
- ✅ Seamless extension to [Viem](https://github.com/wagmi-dev/viem)
- ✅ Supports `permit`
- ✅ TypeScript ready
- ✅ Test suite running against local Ethereum network

## Example

::: code-group

```ts [example.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { publicActionsReverseMirage, amountToNumber } from 'reverse-mirage'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsReverseMirage)

// read token metadata
const usdc = await publicClient.getERC20({
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // usdc
  id: mainnet.id,
})

console.log(usdc.decimals) // 6
console.log(usdc.name) // USD Coin

// read a balance
const vitalikBalance = await publicClient.getERC20Balance({
  erc20: usdc,
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' // vitalik
})

console.log(vitalikBalance.amount) // 420690000n
console.log(amountToNumber(vitalikBalance)) // 420.69
```

:::

## Installation

::: code-group

```bash [npm]
npm i reverse-mirage
```

```bash [pnpm]
pnpm i reverse-mirage
```

```bash [bun]
bun i reverse-mirage
```

:::
