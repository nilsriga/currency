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
        src: '/icon-eur.svg',
        sizes: 'any',
        type: 'svg/xml',
      },
    ],
  }
}