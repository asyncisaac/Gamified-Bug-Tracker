import path from "path";
import { NextConfig } from "next";
import { Configuration } from "webpack";

interface WebPackAliasConfig extends Configuration {
  resolve: {
    alias: Record<string, string>;
  };
}


const nextConfig: NextConfig = {
  webpack(config: WebPackAliasConfig) {
    config.resolve!.alias!["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;