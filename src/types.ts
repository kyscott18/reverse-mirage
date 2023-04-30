import { ContractFunctionConfig, ContractFunctionResult } from 'viem'
import { Abi } from 'abitype'

export type ReverseMirage<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TParse extends unknown = unknown,
> = ContractFunctionConfig<TAbi, TFunctionName, 'view' | 'pure'> & {
  parse: (ret: ContractFunctionResult<TAbi, TFunctionName>) => TParse
}
