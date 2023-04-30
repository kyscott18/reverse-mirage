import { Address, getAddress } from 'viem'
import { erc20ABI } from './abi/erc20'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'

export const balanceOfMirage = <TToken extends Token>(
  token: TToken,
  address: Address,
) =>
  ({
    functionName: 'balanceOf',
    abi: erc20ABI,
    address: getAddress(token.address),
    args: [address],
    parse: (val: bigint) => CurrencyAmount.fromRawAmount(token, val.toString()),
  }) as const
