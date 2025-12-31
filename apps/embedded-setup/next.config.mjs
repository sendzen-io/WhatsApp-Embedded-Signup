/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui-core"],
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Use a different hash function to avoid WASM issues with Node.js 22
    config.output.hashFunction = 'xxhash64';
    // Disable hash function entirely as fallback
    if (config.output.hashFunction === 'xxhash64') {
      config.output.hashFunction = 'xxhash64';
    }
    return config;
  },
};

export default nextConfig;

