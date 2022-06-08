/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NODE_ENV === 'production',
})
const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  experimental: { images: { layoutRaw: true } },
})

module.exports = nextConfig
