import NextBundleAnalyzer from "@next/bundle-analyzer"

export default NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})({
  reactStrictMode: true,
  swcMinify: true,
})
