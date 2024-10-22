/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  fallbacks: ['/'],
  extendDefaultRuntimeCaching: true,
  scope: '/',
  // swSrc: 'public/custom-sw.js', // Reference to your compiled service worker
  customWorker: 'src/custom-sw.js',
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|ico|js|css)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
      },
    },
    // {
    //   urlPattern: /\.(?:js|css)$/,
    //   handler: 'StaleWhileRevalidate',
    //   options: {
    //     cacheName: 'static-resources',
    //   },
    // },
  ],
});

export default withPWA({
  reactStrictMode: true,
  swcMinify: true,
});