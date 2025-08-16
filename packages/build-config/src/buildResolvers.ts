import { Configuration } from "webpack";
import path from "path";
import { BuildOptions } from "./types/types";

export const buildResolvers = (
  options: BuildOptions
): Configuration["resolve"] => ({
  extensions: [".tsx", ".ts", ".js"],
  alias: {
    "@": options.paths.src,
    "@emotion/styled": path.resolve(
      __dirname,
      "../../../node_modules/@emotion/styled"
    ),
    "@emotion/react": path.resolve(
      __dirname,
      "../../../node_modules/@emotion/react"
    ),
    "@mui/material": path.resolve(
      __dirname,
      "../../../node_modules/@mui/material"
    ),
    "@mui/icons-material": path.resolve(
      __dirname,
      "../../../node_modules/@mui/icons-material"
    ),
  },
});
