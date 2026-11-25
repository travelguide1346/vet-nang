"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Play, Search } from "lucide-react";
import { EditorialArt } from "./EditorialArt";
import { parseVideoUrl } from "@/lib/video";
import type { AnyPost, FeaturedVideoItem } from "@/types/content";

interface HomeFeedProps {
  posts: AnyPost[];
  featuredVideos: FeaturedVideoItem[];
}

export function HomeFeed({ posts, featuredVideos }: HomeFeedProps) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [activeVideo, setActiveVideo] = useState<FeaturedVideoItem | null>(
    null
  );

  // Collect popular unique tags across all posts
  const topTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 4);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchFilter =
        filter === "all" ||
        p.kind === filter ||
        p.tags.some((t) => t.toLowerCase() === filter.toLowerCase());
      const extraMeta =
        p.kind === "review"
          ? `${p.brand} ${p.category} ${p.priceRange}`
          : `${p.destination} ${p.region} ${p.duration}`;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        extraMeta.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }, [posts, filter, search]);

  const activeParsed = activeVideo ? parseVideoUrl(activeVideo.url) : null;

  return (
    <div className="space-y-14">
      {/* Filter & Instant Search Bar */}
      <div className="flex flex-col justify-between gap-4 border-y border-[var(--border)] py-5 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "Tất cả bài viết" },
            { id: "review", label: "Review sản phẩm" },
            { id: "travel", label: "Hành trình & Chuyến đi" },
            ...topTags.map((t) => ({ id: t, label: `#${t}` })),
          ].map((pill) => {
            const isActive = filter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setFilter(pill.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--terra)] hover:text-[var(--ink)]"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Lọc nhanh theo từ khóa..."
            className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)] py-1.5 pl-9 pr-3 text-xs text-[var(--ink)] focus:border-[var(--terra)] focus:outline-none"
          />
        </div>
      </div>

      {/* Editorial Grid */}
      <div>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
              Tuyển chọn mới nhất
            </p>
            <h2 className="font-editorial text-2xl font-bold text-[var(--ink)]">
              Đánh giá &amp; Ghi chép đường dài
            </h2>
          </div>
          <span className="text-xs text-[var(--muted)]">
            {filteredPosts.length} bài viết
          </span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const href =
                post.kind === "review"
                  ? `/reviews/${post.slug}`
                  : `/journeys/${post.slug}`;
              const badgeScore =
                post.kind === "review" ? `${post.score} / 10` : post.duration;
              const subMeta =
                post.kind === "review"
                  ? `${post.category} · ${post.priceRange}`
                  : `${post.destination} · ${post.bestSeason}`;
              return (
                <Link
                  key={post._id}
                  href={href}
                  className="editorial-card flex flex-col overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)]">
                    {post.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <EditorialArt variant={post.coverArt || "hagiang"} />
                    )}
                    <span
                      className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-[#FAF8F5] ${
                        post.kind === "review"
                          ? "bg-[var(--terra)]"
                          : "bg-[var(--ink)]"
                      }`}
                    >
                      {badgeScore}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between space-y-3 p-5">
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider">
                        <span
                          className={
                            post.kind === "review"
                              ? "text-[var(--terra)]"
                              : "text-[var(--sage)]"
                          }
                        >
                          {post.kind === "review"
                            ? "Review sản phẩm"
                            : "Hành trình"}
                        </span>
                        <span className="font-medium text-[var(--muted)]">
                          {" "}
                          · {subMeta}
                        </span>
                      </div>
                      <h3 className="font-editorial text-xl font-bold leading-snug text-[var(--ink)]">
                        {post.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--muted)]">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
                      <span>{post.readTime}</span>
                      <span className="font-semibold text-[var(--terra)]">
                        Đọc tiếp →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--border)] py-12 text-center text-sm text-[var(--muted)]">
            Không có bài viết nào phù hợp với bộ lọc hiện tại.
          </div>
        )}
      </div>

      {/* Featured Video & Shorts Shelf */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--tint)] p-6 sm:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
              Video &amp; Shorts nổi bật
            </p>
            <h2 className="font-editorial text-2xl font-bold text-[var(--ink)]">
              Xem nhanh qua khung hình YouTube &amp; TikTok
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Tự động nhận diện khung ngang 16:9 và dọc 9:16 — chỉ tải trình phát
              khi người đọc bấm xem.
            </p>
          </div>
          <Link
            href="/studio"
            className="self-start rounded-full bg-[var(--terra)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--terra-dark)] sm:self-auto"
          >
            + Dán link YouTube / TikTok
          </Link>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-12">
          {featuredVideos.map((vid, idx) => {
            const parsed = parseVideoUrl(vid.url);
            const isWide = idx === 0 || parsed?.ratio === "16:9";
            return (
              <div
                key={vid.id}
                className={`editorial-card flex flex-col overflow-hidden rounded-xl ${
                  isWide ? "md:col-span-6" : "md:col-span-3"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveVideo(vid)}
                  className={`group relative w-full overflow-hidden bg-[#23201E] text-left ${
                    isWide ? "aspect-video" : "aspect-[9/14]"
                  }`}
                >
                  <EditorialArt
                    variant={vid.art || "hagiang"}
                    className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {parsed?.platformLabel || "Video"} · {parsed?.ratio || "16:9"}
                    {vid.durationLabel ? ` · ${vid.durationLabel}` : ""}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`flex items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-110 ${
                        isWide
                          ? "h-14 w-14 bg-[var(--terra)] text-white"
                          : "h-11 w-11 bg-white/95 text-[var(--ink)]"
                      }`}
                    >
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </span>
                  {!isWide && (
                    <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                      <p className="text-xs font-semibold leading-snug">
                        {vid.title}
                      </p>
                    </div>
                  )}
                </button>

                {isWide && (
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="font-editorial text-lg font-bold leading-snug text-[var(--ink)]">
                        {vid.title}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {vid.caption}
                      </p>
                    </div>
                    <Link
                      href={vid.linkedPostHref}
                      className="mt-3 text-xs font-semibold text-[var(--terra)] hover:underline"
                    >
                      {vid.linkedPostTitle}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Video Player Modal for Featured Shelf */}
      {activeVideo && activeParsed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveVideo(null);
          }}
        >
          <div
            className={`w-full overflow-hidden rounded-2xl bg-[#1C1917] text-[#FAF8F5] shadow-2xl ${
              activeParsed.ratio === "9:16" ? "max-w-sm" : "max-w-2xl"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#E2856D]">
                  {activeParsed.platformLabel} · {activeParsed.ratio}
                </div>
                <div className="mt-0.5 text-sm font-semibold">
                  {activeVideo.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
              >
                Đóng ✕
              </button>
            </div>
            <div className="p-4">
              {activeParsed.embedUrl ? (
                <div
                  className={
                    activeParsed.ratio === "9:16"
                      ? "mx-auto aspect-[9/16] max-h-[70vh]"
                      : "aspect-video w-full"
                  }
                >
                  <iframe
                    src={activeParsed.embedUrl}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-xl border-0"
                  />
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-white/75">
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#E2856D]"
                  >
                    Mở video trên {activeParsed.platformLabel} ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
