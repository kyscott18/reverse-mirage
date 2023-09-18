import { defineConfig } from "tsup";

export default defineConfig({
  name: "reverse-mirage-react",
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  dts: true,
  clean: true,
});
