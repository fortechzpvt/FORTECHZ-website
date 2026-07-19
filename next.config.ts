import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    unoptimized: true,
  },
  // You can keep the env variable here if you want, 
  // but remove the fetch/await logic.
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://fortechz-website.onrender.com",
  },
};

export default nextConfig;
