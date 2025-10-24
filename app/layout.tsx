import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Plausible } from "@/components/Plausible";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ebiker.noah.zone"),
  title: "E-Biker",
  description: "Find Citibike e-bikes available near you in real-time",
  applicationName: "E-Biker",
  icons: [
    {
      url: "/images/icon-192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/images/icon-512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://ebiker.noah.zone",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <Plausible />
      </body>
    </html>
  );
}
