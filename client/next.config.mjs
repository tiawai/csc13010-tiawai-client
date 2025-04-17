/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tiawai-storage.sgp1.cdn.digitaloceanspaces.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'tiawai-storage.sgp1.digitaloceanspaces.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
