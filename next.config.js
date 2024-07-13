import bundleAnalyzer from "@next/bundle-analyzer";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = { pageExtensions: ["page.tsx", "page.ts"], reactStrictMode: true };

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
