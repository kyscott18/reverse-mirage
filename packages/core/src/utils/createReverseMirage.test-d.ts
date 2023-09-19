import { assertType, test } from "vitest";
import { publicClient } from "../_test/utils.js";
import type { ReverseMirageRead } from "../types/rm.js";
import { rm } from "./createReverseMirage.test.js";

test("create reverse mirage no client", () => {
  assertType<Promise<number>>(rm({ args: 7, client: publicClient }));
});

test("create reverse mirage with client", () => {
  assertType<ReverseMirageRead<number, number, typeof publicClient["chain"]>>(
    rm({ args: 7 }),
  );
});
