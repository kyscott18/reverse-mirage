import {
  Chain,
  ContractFunctionConfig,
  ContractFunctionResult,
  MulticallParameters,
  MulticallResult,
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
          val: MulticallResults<TContracts, false>[I &
            keyof MulticallResults<TContracts, false>],
        ) => TParse[I]
      },
    ]
  },
) {
  const data = (await multicall(
    client,
    args.contractConfig,
  )) as MulticallResults<TContracts, TAllowFailure>

  return data.map((d, i) => {
    const parse = args.parse[i]

    if (args.contractConfig.allowFailure) {
      return (d as MulticallResult<unknown, true>).status === 'failure'
        ? d
        : {
            status: 'success',
            result: parse((d as MulticallResult<unknown, true>).result),
          }
    }

    return parse(d)
  }) as readonly [
    ...{
      [I in keyof TParse]: MulticallResult<TParse[I], TAllowFailure>
    },
  ]
}
