import { defineConfig } from "tsup";

export default defineConfig({
  name: "reverse-mirage",
  entry: ["index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  dts: true,
  clean: true,
  treeshake: true,
});
