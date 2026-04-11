import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const paths: {
    path: string;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    priority: number;
  }[] = [
      { path: "", changeFrequency: "weekly", priority: 1 },
      { path: "/register", changeFrequency: "weekly", priority: 0.95 },
      { path: "/register/solo", changeFrequency: "monthly", priority: 0.85 },
      { path: "/register/create-team", changeFrequency: "monthly", priority: 0.85 },
      { path: "/register/join-team", changeFrequency: "monthly", priority: 0.85 },
      { path: "/register/success", changeFrequency: "monthly", priority: 0.3 },
    ];

  return paths.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
