/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    turbo: {
      rules: {},
    },
    serverActions: true,
  },
};

module.exports = nextConfig;
