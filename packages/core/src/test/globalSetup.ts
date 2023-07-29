import { forkBlockNumber, forkUrl } from "./constants.js";
import { startProxy } from "@viem/anvil";

export default async function () {
  console.log(forkBlockNumber);
  return await startProxy({
    port: 8545, // By default, the proxy will listen on port 8545.
    host: "::", // By default, the proxy will listen on all interfaces.
    options: {
      chainId: 1,
      forkUrl,
      forkBlockNumber,
    },
  });
}
