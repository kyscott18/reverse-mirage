import { Token } from '@uniswap/sdk-core'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { multicall, readContract } from 'viem/contract'
import { readReverseMirage, readReverseMirages } from './index'
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
  balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'),
)

const r2 = await readContract(
  //  ^?
  publicClient,
  balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
    .contractConfig,
)

const r3 = await readReverseMirages(
  //  ^?
  publicClient,
  {
    contractConfig: {
      allowFailure: false,
      contracts: [
        balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
          .contractConfig,
      ],
    },
    parse: [
      balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
        .parse,
    ],
  },
)

const r4 = await readReverseMirages(
  //  ^?
  publicClient,
  {
    contractConfig: {
      allowFailure: true,
      contracts: [
        balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
          .contractConfig,
      ],
    },
    parse: [
      balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
        .parse,
    ],
  },
)

const r5 = await multicall(
  //  ^?
  publicClient,
  {
    allowFailure: false,
    contracts: [
      balanceOfMirage(token, '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2')
        .contractConfig,
    ],
  } as const,
)
