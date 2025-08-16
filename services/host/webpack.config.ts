import { BuildMode, BuildPlatform, buildWebpack } from "@packages/build-config";
import path from "path";
import webpack from "webpack";
import packageJson from "./package.json";

export type EnvOptions = {
  REAL_TIME_CHAT?: string;
  mode: BuildMode;
  port: number;
  analyzer: boolean;
  platform: BuildPlatform;
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
};

export default (env: EnvOptions) => {
  const paths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    public: path.resolve(__dirname, "public"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  };

  const additional = {
    analyzer: env.analyzer ?? false,
  };

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3000,
    platfrom: env.platform ?? "desktop",
    paths,
    additional,
  });

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3001";
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3002";
  const REAL_TIME_CHAT = env.REAL_TIME_CHAT ?? "http://localhost:3004";
  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: packageJson.name,
      filename: "remoteEntry.js",
      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
        realTimeChat: `real_time_chat@${REAL_TIME_CHAT}/remoteEntry.js`,
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
        "@mui/material": {
          singleton: true,
          eager: true,
          version: packageJson.dependencies["@mui/material"],
          requiredVersion: packageJson.dependencies["@mui/material"],
        },
        "@mui/icons-material": {
          singleton: true,
          eager: true,
          requiredVersion: packageJson.dependencies["@mui/icons-material"],
        },
        "@emotion/react": {
          singleton: true,
          eager: true,
          requiredVersion: packageJson.dependencies["@emotion/react"],
          import: require.resolve("@emotion/react"),
        },
        "@emotion/styled": {
          singleton: true,
          eager: true,
          requiredVersion: packageJson.dependencies["@emotion/styled"],
          import: require.resolve("@emotion/styled"),
        },
      },
    })
  );

  return config;
};
