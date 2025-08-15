export interface BuildPaths {
  entry: string;
  public: string;
  html: string;
  output: string;
  envPath?: string;
  src: string;
}
export type BuildMode = "development" | "production";
export type BuildPlatform = "desktop" | "mobile";

interface AdditionalOptions {
  analyzer: boolean;
}

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  platfrom: BuildPlatform;
  additional: AdditionalOptions;
}
