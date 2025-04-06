/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'picsum.photos',
      'supabase.co',
    ],
    unoptimized: true,
  },
  // Used for deployment on any Node-compatible host
  output: 'standalone',
}

module.exports = nextConfig 