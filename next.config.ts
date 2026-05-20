import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'omni.optimarvin.com' },
      { protocol: 'https', hostname: '*.cms.optimizely.com' },
    ],
  },
};

export default nextConfig;
