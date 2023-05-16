import { Abi } from 'abitype'
import { ContractFunctionConfig } from 'viem'

type MAXIMUM_DEPTH = 20

export type Contract<
  TAbi extends Abi | readonly unknown[] = Abi | readonly unknown[],
  TFunctionName extends string = string,
> = { abi: TAbi; functionName: TFunctionName }

export type MulticallContracts<
  TContracts extends Contract[],
  Result extends any[] = [],
  Depth extends readonly number[] = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? ContractFunctionConfig[]
  : TContracts extends []
  ? []
  : TContracts extends [infer Head extends Contract]
  ? [...Result, ContractFunctionConfig<Head['abi'], Head['functionName']>]
  : TContracts extends [
      infer Head extends Contract,
      ...infer Tail extends Contract[],
    ]
  ? MulticallContracts<
      [...Tail],
      [...Result, ContractFunctionConfig<Head['abi'], Head['functionName']>],
      [...Depth, 1]
    >
  : unknown[] extends TContracts
  ? TContracts
  : // If `TContracts` is *some* array but we couldn't assign `unknown[]` to it, then it must hold some known/homogenous type!
  // use this to infer the param types in the case of Array.map() argument
  TContracts extends ContractFunctionConfig<infer TAbi, infer TFunctionName>[]
  ? ContractFunctionConfig<TAbi, TFunctionName>[]
  : ContractFunctionConfig[]
