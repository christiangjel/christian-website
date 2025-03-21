import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/christian-website',
  images: {
    unoptimized: true // Required because GitHub Pages doesn’t support dynamic image optimization
  }
}

export default nextConfig
