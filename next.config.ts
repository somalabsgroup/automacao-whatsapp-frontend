import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    qualities: [100, 75],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
