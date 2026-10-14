import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOE National Exam - Master Your Exams",
  description: "Comprehensive e-learning platform for exam preparation with practice tests, leaderboards, and more.",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png?v=moe", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png?v=moe", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico?v=moe", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png?v=moe", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/favicon/android-chrome-192x192.png?v=moe", sizes: "192x192" },
      { rel: "android-chrome", url: "/favicon/android-chrome-512x512.png?v=moe", sizes: "512x512" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
