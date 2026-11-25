import type { MetadataRoute } from "next";
import { getAllReviews, getAllTravels } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");

  const [reviews, travels] = await Promise.all([
    getAllReviews(),
    getAllTravels(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/reviews`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/journeys`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const reviewRoutes: MetadataRoute.Sitemap = reviews.map((r) => ({
    url: `${siteUrl}/reviews/${r.slug}`,
    lastModified: new Date(r.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const travelRoutes: MetadataRoute.Sitemap = travels.map((t) => ({
    url: `${siteUrl}/journeys/${t.slug}`,
    lastModified: new Date(t.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...reviewRoutes, ...travelRoutes];
}
