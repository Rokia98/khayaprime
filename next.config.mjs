/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.9'],
  // On ne définit turbopack.root que si on n'est pas sur Vercel
  ...(process.env.VERCEL ? {} : {
    turbopack: {
      root: path.resolve(__dirname, '..'),
    },
    outputFileTracingRoot: path.resolve(__dirname, '..'),
  }),
  devIndicators: {
    appIsrStatus: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

