import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined, // Use 'export' only in production
  basePath: isProd ? '/christian-website' : '',
  assetPrefix: isProd ? '/christian-website/' : '',
  images: {
    unoptimized: true // Required for GitHub Pages
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  }
}

export default nextConfig
