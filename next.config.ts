import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/FORTECHZ-website",
  assetPrefix: "/FORTECHZ-website/",
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
