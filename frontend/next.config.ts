import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: '**.supabase.co', // Permite cualquier proyecto de Supabase
        hostname: 'images.unsplash.com', // Permite imágenes de Unsplash
      },
    ],
  },
};

export default nextConfig;