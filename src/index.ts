import { Chain, PublicClient, Transport, ReadContractParameters } from 'viem'
import { readContract } from 'viem/contract'
import { Abi } from 'abitype'

export async function readReverseMirage<
  TChain extends Chain | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(
  client: PublicClient<Transport, TChain>,
  args: ReadContractParameters<TAbi, TFunctionName>,
) {
  const data = await readContract(client, args)
  return data
}
