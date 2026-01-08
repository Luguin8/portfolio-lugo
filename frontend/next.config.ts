import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AUMENTAR LÍMITE DE SUBIDA PARA SERVER ACTIONS
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Puedes subirlo a '10mb' si usas fotos muy pesadas
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'waazfbtohtrztjmjevie.supabase.co', // Tu bucket real
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;