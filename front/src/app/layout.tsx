'use client'
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from '../redux/providers';
import { registerServiceWorker } from './serviceWorkerRegistration'; // Import the service worker registration

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Register the service worker if it's on the client side
  if (typeof window !== 'undefined') {
    registerServiceWorker();
  }

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />{/* Link the manifest file */}
        <meta name="theme-color" content="#ffffff" />{/* Optional: Set the theme color */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
