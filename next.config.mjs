/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // បន្ថែមត្រង់នេះ
  allowedDevOrigins: ['192.168.1.183'],
}

export default nextConfig