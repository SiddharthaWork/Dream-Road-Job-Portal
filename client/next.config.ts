import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ALL build-time errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Avoid image & font optimization crashes
  images: {
    unoptimized: true,
  },

  // Disable strict & experimental failures
  reactStrictMode: false,


};

export default nextConfig;
