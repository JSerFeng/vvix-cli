import resolve from 'rollup-plugin-node-resolve'
import commonJsTransformer from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import path from 'path'

const extensions = [
  '.ts',
  '.js'
]

const tsPlugin = ts({
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  extensions
})

export default {
  input: "./lib/index.ts",
  output: {
    file: "./bin/dist.js",
    format: "cjs",
    name: "vvix",
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    commonJsTransformer(),
    tsPlugin
  ]
};