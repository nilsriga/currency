// Import global CSS styles
import "./globals.css";

// Import the Providers component from the redux directory
import { Providers } from '../redux/providers';

// Import types for Metadata and Viewport from Next.js
import type { Metadata, Viewport } from "next";

// Define constants for application metadata, using environment variables or default values
const APP_NAME = process.env.APP_NAME || "Currency Converter";
const APP_DEFAULT_TITLE = process.env.APP_DEFAULT_TITLE || "EUR Converter";
const APP_TITLE_TEMPLATE = process.env.APP_TITLE_TEMPLATE || "%s EUR Converter";
const APP_DESCRIPTION = process.env.APP_DESCRIPTION || "See EUR exchange rates for 30 different currencies";

// Export metadata object to be used by Next.js for SEO and web app settings
export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json", // Link to the web app manifest file
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false, // Disable automatic detection of telephone numbers
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

// Export viewport settings for the web app
export const viewport: Viewport = {
  themeColor: "#FFFFFF", // Set the theme color for the web app
};

// Define the RootLayout component, which wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="UTF-8" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
