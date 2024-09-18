/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dbbbnrlvmafwefgzwgpp.supabase.co", "lh3.googleusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
