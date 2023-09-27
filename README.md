# Reverse Mirage [![GitHub Actions][gha-badge]][gha] [![npm version][npm-badge]][npm]

[gha]: https://github.com/kyscott18/reverse-mirage/actions
[gha-badge]: https://github.com/kyscott18/reverse-mirage/actions/workflows/main.yml/badge.svg
[npm]: https://www.npmjs.com/package/reverse-mirage/v/latest
[npm-badge]: https://img.shields.io/npm/v/reverse-mirage/latest.svg

Building blocks for Ethereum app development. Built using [Viem](https://viem.sh).

## Features

- ✅ 10x-100x faster, 10.4x smaller than [`@uniswap/sdk-core`](https://github.com/uniswap/sdk-core)
- ✅ Abstactions for most commonly used token standards
- ✅ Supports `permit`
- ✅ Extensible to build apps and libraries
- ✅ Seamless extension to [Viem](https://github.com/wagmi-dev/viem)
- ✅ TypeScript ready
- ✅ Test suite running against local Ethereum network

## Example

```ts
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
  id: mainnet.id
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

## Installation

```sh
$ npm i reverse-mirage
```

## Benchmarks

Benchmarks are done with [mitata](https://github.com/evanwashere/mitata). To reproduce: 

```sh
$ cd packages/core/
$ bun run src/amount/utils.bench.ts
```

### Results

* amount add: `reverse mirage` **8.17x** faster than `@uniswap/sdk-core`
* amount equal to: `reverse-mirage` **10.63x** faster than `@uniswap/sdk-core`
* amount to number: `reverse-mirage` **136.14x** faster than `@uniswap/sdk-core`
* amount to significant: `reverse-mirage` **30.03x** faster than `@uniswap/sdk-core`

## Bundle Size

`reverse-mirage`: **5.12 kB**

`@uniswap/sdk-core`: **53.4 kB**
