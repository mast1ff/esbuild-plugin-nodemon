const esbuild = require("esbuild");
const nodemonPlugin = require("../dist").default;
const path = require("path");

const root = path.resolve(process.cwd(), "test");
const entryPoints = [path.resolve(root, "server/index.ts")];
const outfile = path.resolve(root, "dist/index.js");

esbuild
  .build({
    absWorkingDir: root,
    entryPoints,
    outfile,
    format: "cjs",
    platform: "node",
    bundle: true,
    write: true,
    sourcemap: true,
    loader: {
      ".ts": "ts",
    },
    plugins: [nodemonPlugin()],
    watch: true,
  })
  .then((res) => {
    console.log(JSON.stringify(res));
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
