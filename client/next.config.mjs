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
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiTimeout: 30000, // 30 seconds
  },
  // Enable CORS properly
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
