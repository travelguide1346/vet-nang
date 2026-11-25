import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { EditorialArt } from "@/components/EditorialArt";
import { formatVietnameseDate, getAllTravels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hành trình & Chuyến đi",
  description:
    "Nhật ký du lịch đi chậm kèm bản đồ lộ trình OpenStreetMap, thư viện ảnh và danh sách đồ mang theo.",
};

export const revalidate = 60;

export default async function JourneysIndexPage() {
  const travels = await getAllTravels();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10 max-w-2xl space-y-3 border-b border-[var(--border)] pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
          Chuyên mục · Nhật ký đường dài
        </span>
        <h1 className="font-editorial text-3xl font-bold text-[var(--ink)] sm:text-4xl">
          Hành trình &amp; Chuyến đi
        </h1>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Ghi chép lại những cung đường đáng nhớ với lộ trình từng ngày, bản đồ
          tương tác, khung hình chụp trên đường và những món đồ đã đồng hành.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {travels.map((trip) => (
          <Link
            key={trip._id}
            href={`/journeys/${trip.slug}`}
            className="editorial-card flex flex-col overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)]">
              {trip.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={trip.coverImageUrl}
                  alt={trip.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <EditorialArt variant={trip.coverArt || "hagiang"} />
              )}
              <span className="absolute right-3.5 top-3.5 rounded-full bg-[var(--ink)] px-3 py-1 text-xs font-bold text-[#FAF8F5]">
                {trip.duration}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-wider text-[var(--sage)]">
                    {trip.region}
                  </span>
                  <span>·</span>
                  <span>{trip.destination}</span>
                  <span>·</span>
                  <span>{trip.estimatedBudget}</span>
                </div>
                <h2 className="font-editorial text-2xl font-bold leading-snug text-[var(--ink)]">
                  {trip.title}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {trip.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
                <span>
                  {formatVietnameseDate(trip.publishedAt)} · {trip.readTime}
                </span>
                <span className="font-semibold text-[var(--terra)]">
                  Đọc nhật ký →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
