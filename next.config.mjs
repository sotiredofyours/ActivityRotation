/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/ActivityRotation',
  assetPrefix: '/ActivityRotation'
};

export default nextConfig;
