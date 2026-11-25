"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { parseVideoUrl, type ParsedVideo } from "@/lib/video";

interface VideoEmbedProps {
  url: string;
  title?: string;
  caption?: string;
  compact?: boolean;
}

/**
 * Editorial Lazy-load Video Embed for YouTube (16:9), YouTube Shorts (9:16),
 * and TikTok (9:16, including vt.tiktok.com / vm.tiktok.com short links).
 *
 * - Horizontal videos render full-width 16:9.
 * - Vertical videos render in a refined 2-column magazine split with caption alongside,
 *   preventing black bars on desktop while remaining full-bleed on mobile.
 * - No third-party player iframe is loaded until the reader clicks Play.
 */
export function VideoEmbed({ url, title, caption, compact = false }: VideoEmbedProps) {
  const baseParsed = parseVideoUrl(url);
  const [resolvedEntry, setResolvedEntry] = useState<{
    url: string;
    data: ParsedVideo;
  } | null>(null);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [failedThumbUrl, setFailedThumbUrl] = useState<string | null>(null);

  const playing = playingUrl === url;
  const thumbFailed = failedThumbUrl === url;
  const resolved =
    resolvedEntry && resolvedEntry.url === url ? resolvedEntry.data : baseParsed;

  useEffect(() => {
    const parsed = parseVideoUrl(url);
    if (!parsed || !parsed.needsServerResolve) return;

    let cancelled = false;
    fetch(`/api/video/resolve?url=${encodeURIComponent(url)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && !data.error) {
          setResolvedEntry({ url, data: { ...parsed, ...data } });
        }
      })
      .catch(() => {
        // Keep base parsed info if offline or oEmbed blocked
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  const setPlaying = (next: boolean) => setPlayingUrl(next ? url : null);
  const setThumbFailed = (next: boolean) =>
    setFailedThumbUrl(next ? url : null);

  if (!resolved) {
    return (
      <div className="my-6 rounded-xl border border-[var(--border)] bg-[var(--tint)] p-4 text-xs text-[var(--muted)]">
        Đường link video chưa hợp lệ (chỉ hỗ trợ YouTube và TikTok):{" "}
        <code className="break-all rounded bg-white px-1.5 py-0.5 text-[var(--terra)]">
          {url}
        </code>
      </div>
    );
  }

  const displayTitle = title || `${resolved.platformLabel} Video`;
  const displayCaption =
    caption || "Bấm phát để xem video trực tiếp ngay trong bài viết.";

  // --- HORIZONTAL 16:9 LAYOUT (YouTube Standard) ---
  if (resolved.ratio === "16:9") {
    return (
      <figure className="my-7 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="relative aspect-video w-full bg-[#211E1C]">
          {playing && resolved.embedUrl ? (
            <iframe
              src={resolved.embedUrl}
              title={displayTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group relative flex h-full w-full items-center justify-center overflow-hidden text-left"
              aria-label={`Phát video ${displayTitle}`}
            >
              {resolved.thumbnailUrl && !thumbFailed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolved.thumbnailUrl}
                  alt={displayTitle}
                  loading="lazy"
                  onError={() => setThumbFailed(true)}
                  className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#3B473D] to-[#1E1B19]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                {resolved.platformLabel} · 16:9
              </span>
              <span className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-[var(--terra)] text-white shadow-xl transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6 fill-current" />
              </span>
              <span className="absolute bottom-4 left-4 right-4 font-editorial text-base font-semibold text-white sm:text-lg">
                {displayTitle}
              </span>
            </button>
          )}
        </div>
        <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-[var(--muted)]">
          <span>{displayCaption}</span>
          <a
            href={resolved.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[var(--terra)] hover:underline"
          >
            Mở trên {resolved.platformLabel}
            <ExternalLink className="h-3 w-3" />
          </a>
        </figcaption>
      </figure>
    );
  }

  // --- VERTICAL 9:16 EDITORIAL SPLIT LAYOUT (TikTok & YouTube Shorts) ---
  return (
    <figure
      className={`my-8 grid grid-cols-1 items-center gap-6 rounded-2xl border border-[var(--border)] bg-[var(--tint)] ${
        compact ? "p-4 sm:grid-cols-12" : "p-5 sm:grid-cols-12 sm:p-6"
      }`}
    >
      <div className="sm:col-span-5">
        <div className="relative mx-auto aspect-[9/16] max-w-[240px] overflow-hidden rounded-xl bg-[#1C1917] shadow-md">
          {playing && resolved.embedUrl ? (
            <iframe
              src={resolved.embedUrl}
              title={displayTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                if (resolved.embedUrl) {
                  setPlaying(true);
                } else {
                  window.open(resolved.originalUrl, "_blank", "noopener,noreferrer");
                }
              }}
              className="group relative flex h-full w-full items-center justify-center overflow-hidden"
              aria-label={`Phát clip dọc ${displayTitle}`}
            >
              {resolved.thumbnailUrl && !thumbFailed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolved.thumbnailUrl}
                  alt={displayTitle}
                  loading="lazy"
                  onError={() => setThumbFailed(true)}
                  className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-b from-[#C8A78B] via-[#5A4B40] to-[#1E1A18]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
              <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {resolved.platformLabel} · 9:16
              </span>
              <span className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[var(--ink)] shadow-lg transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </span>
              {resolved.handle && (
                <span className="absolute bottom-3 left-3 right-3 truncate text-center text-[11px] font-medium text-white/90">
                  {resolved.handle}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      <figcaption className="space-y-2.5 sm:col-span-7">
        <span className="inline-block rounded-full bg-[var(--terra-soft)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--terra)]">
          Clip ngắn · {resolved.platformLabel}
        </span>
        <h3 className="font-editorial text-xl font-bold leading-snug text-[var(--ink)]">
          {displayTitle}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {displayCaption}
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          {!playing && resolved.embedUrl && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="text-xs font-semibold text-[var(--terra)] hover:underline"
            >
              ▶ Phát clip ngay tại đây
            </button>
          )}
          <a
            href={resolved.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--ink)] hover:underline"
          >
            Xem link gốc
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </figcaption>
    </figure>
  );
}
