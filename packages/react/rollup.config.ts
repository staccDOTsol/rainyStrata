import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import autoExternal from "rollup-plugin-auto-external";

const env = process.env.NODE_ENV;

export default {
  input: "src/index.ts",
  plugins: [
    nodeResolve({
      browser: true,
      extensions: [".js", ".ts"],
      dedupe: ["bn.js", "buffer", "borsh", "@solana/web3.js"],
      preferBuiltins: false,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      outDir: "dist",
    }),
    autoExternal(),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify(env),
        "process.env.ANCHOR_BROWSER": JSON.stringify(true),
      },
    }),
    terser(),
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
  output: [
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      preserveModulesRoot: "src",
      preserveModules: true,
    },
    {
      file: "dist/index.es.js",
      format: "es",
      sourcemap: true,
    },
  ],
};
