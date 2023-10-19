/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',

  experimental: {
    turbo: {
      rules: {},
    },
  },

  webpack(config, { isServer, dev }) {
    config.experiments = {
      topLevelAwait: true,
      asyncWebAssembly: true,
      layers: true,
    };
    config.externals.push({
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas',
    });

    return config;
  },
};

module.exports = nextConfig;