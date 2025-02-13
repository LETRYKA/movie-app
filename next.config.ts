import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
});

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || "",
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN || "",
    TMDB_IMAGE_SERVICE_URL: process.env.TMDB_IMAGE_SERVICE_URL || "",
    TMDB_API_KEY: process.env.TMDB_API_KEY || "",

    STREAM_VIDLINK: process.env.VITE_STREAM_VIDLINK || "",
    STREAM_CC: process.env.VITE_STREAM_CC || "",
    STREAM_EMBED: process.env.VITE_STREAM_EMBED || "",
    STREAM_SEVENX: process.env.VITE_STREAM_SEVENX || "",
    STREAM_BINGE: process.env.VITE_STREAM_BINGE || "",
  },
};

export default withPWA(nextConfig);