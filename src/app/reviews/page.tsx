import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { EditorialArt } from "@/components/EditorialArt";
import { formatVietnameseDate, getAllReviews } from "@/lib/content";

export const metadata: Metadata = {
  title: "Review sản phẩm",
  description:
    "Đánh giá chân thật các thiết bị công nghệ, máy ảnh và đồ dùng du lịch sau thời gian trải nghiệm thực tế.",
};

export const revalidate = 60;

export default async function ReviewsIndexPage() {
  const reviews = await getAllReviews();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10 max-w-2xl space-y-3 border-b border-[var(--border)] pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
          Chuyên mục · Đánh giá thực tế
        </span>
        <h1 className="font-editorial text-3xl font-bold text-[var(--ink)] sm:text-4xl">
          Review sản phẩm
        </h1>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Chỉ viết về những món đồ mình thực sự mang theo và sử dụng đủ lâu — có
          điểm số rõ ràng, ưu nhược điểm thẳng thắn và video trải nghiệm thực
          tế.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {reviews.map((review) => (
          <Link
            key={review._id}
            href={`/reviews/${review.slug}`}
            className="editorial-card flex flex-col overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)]">
              {review.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={review.coverImageUrl}
                  alt={review.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <EditorialArt variant={review.coverArt || "camera"} />
              )}
              <span className="absolute right-3.5 top-3.5 rounded-full bg-[var(--terra)] px-3 py-1 text-xs font-bold text-white shadow">
                {review.score} / 10
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-wider text-[var(--terra)]">
                    {review.brand}
                  </span>
                  <span>·</span>
                  <span>{review.category}</span>
                  <span>·</span>
                  <span>{review.priceRange}</span>
                </div>
                <h2 className="font-editorial text-2xl font-bold leading-snug text-[var(--ink)]">
                  {review.title}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {review.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
                <span>
                  {formatVietnameseDate(review.publishedAt)} · {review.readTime}
                </span>
                <span className="font-semibold text-[var(--terra)]">
                  Xem đánh giá →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
