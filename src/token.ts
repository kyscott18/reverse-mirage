import { Address, getAddress } from 'viem'
import { erc20ABI } from './abi/erc20'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { ReverseMirage } from './types'

export const balanceOfMirage = <TToken extends Token>(
  token: TToken,
  address: Address,
) =>
  ({
    contractConfig: {
      functionName: 'balanceOf',
      abi: erc20ABI,
      address: getAddress(token.address),
      args: [address],
    },
    parse: (val) => CurrencyAmount.fromRawAmount(token, val.toString()),
  }) as const satisfies ReverseMirage<typeof erc20ABI, 'balanceOf'>
