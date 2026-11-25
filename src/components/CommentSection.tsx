"use client";

import React, { useState } from "react";
import type { CommentItem } from "@/types/content";

interface CommentSectionProps {
  postSlug: string;
  initialComments: CommentItem[];
}

export function CommentSection({
  postSlug,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [website, setWebsite] = useState(""); // Anti-spam honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingInfo, setPendingInfo] = useState<{
    message: string;
    mode: "sanity" | "demo";
    commentId?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug, authorName, content, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Không thể gửi bình luận.");
      } else {
        setAuthorName("");
        setContent("");
        setPendingInfo({
          message:
            data.message ||
            "Cảm ơn bạn! Bình luận đang chờ duyệt trước khi hiển thị.",
          mode: data.mode === "sanity" ? "sanity" : "demo",
          commentId: data.commentId,
        });
      }
    } catch {
      setError("Có lỗi kết nối, vui lòng thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoApprove = async () => {
    if (!pendingInfo?.commentId) return;
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        demoApprove: true,
        commentId: pendingInfo.commentId,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev]);
        setPendingInfo(null);
      }
    }
  };

  return (
    <section
      id="binh-luan"
      className="mt-14 scroll-mt-24 border-t border-[var(--border)] pt-9"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-[var(--ink)]">
            Bình luận của bạn đọc
          </h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Không cần đăng nhập · Mọi bình luận được duyệt qua Sanity Studio để
            chống spam.
          </p>
        </div>
        <span className="rounded-full bg-[var(--tint)] px-3 py-1 text-xs font-semibold text-[var(--ink)]">
          {comments.length} bình luận
        </span>
      </div>

      {/* Existing Approved Comments */}
      <div className="mb-8 space-y-3.5">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c._id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--ink)]">
                  {c.authorName}
                </span>
                <span className="text-[var(--muted)]">
                  {new Date(c.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#38322D]">
                {c.content}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-[var(--border)] p-6 text-center text-xs text-[var(--muted)]">
            Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nhận của
            bạn!
          </div>
        )}
      </div>

      {/* Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3.5 rounded-2xl border border-[var(--border)] bg-[var(--tint)] p-5"
      >
        <div className="text-sm font-semibold text-[var(--ink)]">
          Để lại cảm nhận hoặc câu hỏi
        </div>

        {/* Hidden Honeypot Anti-Spam Field */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />

        <input
          type="text"
          required
          minLength={2}
          maxLength={60}
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Tên của bạn (VD: Hoàng Nam)"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--terra)] focus:outline-none"
        />

        <textarea
          required
          rows={3}
          minLength={3}
          maxLength={1200}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--terra)] focus:outline-none"
        />

        {error && <p className="text-xs font-medium text-[var(--terra)]">{error}</p>}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-[var(--muted)]">
            Email không bắt buộc · Chống spam tự động.
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[var(--terra)] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[var(--terra-dark)] disabled:opacity-60"
          >
            {submitting ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>
      </form>

      {pendingInfo && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C6DEC9] bg-[var(--sage-soft)] p-4 text-xs text-[#264A36]">
          <span>{pendingInfo.message}</span>
          {pendingInfo.mode === "demo" && pendingInfo.commentId && (
            <button
              type="button"
              onClick={handleDemoApprove}
              className="rounded-full bg-[var(--sage)] px-3.5 py-1.5 font-semibold text-white transition hover:opacity-90"
            >
              Mô phỏng duyệt ngay (chế độ xem trước)
            </button>
          )}
        </div>
      )}
    </section>
  );
}
