import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Compass, Film, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Câu chuyện đằng sau Vệt Nắng — nơi lưu giữ những bài đánh giá sản phẩm thực tế và nhật ký hành trình.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 space-y-4 border-b border-[var(--border)] pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
          Về góc viết nhỏ này
        </span>
        <h1 className="font-editorial text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl">
          Viết chậm về những chuyến đi và những món đồ thật sự đồng hành
        </h1>
        <p className="text-base leading-relaxed text-[var(--muted)]">
          Vệt Nắng ra đời từ mong muốn có một không gian riêng — không bị thuật
          toán mạng xã hội cuốn trôi — để lưu lại những cung đường đáng nhớ và
          đánh giá thẳng thắn các sản phẩm đã qua trải nghiệm thực tế.
        </p>
      </header>

      <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2">
          <PackageCheck className="h-5 w-5 text-[var(--terra)]" />
          <h2 className="font-editorial text-lg font-bold">Review có trách nhiệm</h2>
          <p className="text-xs leading-relaxed text-[var(--muted)]">
            Chỉ viết đánh giá sau thời gian sử dụng đủ lâu, luôn nêu rõ cả ưu
            điểm lẫn điểm chưa ưng ý.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2">
          <Compass className="h-5 w-5 text-[var(--sage)]" />
          <h2 className="font-editorial text-lg font-bold">Hành trình đi chậm</h2>
          <p className="text-xs leading-relaxed text-[var(--muted)]">
            Mỗi chuyến đi đều có bản đồ lộ trình, chi phí thực tế và liên kết
            đến những món đồ mình đã mang theo.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2">
          <Film className="h-5 w-5 text-[var(--terra)]" />
          <h2 className="font-editorial text-lg font-bold">Kết hợp YouTube &amp; TikTok</h2>
          <p className="text-xs leading-relaxed text-[var(--muted)]">
            Đọc chữ để đi sâu vào chi tiết và bấm xem ngay video YouTube hoặc
            clip dọc TikTok để cảm nhận không khí thật.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--tint)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-[var(--ink)]">
            Kết nối &amp; Cộng tác
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Bạn có thể cập nhật địa chỉ email và link kênh YouTube / TikTok cá
            nhân ngay trong file <code className="rounded bg-white px-1.5 py-0.5 text-xs">src/app/about/page.tsx</code>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/reviews"
            className="rounded-full bg-[var(--terra)] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[var(--terra-dark)]"
          >
            Xem bài Review
          </Link>
          <Link
            href="/journeys"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--terra)]"
          >
            Xem Hành trình
          </Link>
        </div>
      </div>
    </div>
  );
}
