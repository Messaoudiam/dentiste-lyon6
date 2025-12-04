import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize images with modern formats
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize image file sizes
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Enable compression
  compress: true,
  // Optimize for production
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
  // Strict mode for React
  reactStrictMode: true,
  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'lenis'],
  },
};

export default nextConfig;
