/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  scope: '/'
});

export default withSerwist({
  reactStrictMode: true,
  swcMinify: true,
});