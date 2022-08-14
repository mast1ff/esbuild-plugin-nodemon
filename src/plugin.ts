import type { Plugin } from "esbuild";
import type { Settings } from "nodemon";
import nodemon from "nodemon";
import * as fs from "fs-extra";
import * as path from "path";

export interface NodemonPluginOptions extends Settings {}

export function esbuildNodemonPlugin(
  options: NodemonPluginOptions = {}
): Plugin {
  const { ..._nodemonOptions } = options;

  let isNodemonRunning = false;
  let error: string | null = null;

  function startMonitoring(relativeFilename: string) {
    const nodemonDefaultOptions: Settings = {
      script: relativeFilename,
      watch: [relativeFilename],
    };

    const nodemonOptions = {
      ...nodemonDefaultOptions,
      ..._nodemonOptions,
    };

    const monitor = nodemon(nodemonOptions);
    monitor.on("log", ({ colour: colouredMessage }) => {
      console.log(colouredMessage);
    });

    isNodemonRunning = true;

    // Ensure we exit nodemon when esbuild exists
    process.once("exit", () => {
      monitor.emit("exit");
    });

    // Ctrl-C triggers exit.
    process.once("SIGINT", () => {
      process.exit(0);
    });
  }

  return {
    name: "esbuild-plugin-nodemon",
    setup(build) {
      build.initialOptions.write = false;

      build.onEnd(async (result) => {
        if (result.errors.length > 0) {
          error = result.errors.map((err) => String(err.detail)).join("\n");
        }

        if (!result.outputFiles) return;
        const output = result.outputFiles[0];
        const entryPoint = output.path;

        try {
          fs.ensureDirSync(path.dirname(output.path));
          fs.writeFileSync(output.path, output.contents, "utf-8");
        } catch (e: any) {
          error = e?.message;
        }

        if (
          !error &&
          build.initialOptions.watch === true &&
          !isNodemonRunning
        ) {
          startMonitoring(entryPoint);
        } else if (error) {
          console.log(`[esbuild-plugin-nodemon]: Compilation error.`);
          console.log(error);
        }
      });
    },
  };
}
