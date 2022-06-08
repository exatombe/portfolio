/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NODE_ENV === 'production',
})
const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
})

module.exports = nextConfig
