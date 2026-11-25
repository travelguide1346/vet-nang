"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EditorialArt } from "./EditorialArt";
import type { GalleryPhoto } from "@/types/content";

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setActiveIndex((i) =>
          i === null ? 0 : (i - 1 + photos.length) % photos.length
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, photos.length]);

  if (!photos || photos.length === 0) return null;

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section id="thu-vien-anh" className="mb-12 scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
            Thư viện ảnh tạp chí
          </span>
          <h2 className="font-editorial mt-0.5 text-2xl font-bold text-[var(--ink)]">
            Những khung hình giữ lại
          </h2>
        </div>
        <span className="text-xs text-[var(--muted)]">
          Bấm vào ảnh để phóng to
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {photos.map((photo, idx) => (
          <button
            key={`${photo.caption}-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] text-left transition hover:border-[#D4C8BA]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              {photo.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <EditorialArt
                  variant={photo.art || "thamma"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-2.5 text-xs text-[var(--muted)]">
              {photo.caption}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveIndex(null);
          }}
        >
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-[#1C1917] text-[#FAF8F5] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs">
              <span className="text-white/75">
                {activePhoto.exif || `Ảnh ${activeIndex + 1} / ${photos.length}`}
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 hover:bg-white/20"
              >
                <X className="h-3.5 w-3.5" />
                <span>Đóng</span>
              </button>
            </div>

            <div className="aspect-[16/10] w-full bg-black/40">
              {activePhoto.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="h-full w-full object-contain"
                />
              ) : (
                <EditorialArt
                  variant={activePhoto.art || "thamma"}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm">
              <span className="font-editorial">{activePhoto.caption}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + photos.length) % photos.length
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Trước
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex + 1) % photos.length)
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
                >
                  Sau
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
