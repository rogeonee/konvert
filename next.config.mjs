/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore warning from libheif-js
    config.ignoreWarnings = [
      {
        message:
          /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
      },
    ];

    return config;
  },
};

export default nextConfig;
