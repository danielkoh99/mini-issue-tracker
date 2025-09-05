import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/issues",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
