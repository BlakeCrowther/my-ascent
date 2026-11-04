import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve images as static files from the CDN instead of Vercel Image
  // Optimization, which has a monthly cap on the Hobby plan. Images in
  // public/images are pre-converted to WebP to keep bandwidth low.
  images: { unoptimized: true },
};

export default nextConfig;
