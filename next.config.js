/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com', 'loremflickr.com'],
  },
  env: {
    JWT_SECRET: 'f9sudfsdfwjmr5l3w4j53o49uir0weifseifs-0ef-0sd9f-0sd9f-0iwpkrl2kr54k234r23',
  }
}

module.exports = nextConfig