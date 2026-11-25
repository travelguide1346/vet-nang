import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { EditorialArt } from "@/components/EditorialArt";
import { TravelMap } from "@/components/TravelMap";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ShareBar } from "@/components/ShareBar";
import { CommentSection } from "@/components/CommentSection";
import { PortableBody } from "@/components/PortableBody";
import {
  formatVietnameseDate,
  getAllTravels,
  getApprovedComments,
  getTravelBySlug,
} from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  const travels = await getAllTravels();
  return travels.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTravelBySlug(slug);
  if (!trip) return { title: "Không tìm thấy bài hành trình" };
  return {
    title: trip.title,
    description: trip.excerpt,
    openGraph: {
      title: trip.title,
      description: trip.excerpt,
      type: "article",
      images: trip.coverImageUrl ? [trip.coverImageUrl] : undefined,
    },
  };
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = await getTravelBySlug(slug);
  if (!trip) notFound();

  const comments = await getApprovedComments(trip.slug);

  const tocItems = [
    { id: "tong-quan", text: "Tổng quan & Chi phí" },
    ...(trip.routeStops.length > 0
      ? [{ id: "ban-do", text: "Bản đồ lộ trình tương tác" }]
      : []),
    ...(trip.timeline.length > 0
      ? [{ id: "lo-trinh", text: "Lộ trình theo từng ngày" }]
      : []),
    ...(trip.gallery.length > 0
      ? [{ id: "thu-vien-anh", text: "Thư viện ảnh (Lightbox)" }]
      : []),
    ...(trip.gearUsed.length > 0
      ? [{ id: "do-mang-theo", text: "Đồ mình mang theo" }]
      : []),
    { id: "binh-luan", text: "Bình luận bạn đọc" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/journeys"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--terra)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Quay lại danh mục Hành trình
      </Link>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Main Editorial Article */}
        <article className="lg:col-span-8">
          <header className="mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold uppercase tracking-widest">
              <span className="text-[var(--terra)]">Nhật ký hành trình</span>
              <span className="text-[var(--border)]">•</span>
              <span className="text-[var(--muted)]">{trip.region}</span>
            </div>

            <h1 className="font-editorial text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl">
              {trip.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4 pt-1">
              <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                <span>{formatVietnameseDate(trip.publishedAt)}</span>
                <span>·</span>
                <span>{trip.readTime}</span>
              </div>
              <ShareBar title={trip.title} />
            </div>
          </header>

          {/* Trip Overview Cards */}
          <div
            id="tong-quan"
            className="mb-8 grid scroll-mt-24 grid-cols-2 gap-3 sm:grid-cols-4"
          >
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
                Điểm đến
              </div>
              <div className="mt-0.5 text-sm font-semibold">
                {trip.destination}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
                Thời lượng
              </div>
              <div className="mt-0.5 text-sm font-semibold">
                {trip.duration}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
                Thời điểm đẹp
              </div>
              <div className="mt-0.5 text-sm font-semibold">
                {trip.bestSeason}
              </div>
            </div>
            <div className="rounded-xl border border-[#EDCFC5] bg-[var(--terra-soft)] p-3.5">
              <div className="text-[11px] uppercase tracking-wider text-[var(--terra)]">
                Chi phí ước tính
              </div>
              <div className="mt-0.5 text-sm font-bold text-[var(--terra)]">
                {trip.estimatedBudget}
              </div>
            </div>
          </div>

          {/* Hero Cover */}
          <div className="mb-8 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)]">
            {trip.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={trip.coverImageUrl}
                alt={trip.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <EditorialArt variant={trip.coverArt || "hagiang"} />
            )}
          </div>

          {/* Intro Prose */}
          {trip.introParagraphs && trip.introParagraphs.length > 0 && (
            <div className="prose-editorial mb-9">
              {trip.introParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {/* Real Interactive Leaflet Map */}
          {trip.routeStops.length > 0 && (
            <TravelMap
              stops={trip.routeStops}
              title={`Lộ trình ${trip.destination}`}
              totalDistanceKm={trip.totalDistanceKm}
            />
          )}

          {/* Day-by-Day Timeline */}
          {trip.timeline.length > 0 && (
            <section id="lo-trinh" className="mb-12 scroll-mt-24">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
                  Nhật ký theo ngày
                </span>
                <h2 className="font-editorial mt-0.5 text-2xl font-bold text-[var(--ink)]">
                  Lộ trình chi tiết
                </h2>
              </div>

              <div className="relative space-y-9 border-l-2 border-[#E2D5C5] pl-7">
                {trip.timeline.map((day, idx) => (
                  <div key={`${day.dayNumber}-${idx}`} className="relative">
                    <span className="absolute -left-[35px] top-1.5 h-3.5 w-3.5 rounded-full bg-[var(--terra)] ring-4 ring-[var(--paper)]" />
                    <div className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
                      {day.dayNumber} · {day.routeTitle}
                    </div>
                    <h3 className="font-editorial mb-2 mt-1 text-xl font-bold text-[var(--ink)]">
                      {day.headline}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#36302B]">
                      {day.story}
                    </p>
                    {day.video && (
                      <VideoEmbed
                        url={day.video.url}
                        title={day.video.title}
                        caption={day.video.caption}
                        compact
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Extra Sanity Portable Text Body (if authored in Studio) */}
          {trip.body && trip.body.length > 0 && <PortableBody value={trip.body} />}

          {/* Magazine Photo Gallery + Lightbox */}
          <PhotoGallery photos={trip.gallery} />

          {/* Cross-Linked Gear Used -> Product Reviews */}
          {trip.gearUsed.length > 0 && (
            <section
              id="do-mang-theo"
              className="mb-10 scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--tint)] p-6"
            >
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
                  Kết nối Review sản phẩm
                </span>
                <h2 className="font-editorial mt-0.5 text-2xl font-bold text-[var(--ink)]">
                  Đồ mình mang theo trong chuyến này
                </h2>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Bấm vào từng món để xem bài đánh giá chi tiết sau khi trải
                  nghiệm thực tế.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {trip.gearUsed.map((gear) => (
                  <Link
                    key={gear.slug}
                    href={`/reviews/${gear.slug}`}
                    className="editorial-card flex items-center justify-between gap-3 rounded-xl p-4"
                  >
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--terra)]">
                        {gear.category}
                      </div>
                      <div className="font-editorial mt-0.5 text-base font-bold text-[var(--ink)]">
                        {gear.title}
                      </div>
                      <div className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                        {gear.shortNote}
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-[var(--terra-soft)] px-2.5 py-1 text-xs font-bold text-[var(--terra)]">
                      {gear.score}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Moderated Comments */}
          <CommentSection postSlug={trip.slug} initialComments={comments} />
        </article>

        {/* Sticky Sidebar TOC */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
              Mục lục hành trình
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
        </aside>
      </div>
    </div>
  );
}
