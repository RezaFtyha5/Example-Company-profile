/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
};

module.exports = nextConfig;