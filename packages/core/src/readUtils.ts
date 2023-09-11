import type { PublicClient } from "viem";
import type { ReverseMirageRead } from "./types.js";

/**
 * Read data using a json-rpc request and parse the returned data
 */
export const readAndParse = async <TRet, TParse>(
  publicClient: PublicClient,
  reverseMirageRead: ReverseMirageRead<TRet, TParse>,
) => {
  return reverseMirageRead.parse(await reverseMirageRead.read(publicClient));
};
