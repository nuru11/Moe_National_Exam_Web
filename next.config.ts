import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.entrancetricks.com',
      },
      {
        protocol: 'https',
        hostname: 'entrance-tricks.b-cdn.net',
      },
    ],
  },
};

export default nextConfig;
