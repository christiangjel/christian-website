import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined, // Use 'export' only in production
  basePath: isProd ? '/christian-website' : '',
  images: {
    unoptimized: true // Required for GitHub Pages
  }
}

export default nextConfig
