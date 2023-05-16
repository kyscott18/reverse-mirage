import { Token } from '@uniswap/sdk-core'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { readContract } from 'viem/contract'
import { readReverseMirage } from './index'
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

const r1 = await readReverseMirage(
  //  ^?
  publicClient,
  balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
    .contractConfig,
  balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2').parse,
)

const r2 = await readContract(
  //  ^?
  publicClient,
  balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
    .contractConfig,
)
