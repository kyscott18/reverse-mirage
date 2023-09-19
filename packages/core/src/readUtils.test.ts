import { expect, test } from "vitest";
import { publicClient } from "./_test/utils.js";
import { createReverseMirage } from "./readUtils.js";

const rm = createReverseMirage((_: number) => ({
  read: (_) => Promise.resolve(5),
  parse: (d) => d + 5,
}));

test("split reverse mirage", async () => {
  const d = rm({ args: 7 });

  expect(d.parse(await d.read(publicClient))).toBe(10);
});

test("full reverse mirage", async () => {
  const d = await rm({ args: 7, publicClient });

  expect(d).toBe(10);
});
