import type { Metadata } from "next";
import HomePageClient from "@/app/HomePageClient";
import { ExaiJsonLd } from "@/app/components/seo/ExaiJsonLd";

const homeDescription =
  "EXAI is a high-level AI datathon by ENSIA Tech Community — ML, CV, NLP, and data challenges. Register your team for May 2026.";

export const metadata: Metadata = {
  title: {
    absolute: "EXAI - ETC Datathon",
  },
  description: homeDescription,
  openGraph: {
    title: "EXAI — AI Datathon",
    description: homeDescription,
    url: "/",
  },
  twitter: {
    title: "EXAI — AI Datathon",
    description: homeDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <ExaiJsonLd />
      <HomePageClient />
    </>
  );
}
