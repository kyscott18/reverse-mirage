# Reverse Mirage [![GitHub Actions][gha-badge]][gha] [![npm version][npm-badge]][npm] [![npm bundle size][bundle-badge]][bundle]

[gha]: https://github.com/kyscott18/reverse-mirage/actions
[gha-badge]: https://github.com/kyscott18/reverse-mirage/actions/workflows/main.yml/badge.svg
[npm]: https://www.npmjs.com/package/reverse-mirage/v/latest
[npm-badge]: https://img.shields.io/npm/v/reverse-mirage/latest.svg
[bundle]: https://bundlephobia.com/result?p=reverse-mirage@latest
[bundle-badge]:https://img.shields.io/bundlephobia/minzip/reverse-mirage/latest.svg

Application level typescript utilities for Ethereum.

## Features

- ✅ ~30x faster than `@uniswap/sdk-core`
- ✅ Abstactions for most commonly used token standards
- ✅ Supports `permit`
- ✅ Extensible to build apps and libraries
- ✅ Seamless extension to [Viem](https://github.com/wagmi-dev/viem)
- ✅ TypeScript ready
- ✅ Test suite running against [forked](https://ethereum.org/en/glossary/#fork) Ethereum network

## Example

```ts
import { createPublicClient, http } from 'viem'
import {publicActions, amountToNumber} from 'reverse-mirage'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActions)

// read token metadata
const usdc = await publicClient.getERC20({
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // usdc
})

console.log(usdc.decimals) // 6

// read a balance
const vitalikBalance = await publicClient.getERC20Balance({
  erc20: usdc,
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' // vitalik
})

console.log(amountToNumber(vitalikBalance)) // 420.69
```
