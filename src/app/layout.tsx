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
  "Flávio Silva — Software Engineering Master's student at the University of Minho (Braga, Portugal). Projects in C, Vue.js, React Native, Node.js and Kubernetes.";

export const metadata: Metadata = {
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
  ],
  openGraph: {
    title: "Flávio Silva · Software Engineer",
    description,
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_PT"],
    images: [{ url: "/profile4.jpg", width: 988, height: 1123, alt: "Flávio Silva" }],
  },
  twitter: {
    card: "summary",
    title: "Flávio Silva · Software Engineer",
    description,
    images: ["/profile4.jpg"],
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
