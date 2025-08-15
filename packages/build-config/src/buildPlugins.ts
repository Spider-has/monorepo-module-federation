import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import { BuildOptions } from "./types/types";

export const buildPlugins = (
  options: BuildOptions
): Configuration["plugins"] => {
  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: path.resolve(options.paths.public, "favicon.svg"),
      publicPath: "/",
    }),
    new webpack.DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platfrom),
      __ENV__: JSON.stringify(options.mode),
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
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(options.paths.public, "locales"),
            to: path.resolve(options.paths.output, "locales"),
          },
        ],
      })
    );
    if (options.additional.analyzer) plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
