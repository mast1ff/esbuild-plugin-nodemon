# esbuild-plugin-nodemon

[![npm version](https://img.shields.io/npm/v/esbuild-plugin-nodemon.svg?style=flat)](https://www.npmjs.com/package/esbuild-plugin-nodemon)
[![test](https://github.com/mast1ff/esbuild-plugin-nodemon/actions/workflows/test.yml/badge.svg)](https://github.com/mast1ff/esbuild-plugin-nodemon/actions/workflows/test.yml)

Run and reload scripts with esbuild.

## Usage

```bash
npm install --save-dev esbuild-plugin-nodemon
# or
yarn add -D esbuild-plugin-nodemon
```

```js
const nodemonPlugin = require("esbuild-plugin-nodemon");

esbuild.build({
  entryPoints: ["./index.js"],
  outfile: "./dist/index.js",
  watch: true,
  platform: "node",
  format: "cjs",
  plugins: [nodemonPlugin()]
});
```

### Configuration
See [Nodemon's type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/nodemon/index.d.ts).
