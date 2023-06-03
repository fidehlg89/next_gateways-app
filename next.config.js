/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
const path = require("path");

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
