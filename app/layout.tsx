import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-ascent.vercel.app"),
  title: {
    default: "My Ascent - Portfolio",
    template: "%s | My Ascent",
  },
  description:
    "My ascent through tech: full-stack development, data science, and AI engineering. Each project a new peak.",
  keywords: [
    "software developer",
    "full-stack",
    "AI",
    "data science",
    "portfolio",
    "climbing",
    "tech",
  ],
  authors: [{ name: "Blake Crowther" }],
  creator: "Blake Crowther",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://my-ascent.vercel.app",
    title: "My Ascent - Portfolio",
    description:
      "My ascent through tech: full-stack development, data science, and AI engineering. Each project a new peak.",
    siteName: "My Ascent",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "My Ascent - Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Ascent - Portfolio",
    description:
      "My ascent through tech: full-stack development, data science, and AI engineering. Each project a new peak.",
    images: ["/images/og-preview.png"],
    creator: "@blakethenapper",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no"
        />
        <title>My Ascent - Portfolio</title>
        <meta property="og:title" content="My Ascent - Portfolio" />
        <meta name="twitter:title" content="My Ascent - Portfolio" />
        <meta name="application-name" content="My Ascent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ios-vh-fix antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
