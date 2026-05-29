import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    qualities: [100, 75],
  },
};

export default nextConfig;
