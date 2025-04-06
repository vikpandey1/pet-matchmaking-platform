/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'yourproductionsite.com',
      'picsum.photos', // For development placeholders
      'supabase.co',
      // Add your Supabase storage domain when available
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  // Used for deployment on any Node-compatible host (not Vercel)
  output: 'standalone',
}

module.exports = nextConfig 