import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

const defaultDescription =
  "EXAI is a high-level AI datathon by ENSIA Tech Community — team challenges in machine learning, computer vision, NLP, and data engineering. Register to compete.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EXAI - ETC Datathon",
    template: "%s | EXAI",
  },
  description: defaultDescription,
  applicationName: "EXAI",
  authors: [{ name: "ENSIA Tech Community", url: siteUrl }],
  creator: "ENSIA Tech Community",
  publisher: "ENSIA Tech Community",
  keywords: [
    "EXAI",
    "datathon",
    "AI competition",
    "machine learning",
    "ENSIA",
    "Algeria",
    "hackathon",
    "deep learning",
    "NLP",
    "computer vision",
  ],
  category: "technology",
  icons: {
    icon: "/logos/1-06.png",
    apple: "/logos/1-06.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EXAI",
    title: "EXAI — AI Datathon",
    description: defaultDescription,
    images: [
      {
        url: "/logos/1-05.png",
        width: 673,
        height: 262,
        alt: "EXAI — AI Datathon logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EXAI — AI Datathon",
    description: defaultDescription,
    images: ["/logos/1-05.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
