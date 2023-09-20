import { expect, test } from "vitest";
import { publicClient } from "../_test/utils.js";
import { createReverseMirage } from "./createReverseMirage.js";

export const rm = createReverseMirage((publicClient, _: number) => ({
  read: () => Promise.resolve(5),
  parse: (d) => d + 5,
}));

test("split reverse mirage", async () => {
  const d = rm(publicClient, 4);

  expect(d.parse(await d.read(publicClient))).toBe(10);
});

test("full reverse mirage", async () => {
  const d = await rm({ args: 7, client: publicClient });
  //    ^?

  expect(d).toBe(10);
});
