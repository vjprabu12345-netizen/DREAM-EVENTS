/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.9', 'localhost:3000'],
};

export default nextConfig;
