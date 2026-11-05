import type { Metadata, Viewport } from "next";
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

const description =
  "Flávio Silva — Software Engineering Master's student at the University of Minho (Braga, Portugal), open to junior roles. Projects in Python, Vue.js, React Native, Node.js and Kubernetes, including JobRadar, an open-source job finder for Portugal.";

// Link previews (LinkedIn, WhatsApp...) need full addresses: the site's own, with its /porfolio prefix
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const shareImage = { url: `${basePath}/og.png`, width: 1200, height: 630, alt: "Flávio Silva · Software Engineer" };

export const metadata: Metadata = {
  metadataBase: new URL("https://fuzzyladuzzy.github.io"),
  title: "Flávio Silva · Software Engineer",
  description,
  authors: [{ name: "Flávio Silva" }],
  keywords: [
    "Flávio Silva",
    "Software Engineer",
    "Portfolio",
    "University of Minho",
    "Braga",
    "Web Developer",
    "JobRadar",
  ],
  openGraph: {
    title: "Flávio Silva · Software Engineer",
    description,
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_PT"],
    url: `${basePath}/`,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flávio Silva · Software Engineer",
    description,
    images: [shareImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
