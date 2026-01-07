import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Este es TU dominio específico de Supabase que salió en el error
        hostname: 'waazfbtohtrztjmjevie.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Mantenemos Unsplash por si usas fotos de stock
      },
    ],
  },
};

export default nextConfig;