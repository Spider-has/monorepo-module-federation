import path from "path";
import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export const buildWebpack = (options: BuildOptions) => {
  const isDev = options.mode === "development";

  const config: webpack.Configuration = {
    mode: options.mode ?? "development",
    entry: options.paths.entry,
    output: {
      path: options.paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
  };
  return config;
};
