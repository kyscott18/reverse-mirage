import { testClient } from "./utils";
import { Hex } from "viem";
import { afterEach, beforeAll } from "vitest";

let id: Hex = "0x0";

beforeAll(async () => {
  if (!id) id = await testClient.snapshot();
});

afterEach(async () => {
  await testClient.revert({
    id,
  });
  id = await testClient.snapshot();
});
