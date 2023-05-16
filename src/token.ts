import { Address, Chain, PublicClient, Transport, getAddress } from 'viem'
import { erc20ABI } from './abi/erc20'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { ReverseMirage } from './types'
import { readReverseMirages } from '.'

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

export const totalSupplyMirage = <TToken extends Token>(token: TToken) =>
  ({
    contractConfig: {
      functionName: 'totalSupply',
      abi: erc20ABI,
      address: getAddress(token.address),
    },
    parse: (val) => CurrencyAmount.fromRawAmount(token, val.toString()),
  }) as const satisfies ReverseMirage<typeof erc20ABI, 'totalSupply'>

export const nameMirage = <TToken extends Token>(
  token: Pick<TToken, 'address'>,
) =>
  ({
    contractConfig: {
      functionName: 'name',
      abi: erc20ABI,
      address: getAddress(token.address),
    },
    parse: (val) => val,
  }) as const satisfies ReverseMirage<typeof erc20ABI, 'name'>

export const decimalsMirage = <TToken extends Token>(
  token: Pick<TToken, 'address'>,
) =>
  ({
    contractConfig: {
      functionName: 'decimals',
      abi: erc20ABI,
      address: getAddress(token.address),
    },
    parse: (val) => val,
  }) as const satisfies ReverseMirage<typeof erc20ABI, 'decimals'>

export const symbolMirage = <TToken extends Token>(
  token: Pick<TToken, 'address'>,
) =>
  ({
    contractConfig: {
      functionName: 'symbol',
      abi: erc20ABI,
      address: getAddress(token.address),
    },
    parse: (val) => val,
  }) as const satisfies ReverseMirage<typeof erc20ABI, 'symbol'>

export const getToken = async <
  TChain extends Chain | undefined,
  TToken extends Token,
>(
  client: PublicClient<Transport, TChain>,
  token: Pick<TToken, 'address' | 'chainId'>,
): Promise<Token> => {
  const data = await readReverseMirages(client, {
    contractConfig: {
      allowFailure: false,
      contracts: [
        nameMirage(token).contractConfig,
        symbolMirage(token).contractConfig,
        decimalsMirage(token).contractConfig,
      ],
    },
    parse: [
      nameMirage(token).parse,
      symbolMirage(token).parse,
      decimalsMirage(token).parse,
    ],
  })

  return new Token(token.chainId, token.address, data[2], data[1], data[0])
}
