import {
  Chain,
  ContractFunctionResult,
  PublicClient,
  ReadContractParameters,
  Transport,
} from 'viem'
import { readContract } from 'viem/contract'
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
