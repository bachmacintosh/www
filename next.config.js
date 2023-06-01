// @type Intl.DateTimeFormatOptions

const dateOptions = {
  dateStyle: "long",
  timeStyle: "short",
  hour12: true,
  timeZone: "America/New_York",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  env: {
    baseUrl: "https://bachmacintosh.com",
    buildTime: new Date().toLocaleString("en-US", dateOptions),
    version: process.env.npm_package_version ?? "?.?.?",
  },
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/sanity/imageLoader.ts",
  },
};

module.exports = nextConfig;
