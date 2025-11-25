/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // kyunki tum src/app use kar rahe ho
  },
  // IMPORTANT: yahan 'output: "export"' BILKUL NA RAKHO
};

module.exports = nextConfig;
