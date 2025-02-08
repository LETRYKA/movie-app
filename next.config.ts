import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || "",
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN || "",
    TMDB_IMAGE_SERVICE_URL: process.env.TMDB_IMAGE_SERVICE_URL || "",
    TMDB_API_KEY: process.env.TMDB_API_KEY || "",

    STREAM_VIDLINK: process.env.VITE_STREAM_VIDLINK || "https://vidlink.pro",
    STREAM_CC: process.env.VITE_STREAM_CC || "https://vidsrc.cc/v2/embed",
    STREAM_EMBED: process.env.VITE_STREAM_EMBED || "https://embed.su/embed",
    STREAM_SEVENX: process.env.VITE_STREAM_SEVENX || "https://embed.7xtream.com/embed",
    STREAM_BINGE: process.env.VITE_STREAM_BINGE || "https://vidbinge.dev/embed",
  },
};


export default nextConfig;
