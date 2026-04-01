import type { MetadataRoute } from "next";
import { learningAudiences } from "@/lib/data/learning";
import { getSpeciesSlugs } from "@/lib/data/species";

const baseUrl = "https://wild-washington.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    "",
    "/dashboard",
    "/compare",
    "/learn",
    "/conservation",
    "/methodology",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const speciesRoutes = getSpeciesSlugs().flatMap((slug) => [
    {
      url: `${baseUrl}/species/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...learningAudiences.map((audience) => ({
      url: `${baseUrl}/learn/${slug}/${audience}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  return [...routes, ...speciesRoutes];
}
