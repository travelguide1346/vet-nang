"use client";

import React, { useState } from "react";
import { VideoEmbed } from "./VideoEmbed";
import { parseVideoUrl } from "@/lib/video";

const SAMPLES = {
  yt: {
    url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    title: "Vlog 4 ngày đi chậm trên cung đường đèo Hà Giang",
    caption: "Tự động nhận diện khung ngang 16:9 chuẩn tạp chí.",
  },
  shorts: {
    url: "https://www.youtube.com/shorts/9bZkp7q19f0",
    title: "Pha pour-over 6h sáng giữa rừng thông Đà Lạt",
    caption: "YouTube Shorts tự động chuyển sang bố cục dọc 9:16 song song với chú thích.",
  },
  tiktok: {
    url: "https://www.tiktok.com/@vetnang.journal/video/7392817263541209350",
    title: "Mở hộp nhanh Fujifilm X100VI & xem màu Classic Neg",
    caption: "Clip TikTok tự gọi oEmbed để lấy ảnh bìa và phát mượt mà.",
  },
};

export function StudioOnboarding() {
  const [url, setUrl] = useState(SAMPLES.yt.url);
  const [title, setTitle] = useState(SAMPLES.yt.title);
  const [caption, setCaption] = useState(SAMPLES.yt.caption);

  const parsed = parseVideoUrl(url);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 sm:py-14">
      {/* Sanity Studio Setup Checklist */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
          Sanity CMS Studio · Chế độ sẵn sàng kết nối
        </span>
        <h1 className="font-editorial mt-1 text-3xl font-bold text-[var(--ink)]">
          Kích hoạt trang viết bài Sanity Studio trong 3 phút
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Toàn bộ khuôn bài <strong>Review sản phẩm</strong>,{" "}
          <strong>Hành trình (kèm bản đồ &amp; đồ mang theo)</strong>,{" "}
          <strong>Block Video YouTube/TikTok</strong> và{" "}
          <strong>Duyệt bình luận</strong> đã được lập trình sẵn trong thư mục{" "}
          <code className="rounded bg-[var(--tint)] px-1.5 py-0.5 text-xs">
            src/sanity/schemaTypes
          </code>
          . Để mở giao diện quản trị thực tế ngay tại trang{" "}
          <code className="rounded bg-[var(--tint)] px-1.5 py-0.5 text-xs">
            /studio
          </code>
          , bạn chỉ cần làm 3 bước miễn phí:
        </p>

        <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <li className="rounded-xl border border-[var(--border)] bg-[var(--paper)] p-4 text-xs leading-relaxed">
            <div className="mb-1.5 font-bold text-[var(--terra)]">
              Bước 1 · Tạo dự án Sanity miễn phí
            </div>
            Vào{" "}
            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline text-[var(--ink)]"
            >
              sanity.io/manage
            </a>
            , đăng nhập bằng Google/GitHub, tạo dự án mới (dataset{" "}
            <code>production</code>) và chép mã <strong>Project ID</strong>.
          </li>

          <li className="rounded-xl border border-[var(--border)] bg-[var(--paper)] p-4 text-xs leading-relaxed">
            <div className="mb-1.5 font-bold text-[var(--terra)]">
              Bước 2 · Điền vào file .env.local
            </div>
            Sao chép file <code>.env.example</code> thành <code>.env.local</code>{" "}
            và dán mã vào dòng{" "}
            <code>NEXT_PUBLIC_SANITY_PROJECT_ID=ma_cua_ban</code>. Thêm{" "}
            <code>SANITY_API_WRITE_TOKEN</code> nếu muốn duyệt bình luận.
          </li>

          <li className="rounded-xl border border-[var(--border)] bg-[var(--paper)] p-4 text-xs leading-relaxed">
            <div className="mb-1.5 font-bold text-[var(--terra)]">
              Bước 3 · Mở lại /studio &amp; viết bài
            </div>
            Khởi động lại <code>npm run dev</code> (hoặc khai báo biến môi
            trường trên Vercel). Trang <code>/studio</code> sẽ tự động mở Sanity
            Studio chính chủ để bạn đăng bài ngay!
          </li>
        </ol>
      </section>

      {/* Live Video Embed Sandbox */}
      <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 lg:col-span-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
              Thử nghiệm trình nhúng thật
            </span>
            <h2 className="font-editorial mt-1 text-2xl font-bold text-[var(--ink)]">
              Dán thử link YouTube / TikTok
            </h2>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--muted)]">
              Đường link video
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... hoặc https://vt.tiktok.com/..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2.5 text-sm focus:border-[var(--terra)] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setUrl(SAMPLES.yt.url);
                setTitle(SAMPLES.yt.title);
                setCaption(SAMPLES.yt.caption);
              }}
              className="rounded-full border border-[var(--border)] bg-[var(--tint)] px-3 py-1.5 text-xs font-medium hover:border-[var(--terra)]"
            >
              YouTube 16:9
            </button>
            <button
              type="button"
              onClick={() => {
                setUrl(SAMPLES.shorts.url);
                setTitle(SAMPLES.shorts.title);
                setCaption(SAMPLES.shorts.caption);
              }}
              className="rounded-full border border-[var(--border)] bg-[var(--tint)] px-3 py-1.5 text-xs font-medium hover:border-[var(--terra)]"
            >
              YouTube Shorts 9:16
            </button>
            <button
              type="button"
              onClick={() => {
                setUrl(SAMPLES.tiktok.url);
                setTitle(SAMPLES.tiktok.title);
                setCaption(SAMPLES.tiktok.caption);
              }}
              className="rounded-full border border-[var(--border)] bg-[var(--tint)] px-3 py-1.5 text-xs font-medium hover:border-[var(--terra)]"
            >
              TikTok 9:16
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--muted)]">
              Tiêu đề ngắn
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2 text-sm focus:border-[var(--terra)] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--muted)]">
              Chú thích kèm video
            </label>
            <textarea
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--paper)] px-3.5 py-2 text-sm focus:border-[var(--terra)] focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--tint)] p-3.5 text-xs">
            {parsed ? (
              <div className="space-y-1">
                <div>
                  Nền tảng: <strong>{parsed.platformLabel}</strong> · Tỷ lệ tự
                  động:{" "}
                  <strong className="text-[var(--terra)]">
                    {parsed.ratio}
                  </strong>
                </div>
                <div className="truncate text-[var(--muted)]">
                  Video ID: <code>{parsed.videoId}</code>
                </div>
              </div>
            ) : (
              <span className="text-[var(--terra)]">
                Hãy dán một đường link YouTube, YouTube Shorts hoặc TikTok hợp
                lệ.
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 lg:col-span-7">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
            Xem trước trực tiếp trong bài viết
          </div>
          <VideoEmbed url={url} title={title} caption={caption} />
        </div>
      </section>
    </div>
  );
}
