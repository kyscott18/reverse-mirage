import { Narrow } from 'abitype'
import {
  Chain,
  PublicClient,
  Transport,
  MulticallResults,
  ContractFunctionConfig,
  CallParameters,
  MulticallContracts,
  Address,
} from 'viem'
import { multicall } from 'viem/contract'

export async function readReverseMirages<
  TChain extends Chain | undefined,
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
>(
  client: PublicClient<Transport, TChain>,
  args: MulticallParameters<TContracts, TAllowFailure>,
): Promise<MulticallReturnType<TContracts, TAllowFailure>> {
  const data = await multicall(client, args)
  return data
}

export type MulticallParameters<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = Pick<CallParameters, 'blockNumber' | 'blockTag'> & {
  allowFailure?: TAllowFailure
  /** The maximum size (in bytes) for each calldata chunk. Set to `0` to disable the size limit. @default 1_024 */
  batchSize?: number
  contracts: Narrow<readonly [...MulticallContracts<TContracts>]>
  multicallAddress?: Address
}

export type MulticallReturnType<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = MulticallResults<TContracts, TAllowFailure>
