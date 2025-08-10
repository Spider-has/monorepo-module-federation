import path from "path";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";
export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => {
  return {
    port: options.port ?? 5000,
    open: true,
    static: options.paths.output,
    historyApiFallback: true,
  };
};
