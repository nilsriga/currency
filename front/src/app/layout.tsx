import "./globals.css";
import { Providers } from '../redux/providers';
import type { Metadata, Viewport } from "next";

const APP_NAME = process.env.APP_NAME || "Currency Converter";
const APP_DEFAULT_TITLE = process.env.APP_DEFAULT_TITLE || "EUR Converter";
const APP_TITLE_TEMPLATE = process.env.APP_TITLE_TEMPLATE || "%s EUR Converter";
const APP_DESCRIPTION = process.env.APP_DESCRIPTION || "See EUR exchange rates for 30 different currencies";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
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

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout( { children }: Readonly<{ children: React.ReactNode;}> ) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />{/* Link the manifest file */}
        <meta name="theme-color" content="#ffffff" />{/* Optional: Set the theme color */}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
