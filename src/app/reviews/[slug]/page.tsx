import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { EditorialArt } from "@/components/EditorialArt";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ShareBar } from "@/components/ShareBar";
import { CommentSection } from "@/components/CommentSection";
import {
  PortableBody,
  extractHeadingsFromPortableText,
} from "@/components/PortableBody";
import {
  formatVietnameseDate,
  getAllReviews,
  getApprovedComments,
  getReviewBySlug,
} from "@/lib/content";
import { isSafeExternalUrl } from "@/lib/video";

export const revalidate = 60;

export async function generateStaticParams() {
  const reviews = await getAllReviews();
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return { title: "Không tìm thấy bài review" };
  return {
    title: review.title,
    description: review.excerpt,
    openGraph: {
      title: review.title,
      description: review.excerpt,
      type: "article",
      images: review.coverImageUrl ? [review.coverImageUrl] : undefined,
    },
  };
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  const comments = await getApprovedComments(review.slug);

  const tocItems = [
    { id: "tom-tat", text: `Hộp tóm tắt & Chấm điểm (${review.score}/10)` },
    ...(review.body && review.body.length > 0
      ? extractHeadingsFromPortableText(review.body)
      : (review.sections || []).map((s) => ({ id: s.id, text: s.heading }))),
    { id: "binh-luan", text: "Bình luận bạn đọc" },
  ];

  const safeBuyLinks = review.buyLinks.filter((b) => isSafeExternalUrl(b.url));
  const hasAffiliate = safeBuyLinks.some((b) => b.isAffiliate);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/reviews"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--terra)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Quay lại danh mục Review
      </Link>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Main Editorial Article */}
        <article className="lg:col-span-8">
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold uppercase tracking-widest">
              <span className="text-[var(--terra)]">Review sản phẩm</span>
              <span className="text-[var(--border)]">•</span>
              <span className="text-[var(--muted)]">{review.category}</span>
            </div>

            <h1 className="font-editorial text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl">
              {review.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4 pt-1">
              <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                <span>{formatVietnameseDate(review.publishedAt)}</span>
                <span>·</span>
                <span>{review.readTime}</span>
              </div>
              <ShareBar title={review.title} />
            </div>
          </header>

          {/* Quick Info Strip */}
          <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
                Thương hiệu
              </div>
              <div className="mt-0.5 text-sm font-semibold">{review.brand}</div>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
                Trải nghiệm
              </div>
              <div className="mt-0.5 text-sm font-semibold">
                {review.experienceDuration}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
                Tầm giá
              </div>
              <div className="mt-0.5 text-sm font-semibold">
                {review.priceRange}
              </div>
            </div>
            <div className="rounded-xl border border-[#EDCFC5] bg-[var(--terra-soft)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--terra)]">
                Điểm đánh giá
              </div>
              <div className="mt-0.5 text-sm font-bold text-[var(--terra)]">
                {review.score} / 10
              </div>
            </div>
          </div>

          {/* Hero Cover */}
          <figure className="mb-9">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)]">
              {review.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={review.coverImageUrl}
                  alt={review.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <EditorialArt variant={review.coverArt || "camera"} />
              )}
            </div>
            {review.coverCaption && (
              <figcaption className="mt-2.5 text-center text-xs text-[var(--muted)]">
                {review.coverCaption}
              </figcaption>
            )}
          </figure>

          {/* Verdict Box */}
          <section
            id="tom-tat"
            className="mb-10 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_8px_24px_-14px_rgba(28,25,23,0.08)] sm:p-7"
          >
            <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
                  Hộp tóm tắt nhanh
                </span>
                <h2 className="font-editorial mt-1 text-2xl font-bold text-[var(--ink)]">
                  Kết luận chung
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[var(--terra)] font-bold text-white">
                  <span className="text-xl leading-none">{review.score}</span>
                  <span className="text-[10px] opacity-85">/ 10</span>
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-[var(--ink)]">
                    {review.verdictLabel}
                  </div>
                  <div className="text-[var(--muted)]">{review.category}</div>
                </div>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[var(--sage)]">
                  Ưu điểm nổi bật
                </h3>
                <ul className="space-y-2 text-sm">
                  {review.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-[var(--sage)]">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[var(--terra)]">
                  Nhược điểm cần cân nhắc
                </h3>
                <ul className="space-y-2 text-sm">
                  {review.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-[var(--terra)]">—</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {review.bestFor && (
              <div className="mb-5 rounded-xl bg-[var(--tint)] p-4 text-sm leading-relaxed">
                <strong className="text-[var(--ink)]">Phù hợp với ai: </strong>
                <span className="text-[#36302B]">{review.bestFor}</span>
              </div>
            )}

            {safeBuyLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap gap-2.5">
                  {safeBuyLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        idx === 0
                          ? "inline-flex items-center gap-1.5 rounded-full bg-[var(--terra)] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[var(--terra-dark)]"
                          : "inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--terra)]"
                      }
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
                {hasAffiliate && (
                  <span className="text-[11px] text-[var(--muted)]">
                    * Có thể chứa liên kết tiếp thị (Affiliate)
                  </span>
                )}
              </div>
            )}
          </section>

          {/* Body Content (Sanity Portable Text OR Seed Sections) */}
          {review.body && review.body.length > 0 ? (
            <PortableBody value={review.body} />
          ) : (
            <div className="prose-editorial">
              {(review.sections || []).map((section) => (
                <section key={section.id}>
                  <h2 id={section.id}>{section.heading}</h2>
                  {section.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  {section.video && (
                    <VideoEmbed
                      url={section.video.url}
                      title={section.video.title}
                      caption={section.video.caption}
                    />
                  )}
                </section>
              ))}
            </div>
          )}

          {/* Tags */}
          {review.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {review.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Sanity Moderated Comments */}
          <CommentSection postSlug={review.slug} initialComments={comments} />
        </article>

        {/* Sticky Sidebar: Auto Table of Contents + Related Journey */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
              Mục lục bài viết
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--muted)]">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block transition hover:text-[var(--terra)]"
                  >
                    • {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {review.relatedJourneySlug && review.relatedJourneyTitle && (
            <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--tint)] p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                Xuất hiện trong hành trình
              </div>
              <h3 className="font-editorial text-lg font-bold leading-snug text-[var(--ink)]">
                {review.relatedJourneyTitle}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--muted)]">
                Xem cách sản phẩm này thể hiện trong điều kiện di chuyển thực tế.
              </p>
              <Link
                href={`/journeys/${review.relatedJourneySlug}`}
                className="inline-block text-xs font-semibold text-[var(--terra)] hover:underline"
              >
                Đọc bài hành trình →
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
