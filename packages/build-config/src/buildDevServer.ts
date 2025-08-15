import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => ({
  port: options.port ?? 5000,
  open: true,
  static: options.paths.public,
  historyApiFallback: true,
  hot: true,
});
