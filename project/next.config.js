import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["page.tsx", "page.ts"],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withBundleAnalyzer(nextConfig);
