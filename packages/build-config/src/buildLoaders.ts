import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { BuildOptions } from "./types/types";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => {
  const isDev = options.mode === "development";

  const cssLoaderWithModule = {
    loader: "css-loader",
    options: {
      esModule: true,
      sourceMap: isDev,

      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
        exportOnlyLocals: false,
        mode: "local",
        namedExport: false,
        exportLocalsConvention: "camelCase",
      },
    },
  };

  const scssLoader = [
    {
      test: /\.module\.s[ac]ss$/i,
      use: [
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        cssLoaderWithModule,
        "sass-loader",
      ],
    },
    {
      test: /\.s[ac]ss$/i,
      exclude: /\.module\.s[ac]ss$/i,
      use: [
        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader",
      ],
    },
  ];

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("ts-loader"),
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev,
        },
      },
    ],
    exclude: /node_modules/,
  };

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  return [...scssLoader, svgLoader, tsLoader, assetsLoader];
};
