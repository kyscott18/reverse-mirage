import { ReverseMirageRead } from './types'

export const readAndParse = async <TRet, TParse>(
  reverseMirageRead: ReverseMirageRead<TRet, TParse>,
) => {
  return reverseMirageRead.parse(await reverseMirageRead.read())
}
