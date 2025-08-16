import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { BuildOptions } from "./types/types";

type evnKeys = {
  [key: string]: string;
};

export const buildPlugins = (
  options: BuildOptions
): Configuration["plugins"] => {
  const envKeys: evnKeys = {};
  if (options.paths.envPath) {
    let env = dotenv.config({ path: options.paths.envPath });
    env = dotenvExpand.expand(env);
    Object.keys(env.parsed).forEach((key) => {
      envKeys[`process.env.${key}`] = JSON.stringify(env.parsed[key]);
    });
  }

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: path.resolve(options.paths.public, "favicon.svg"),
      publicPath: "/",
    }),
    new webpack.DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platfrom),
      __ENV__: JSON.stringify(options.mode),
      ...envKeys,
    }),
    // new ForkTsCheckerWebpackPlugin(),
  ];

  if (options.mode === "development") {
    plugins.push(new webpack.ProgressPlugin(), new ReactRefreshWebpackPlugin());
  }

  if (options.mode === "production") {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(options.paths.public, "locales"),
      //       to: path.resolve(options.paths.output, "locales"),
      //     },
      //   ],
      // })
    );
    if (options.additional.analyzer) plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
