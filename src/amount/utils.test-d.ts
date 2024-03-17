import { assertType, describe, expectTypeOf, test } from "vitest";
import { mockToken } from "../_test/constants.js";
import { amountAdd, createAmountFromString } from "./utils.js";

describe("amount utils types", () => {
  test("create", () => {
    const c = createAmountFromString(mockToken, "1");
    c.type;
    //^?
    assertType<typeof c["type"]>("tokenAmount");
  });

  test("math", () => {
    const a = {
      type: "aData",
      amount: 1n,
      data: 2n,
      token: { type: "a", name: "token", symbol: "token", chainID: 1 },
    } as const;

    const b = {
      type: "aData",
      amount: 3n,
      token: a.token,
    } as const;

    const res = amountAdd(
      //  ^?
      a,
      b,
    );

    expectTypeOf<typeof res>().toEqualTypeOf<{
      type: "aData";
      amount: bigint;
      data: 2n;
      token: { type: "a"; name: "token"; symbol: "token"; chainID: 1 };
    }>;
  });
});
