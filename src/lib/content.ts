import { sanityClient, urlForImage } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  SEED_COMMENTS,
  SEED_FEATURED_VIDEOS,
  SEED_REVIEWS,
  SEED_TRAVELS,
} from "@/data/seed";
import type {
  AnyPost,
  CommentItem,
  FeaturedVideoItem,
  ReviewPost,
  TravelPost,
} from "@/types/content";

export function formatVietnameseDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day} Tháng ${month}, ${year}`;
}

export async function getAllReviews(): Promise<ReviewPost[]> {
  if (!isSanityConfigured || !sanityClient) return SEED_REVIEWS;

  try {
    const query = `*[_type == "reviewPost"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      readTime,
      excerpt,
      mainImage,
      tags,
      brand,
      category,
      priceRange,
      experienceDuration,
      score,
      verdictLabel,
      pros,
      cons,
      bestFor,
      buyLinks,
      body
    }`;
    const docs = await sanityClient.fetch<Record<string, unknown>[]>(
      query,
      {},
      { next: { revalidate: 60 } }
    );
    if (!docs || docs.length === 0) return SEED_REVIEWS;

    return docs.map((d) => ({
      _id: String(d._id),
      kind: "review",
      title: String(d.title || ""),
      slug: String(d.slug || ""),
      publishedAt: String(d.publishedAt || new Date().toISOString()),
      readTime: String(d.readTime || "6 phút đọc"),
      excerpt: String(d.excerpt || ""),
      coverImageUrl: urlForImage(d.mainImage, 1200),
      coverCaption:
        (d.mainImage as { caption?: string } | undefined)?.caption || undefined,
      tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
      brand: String(d.brand || "Đánh giá"),
      category: String(d.category || "Sản phẩm"),
      priceRange: String(d.priceRange || "Đang cập nhật"),
      experienceDuration: String(d.experienceDuration || "Thực tế"),
      score: typeof d.score === "number" ? d.score : 8.5,
      verdictLabel: String(d.verdictLabel || "Đáng cân nhắc"),
      pros: Array.isArray(d.pros) ? (d.pros as string[]) : [],
      cons: Array.isArray(d.cons) ? (d.cons as string[]) : [],
      bestFor: String(d.bestFor || ""),
      buyLinks: Array.isArray(d.buyLinks)
        ? (d.buyLinks as ReviewPost["buyLinks"])
        : [],
      body: Array.isArray(d.body) ? (d.body as unknown[]) : [],
    }));
  } catch {
    return SEED_REVIEWS;
  }
}

export async function getAllTravels(): Promise<TravelPost[]> {
  if (!isSanityConfigured || !sanityClient) return SEED_TRAVELS;

  try {
    const query = `*[_type == "travelPost"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      readTime,
      excerpt,
      mainImage,
      tags,
      destination,
      region,
      duration,
      bestSeason,
      estimatedBudget,
      totalDistanceKm,
      routeStops,
      timeline,
      gallery,
      "gearUsed": gearUsed[]->{
        "slug": slug.current,
        title,
        category,
        score,
        "shortNote": excerpt
      },
      body
    }`;
    const docs = await sanityClient.fetch<Record<string, unknown>[]>(
      query,
      {},
      { next: { revalidate: 60 } }
    );
    if (!docs || docs.length === 0) return SEED_TRAVELS;

    return docs.map((d) => ({
      _id: String(d._id),
      kind: "travel",
      title: String(d.title || ""),
      slug: String(d.slug || ""),
      publishedAt: String(d.publishedAt || new Date().toISOString()),
      readTime: String(d.readTime || "8 phút đọc"),
      excerpt: String(d.excerpt || ""),
      coverImageUrl: urlForImage(d.mainImage, 1400),
      tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
      destination: String(d.destination || "Việt Nam"),
      region: String(d.region || "Hành trình"),
      duration: String(d.duration || "3N2Đ"),
      bestSeason: String(d.bestSeason || "Quanh năm"),
      estimatedBudget: String(d.estimatedBudget || "Linh hoạt"),
      totalDistanceKm:
        typeof d.totalDistanceKm === "number" ? d.totalDistanceKm : undefined,
      routeStops: Array.isArray(d.routeStops)
        ? (d.routeStops as TravelPost["routeStops"])
        : [],
      timeline: Array.isArray(d.timeline)
        ? (d.timeline as TravelPost["timeline"])
        : [],
      gallery: Array.isArray(d.gallery)
        ? (d.gallery as Array<{ image?: unknown; caption?: string; exif?: string }>).map(
            (g) => ({
              url: urlForImage(g.image, 1400),
              caption: g.caption || "",
              exif: g.exif,
            })
          )
        : [],
      gearUsed: Array.isArray(d.gearUsed)
        ? (d.gearUsed as TravelPost["gearUsed"]).filter(Boolean)
        : [],
      body: Array.isArray(d.body) ? (d.body as unknown[]) : [],
    }));
  } catch {
    return SEED_TRAVELS;
  }
}

export async function getAllPosts(): Promise<AnyPost[]> {
  const [reviews, travels] = await Promise.all([
    getAllReviews(),
    getAllTravels(),
  ]);
  return [...travels, ...reviews].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getReviewBySlug(slug: string): Promise<ReviewPost | null> {
  const reviews = await getAllReviews();
  return reviews.find((r) => r.slug === slug) ?? null;
}

export async function getTravelBySlug(slug: string): Promise<TravelPost | null> {
  const travels = await getAllTravels();
  return travels.find((t) => t.slug === slug) ?? null;
}

export async function getFeaturedVideos(): Promise<FeaturedVideoItem[]> {
  if (!isSanityConfigured || !sanityClient) return SEED_FEATURED_VIDEOS;

  try {
    const query = `{
      "reviews": *[_type == "reviewPost"] | order(publishedAt desc) {
        "slug": slug.current,
        title,
        "videos": body[_type == "videoEmbed" && featuredOnHome == true]{ _key, url, title, caption }
      },
      "travels": *[_type == "travelPost"] | order(publishedAt desc) {
        "slug": slug.current,
        title,
        "bodyVideos": body[_type == "videoEmbed" && featuredOnHome == true]{ _key, url, title, caption },
        "timelineVideos": timeline[defined(video.url) && video.featuredOnHome == true].video{ url, title, caption }
      }
    }`;

    const data = await sanityClient.fetch<{
      reviews?: Array<{
        slug: string;
        title: string;
        videos?: Array<{ _key?: string; url?: string; title?: string; caption?: string }>;
      }>;
      travels?: Array<{
        slug: string;
        title: string;
        bodyVideos?: Array<{ _key?: string; url?: string; title?: string; caption?: string }>;
        timelineVideos?: Array<{ url?: string; title?: string; caption?: string }>;
      }>;
    }>(query, {}, { next: { revalidate: 60 } });

    const collected: FeaturedVideoItem[] = [];

    for (const trip of data?.travels || []) {
      const vids = [...(trip.bodyVideos || []), ...(trip.timelineVideos || [])];
      vids.forEach((v, idx) => {
        if (!v?.url) return;
        collected.push({
          id: `travel-${trip.slug}-${idx}`,
          url: v.url,
          title: v.title || trip.title,
          caption: v.caption || `Đính kèm trong bài: ${trip.title}`,
          linkedPostHref: `/journeys/${trip.slug}`,
          linkedPostTitle: "Đọc nhật ký hành trình →",
          art: "hagiang",
        });
      });
    }

    for (const rev of data?.reviews || []) {
      (rev.videos || []).forEach((v, idx) => {
        if (!v?.url) return;
        collected.push({
          id: `review-${rev.slug}-${idx}`,
          url: v.url,
          title: v.title || rev.title,
          caption: v.caption || `Đính kèm trong bài: ${rev.title}`,
          linkedPostHref: `/reviews/${rev.slug}`,
          linkedPostTitle: "Xem bài review →",
          art: "camera",
        });
      });
    }

    return collected.length > 0 ? collected.slice(0, 6) : SEED_FEATURED_VIDEOS;
  } catch {
    return SEED_FEATURED_VIDEOS;
  }
}

export async function getApprovedComments(
  postSlug: string
): Promise<CommentItem[]> {
  if (!isSanityConfigured || !sanityClient) {
    return SEED_COMMENTS.filter((c) => c.postSlug === postSlug && c.approved);
  }
  try {
    const query = `*[_type == "comment" && postSlug == $postSlug && approved == true] | order(createdAt desc) {
      _id, postSlug, authorName, content, approved, createdAt
    }`;
    const docs = await sanityClient.fetch<CommentItem[]>(
      query,
      { postSlug },
      { next: { revalidate: 30 } }
    );
    return docs ?? [];
  } catch {
    return SEED_COMMENTS.filter((c) => c.postSlug === postSlug && c.approved);
  }
}
