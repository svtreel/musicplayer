/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['node-vibrant'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.tidal.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '192.168.0.222',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;