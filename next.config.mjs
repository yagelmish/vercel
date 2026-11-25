/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-b16c822b522a4938a55d22320ecd1d0f.r2.dev',
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig
