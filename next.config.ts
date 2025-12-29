import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined, // Use 'export' only in production
  basePath: isProd ? '/christian-website' : '',
  assetPrefix: isProd ? '/christian-website/' : '',
  images: {
    unoptimized: true // Required for GitHub Pages
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true
}

export default nextConfig
