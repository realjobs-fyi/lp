import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Jobs | Filter Fake Job Listings & Land Interviews Faster",
  description:
    "Real Jobs flags fake listings, cuts candidate ghosting by 60%, and delivers 4x more interviews through a curated feed and free Chrome extension.",
  keywords: [
    "Real Jobs",
    "fake job filter",
    "LinkedIn fake jobs",
    "job search Chrome extension",
    "reduce candidate ghosting",
    "get more interviews",
  ],
  metadataBase: new URL("https://realjobs.fyi"),
  openGraph: {
    title: "Real Jobs | Filter Fake Job Listings & Land Interviews Faster",
    description:
      "Real Jobs flags fake listings, cuts candidate ghosting by 60%, and delivers 4x more interviews through a curated feed and free Chrome extension.",
    url: "https://realjobs.fyi",
    siteName: "Real Jobs",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Real Jobs | Filter Fake Job Listings & Land Interviews Faster",
      type: "image/png",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Jobs | Filter Fake Job Listings & Land Interviews Faster",
    images: ["/og-image.png"],
  },
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
      </body>
    </html>
  );
}
