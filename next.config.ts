import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/christian-website',
  // assetPrefix: '/christian-website/out/', // Ensures static assets load correctly
  // trailingSlash: true, // Ensures all URLs end with .html
  images: {
    unoptimized: true // Required because GitHub Pages doesn’t support dynamic image optimization
  }
}

export default nextConfig
