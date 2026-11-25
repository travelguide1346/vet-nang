import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--tint)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
        <div className="space-y-1.5">
          <Link
            href="/"
            className="font-editorial text-xl font-bold tracking-[0.04em] text-[var(--ink)]"
          >
            VỆT NẮNG
          </Link>
          <p className="max-w-md text-xs leading-relaxed text-[var(--muted)]">
            Ghi chép chậm rãi về những chuyến đi và đánh giá chân thật những món
            đồ đồng hành trên mỗi cung đường.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[var(--muted)]">
          <Link href="/" className="transition hover:text-[var(--terra)]">
            Trang chủ
          </Link>
          <Link href="/reviews" className="transition hover:text-[var(--terra)]">
            Review sản phẩm
          </Link>
          <Link href="/journeys" className="transition hover:text-[var(--terra)]">
            Hành trình
          </Link>
          <Link href="/about" className="transition hover:text-[var(--terra)]">
            Giới thiệu
          </Link>
          <Link href="/studio" className="transition hover:text-[var(--terra)]">
            Studio viết bài
          </Link>
        </div>
      </div>
    </footer>
  );
}
