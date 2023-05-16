import {
  Chain,
  ContractFunctionConfig,
  ContractFunctionResult,
  MulticallParameters,
  MulticallResults,
  PublicClient,
  ReadContractParameters,
  Transport,
} from 'viem'
import { multicall, readContract } from 'viem/contract'
import { Abi } from 'abitype'

export async function readReverseMirage<
  TChain extends Chain | undefined,
  TAbi extends Abi,
  TFunctionName extends string,
  TParse extends unknown,
>(
  client: PublicClient<Transport, TChain>,
  args: {
    contractConfig: ReadContractParameters<TAbi, TFunctionName>
    parse: (ret: ContractFunctionResult<TAbi, TFunctionName>) => TParse
  },
): Promise<TParse> {
  const data = args.parse(await readContract(client, args.contractConfig))
  return data
}

export async function readReverseMirages<
  TChain extends Chain | undefined,
  TContracts extends ContractFunctionConfig[],
  TParse extends unknown[],
  TAllowFailure extends boolean = true,
>(
  client: PublicClient<Transport, TChain>,
  args: {
    contractConfig: MulticallParameters<TContracts, TAllowFailure>
    parse: readonly [
      ...{
        [I in keyof TParse]: (
          ret: MulticallResults<TContracts, TAllowFailure>[I &
            keyof MulticallResults<TContracts, TAllowFailure>],
        ) => TParse[I]
      },
    ]
  },
): Promise<TParse> {
  const data = await multicall(client, args.contractConfig)
  return data.map((d, i) => args.parse[i](d)) as TParse
}
