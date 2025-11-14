/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rootDirectory: __dirname, // ✔ Correct key for Next.js 16
  },
};

module.exports = nextConfig;
