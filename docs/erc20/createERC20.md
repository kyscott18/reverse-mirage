---
head:
  - - meta
    - property: og:title
      content: createERC20
  - - meta
    - name: description
      content: Create an erc20.
  - - meta
    - property: og:description
      content: Creates an erc20.

---

# createERC20

Creates an `erc20`.

## Usage

::: code-group

```ts [example.ts]
import { createERC20 } from 'reverse-mirage'

const usdc = createERC20({ // [!code focus:7]
  address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  chainID: 1,
})
```

:::

## Returns

`erc20`

The erc20 token that was just created.
