/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = {
  images: {
    domains: ["image.tmdb.org"],
  },
};