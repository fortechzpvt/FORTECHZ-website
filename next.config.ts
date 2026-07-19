import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  output: 'export', // Tells Next.js to generate static HTML/CSS/JS files
  images: {
    unoptimized: true, // Required for static exports
  },
  basePath: '/FORTECHZ-website', // Adds the repository name as the base path for GitHub Pages
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://fortechz-website.onrender.com",
  },
};

export default nextConfig;
