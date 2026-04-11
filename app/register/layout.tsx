import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Sign up for EXAI — the AI datathon by ENSIA Tech Community. Create a team, join with an invite code, or register solo.",
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: "Register for EXAI",
    description:
      "Join the EXAI datathon: create a team, join with an invite, or register as a solo participant.",
    url: "/register",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register for EXAI",
    description: "Join the EXAI AI datathon by ENSIA Tech Community.",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
