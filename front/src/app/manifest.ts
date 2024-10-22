import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.APP_NAME || "Currency Converter",
    short_name: process.env.APP_DEFAULT_TITLE || "EUR Converter",
    description: process.env.APP_DESCRIPTION || "See EUR exchange rates for 30 different currencies",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    icons: [
      {
        src: '/euro-icon.svg',
        sizes: '48x48 72x72 96x96 128x128 256x256 512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}