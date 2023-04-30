import { Token } from '@uniswap/sdk-core'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { multicall } from 'viem/contract'
import { erc20ABI } from './abi/erc20'
import { readReverseMirages } from './index'
import { balanceOfMirage } from './token'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const token = new Token(
  mainnet.id,
  '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  18,
)

const r1 = await readReverseMirages(publicClient, {
  //  ^?
  allowFailure: false,
  contracts: [
    balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'),
  ] as const,
})

const r2 = await multicall(publicClient, {
  //  ^?
  allowFailure: false,
  contracts: [
    balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'),
  ] as const,
})
