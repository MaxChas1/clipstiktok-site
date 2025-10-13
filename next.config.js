/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['huggingface.co', 'cdn.openai.com', 'ytimg.com'],
  },
};

module.exports = nextConfig;
