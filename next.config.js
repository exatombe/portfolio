/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NODE_ENV === 'production',
})
const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
    domains: ['cdn.discordapp.com', 'unpkg.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
})

module.exports = nextConfig
