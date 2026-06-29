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
  // Add this block right here to bake the backend URL into your static code
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://fortechz-website.onrender.com",
  },
};

export default nextConfig;
