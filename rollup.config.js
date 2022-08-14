import path from "path";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";

function getVersion() {
  return require("./package.json").version;
}

const banner = `/**
* esbuild-plugin-nodemon ${getVersion()}
*
* Copyright (c) mast1ff
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of thie source tree.
*
* @license MIT
*/`;

/**
 * @returns { import("rollup").RollupOptions[] }
 */
export default () => {
  return [
    {
      external(id) {
        return !id.startsWith(".") && !path.isAbsolute(id);
      },
      cache: false,
      input: `src/index.ts`,
      output: {
        dir: path.resolve(__dirname, "dist"),
        format: "cjs",
        preserveModules: true,
        exports: "named",
        sourcemap: true,
        banner,
      },
      plugins: [
        nodeResolve({ extensions: [".ts"] }),
        typescript({
          tsconfig: "./tsconfig.json",
          rootDir: "src",
          outDir: `./dist`,
          declaration: true,
          declarationDir: `./dist`,
        }),
      ],
    },
  ];
};
