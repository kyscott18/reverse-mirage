import { Abi, AbiStateMutability } from 'abitype'
import {
  Chain,
  PublicClient,
  Transport,
  ContractFunctionConfig,
  ContractFunctionResult,
  MulticallReturnType,
  MulticallParameters,
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

export type ReverseMirage<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TAbiStateMutability extends AbiStateMutability = AbiStateMutability,
  TParse extends unknown = unknown,
> = ContractFunctionConfig<TAbi, TFunctionName, TAbiStateMutability> & {
  parse: (ret: ContractFunctionResult<TAbi, TFunctionName>) => TParse
}
