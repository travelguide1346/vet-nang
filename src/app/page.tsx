import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialArt } from "@/components/EditorialArt";
import { HomeFeed } from "@/components/HomeFeed";
import {
  formatVietnameseDate,
  getAllPosts,
  getFeaturedVideos,
} from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, featuredVideos] = await Promise.all([
    getAllPosts(),
    getFeaturedVideos(),
  ]);

  const heroPost = posts[0];
  const heroHref =
    heroPost?.kind === "review"
      ? `/reviews/${heroPost.slug}`
      : `/journeys/${heroPost?.slug || ""}`;

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero Editorial Spread */}
      {heroPost && (
        <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <Link
            href={heroHref}
            className="group overflow-hidden rounded-2xl border border-[var(--border)] lg:col-span-7"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              {heroPost.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroPost.coverImageUrl}
                  alt={heroPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <EditorialArt
                  variant={heroPost.coverArt || "hagiang"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
            </div>
          </Link>

          <div className="space-y-4 lg:col-span-5">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider">
              <span className="text-[var(--terra)]">
                Bài nổi bật ·{" "}
                {heroPost.kind === "travel" ? "Hành trình" : "Review sản phẩm"}
              </span>
              <span className="text-[var(--border)]">•</span>
              <span className="text-[var(--muted)]">
                {heroPost.kind === "travel"
                  ? heroPost.duration
                  : `${heroPost.score} / 10`}
              </span>
            </div>

            <h1 className="font-editorial text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl">
              <Link
                href={heroHref}
                className="transition-colors hover:text-[var(--terra)]"
              >
                {heroPost.title}
              </Link>
            </h1>

            <p className="text-base leading-relaxed text-[var(--muted)]">
              {heroPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[var(--muted)]">
              <span>{formatVietnameseDate(heroPost.publishedAt)}</span>
              <span>·</span>
              <span>{heroPost.readTime}</span>
            </div>

            <div className="pt-2">
              <Link
                href={heroHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--terra)] transition hover:gap-3"
              >
                <span>
                  {heroPost.kind === "travel"
                    ? "Đọc nhật ký hành trình"
                    : "Đọc bài đánh giá chi tiết"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      )}

      {/* Interactive Filter, Grid & Featured Videos */}
      <HomeFeed posts={posts} featuredVideos={featuredVideos} />
    </div>
  );
}
