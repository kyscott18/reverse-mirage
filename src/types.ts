import { Abi, AbiStateMutability } from 'abitype'
import { ContractFunctionConfig, ContractFunctionResult } from 'viem'

export type ReverseMirage<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TParse extends unknown = unknown,
  TAbiStateMutability extends AbiStateMutability = AbiStateMutability,
> = {
  contractConfig: ContractFunctionConfig<
    TAbi,
    TFunctionName,
    TAbiStateMutability
  >
} & {
  parse: (ret: ContractFunctionResult<TAbi, TFunctionName>) => TParse
}
