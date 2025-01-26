import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // During development, you can ignore TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
