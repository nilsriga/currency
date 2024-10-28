/** @type {import('next').NextConfig} */
// Import the withPWAInit function from the next-pwa package
import withPWAInit from "@ducanh2912/next-pwa";

// Initialize the withPWA function with configuration options
const withPWA = withPWAInit({
  dest: "public", // Destination directory for the service worker and other PWA assets
  fallbacks: ['/'], // Fallback routes for offline support
  extendDefaultRuntimeCaching: true, // Extend the default runtime caching strategy
  scope: '/', // Scope of the service worker
  // swSrc: 'public/custom-sw.js', // Reference to your compiled service worker (commented out)
  customWorker: 'src/custom-sw.js', // Path to your custom service worker
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|ico|js|css)$/, // URL pattern to match for caching
      handler: 'CacheFirst', // Caching strategy to use (CacheFirst)
      options: {
        cacheName: 'images', // Name of the cache
        expiration: {
          maxEntries: 50, // Maximum number of entries in the cache
          maxAgeSeconds: 30 * 24 * 60 * 60, // Maximum age of entries in the cache (30 days)
        },
      },
    },
    // Additional runtime caching strategies can be added here
    // {
    //   urlPattern: /\.(?:js|css)$/,
    //   handler: 'StaleWhileRevalidate',
    //   options: {
    //     cacheName: 'static-resources',
    //   },
    // },
  ],
});

// Export the Next.js configuration with PWA support
export default withPWA({
  reactStrictMode: true, // Enable React strict mode
  swcMinify: true, // Enable SWC minification for faster builds
});
