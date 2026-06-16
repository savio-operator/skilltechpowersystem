/** @type {import('next').NextConfig} */
const nextConfig = {
  // framer-motion's useInView disconnects its IntersectionObserver on React 18
  // Strict Mode's dev double-mount and never re-fires, leaving every
  // scroll-revealed element stuck at opacity:0 on `next dev` (CTAs, the service
  // cards, the savings calculator, footer). Production already disables the
  // double-invoke, so this only aligns dev with prod behaviour.
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
