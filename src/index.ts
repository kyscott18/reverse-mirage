import {
  CallParameters,
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
  args: ReadContractParameters<TAbi, TFunctionName>,
  parse: (ret: ContractFunctionResult<TAbi, TFunctionName>) => TParse,
) {
  const data = parse(await readContract(client, args))
  return data
}

export type ReadContractReturnType<
  TAbi extends Abi = Abi,
  TFunctionName extends string = string,
> = ContractFunctionResult<TAbi, TFunctionName>
