/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tiawai-storage.sgp1.cdn.digitaloceanspaces.com',
        pathname: '**',
      },
    ],
  },
  // Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self'; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' ${process.env.BACKEND_URL || ''} https://*.vercel-insights.com; img-src 'self' data: blob: https://*; style-src 'self' 'unsafe-inline';`,
          },
        ],
      },
    ];
  },
  // Increase API timeout for production
  async rewrites() {
    return [
      // Keep the NextAuth routes intact
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      // Forward all other API requests to the backend
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
