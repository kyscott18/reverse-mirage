import { Abi, AbiStateMutability } from 'abitype'
import { ContractFunctionConfig, ContractFunctionResult } from 'viem'

export type ReverseMirage<
  TAbi extends Abi = Abi,
  TFunctionName extends string = string,
  TAbiStateMutability extends AbiStateMutability = AbiStateMutability,
  TParse extends unknown = unknown,
> = {
  contractConfig: ContractFunctionConfig<
    TAbi,
    TFunctionName,
    TAbiStateMutability
  >
} & {
  parse: (ret: ContractFunctionResult<TAbi, TFunctionName>) => TParse
}
