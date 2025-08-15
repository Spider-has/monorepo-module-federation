import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
  buildWebpack,
} from "@packages/build-config";
import path from "path";
import webpack from "webpack";
import packageJson from "./package.json";

export type EnvOptions = {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
  platform: BuildPlatform;
};

export default (env: EnvOptions) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    public: path.resolve(__dirname, "public"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    envPath:
      env.mode === "development"
        ? path.resolve(__dirname, ".env")
        : path.resolve(__dirname, ".env.production"),
  };
  const additional = {
    analyzer: env.analyzer ?? false,
  };

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3004,
    platfrom: env.platform ?? "desktop",
    paths,
    additional,
  });

  if (env.mode === "production") {
    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        name: packageJson.name,
        filename: "remoteEntry.js",
        exposes: {
          "./Router": "./src/router/Router.tsx",
        },
        shared: {
          ...packageJson.dependencies,
          react: {
            eager: true,
            requiredVersion: packageJson.dependencies.react,
          },
          "react-router-dom": {
            eager: true,
            requiredVersion: packageJson.dependencies["react-router-dom"],
          },
          "react-dom": {
            eager: true,
            requiredVersion: packageJson.dependencies["react-dom"],
          },
        },
      })
    );
  }

  return config;
};
