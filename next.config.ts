import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'omni.optimarvin.com' }],
  },
};

export default nextConfig;
