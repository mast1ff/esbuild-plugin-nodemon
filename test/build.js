const esbuild = require("esbuild");
const nodemonPlugin = require("../dist").default;
const path = require("path");

const root = path.resolve(process.cwd(), "test");
const entryPoints = [path.resolve(root, "server/index.ts")];
const outfile = path.resolve(root, "dist/index.js");

esbuild.build({
  absWorkingDir: root,
  entryPoints,
  outfile,
  format: "cjs",
  platform: "node",
  bundle: true,
  write: true,
  loader: {
    ".ts": "ts",
  },
  plugins: [nodemonPlugin()],
  watch: true,
});
