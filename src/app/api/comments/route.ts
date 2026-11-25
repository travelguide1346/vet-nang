import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/client";
import { getApprovedComments } from "@/lib/content";
import type { CommentItem } from "@/types/content";

// Simple in-memory rate limit & demo fallback store for local preview
const recentSubmissions = new Map<string, number>();
const localDemoComments: CommentItem[] = [];

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();
  if (!slug) {
    return NextResponse.json({ error: "Thiếu slug bài viết" }, { status: 400 });
  }

  const baseComments = await getApprovedComments(slug);
  const approvedLocal = localDemoComments.filter(
    (c) => c.postSlug === slug && c.approved
  );

  return NextResponse.json({
    comments: [...approvedLocal, ...baseComments],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      postSlug?: string;
      authorName?: string;
      content?: string;
      website?: string; // Honeypot field (should always remain empty)
      demoApprove?: boolean;
      commentId?: string;
    };

    // Optional local demo moderation simulation when Sanity write token isn't set
    if (body.demoApprove && body.commentId && !sanityWriteClient) {
      const target = localDemoComments.find((c) => c._id === body.commentId);
      if (target) {
        target.approved = true;
        return NextResponse.json({ ok: true, comment: target });
      }
      return NextResponse.json({ error: "Không tìm thấy bình luận" }, { status: 404 });
    }

    // 1. Honeypot anti-spam trap: silently succeed for bots
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true, status: "pending" });
    }

    const postSlug = (body.postSlug || "").trim();
    const authorName = (body.authorName || "").trim();
    const content = (body.content || "").trim();

    if (!postSlug || authorName.length < 2 || content.length < 3) {
      return NextResponse.json(
        { error: "Vui lòng nhập tên (tối thiểu 2 ký tự) và nội dung bình luận." },
        { status: 400 }
      );
    }

    if (authorName.length > 60 || content.length > 1200) {
      return NextResponse.json(
        { error: "Tên hoặc nội dung bình luận vượt quá độ dài cho phép." },
        { status: 400 }
      );
    }

    // 2. Basic rate limit (10 seconds between posts per IP) with bounded map cleanup
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now();
    if (recentSubmissions.size > 500) {
      for (const [key, ts] of recentSubmissions) {
        if (now - ts > 60_000) recentSubmissions.delete(key);
      }
    }
    const last = recentSubmissions.get(ip) || 0;
    if (now - last < 10_000) {
      return NextResponse.json(
        { error: "Bạn gửi hơi nhanh, vui lòng đợi vài giây rồi thử lại nhé." },
        { status: 429 }
      );
    }
    recentSubmissions.set(ip, now);

    // 3. Persist to Sanity CMS when configured (approved: false for owner moderation)
    if (sanityWriteClient) {
      const created = await sanityWriteClient.create({
        _type: "comment",
        postSlug,
        authorName,
        content,
        approved: false,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({
        ok: true,
        mode: "sanity",
        status: "pending",
        commentId: created._id,
        message:
          "Cảm ơn bạn! Bình luận đã được gửi về Sanity Studio và sẽ hiển thị sau khi duyệt.",
      });
    }

    // 4. Local preview mode fallback
    const localComment: CommentItem = {
      _id: `local-${Date.now()}`,
      postSlug,
      authorName,
      content,
      approved: false,
      createdAt: new Date().toISOString(),
    };
    localDemoComments.unshift(localComment);

    return NextResponse.json({
      ok: true,
      mode: "demo",
      status: "pending",
      commentId: localComment._id,
      message:
        "Bình luận đã vào hàng chờ duyệt (chế độ xem trước — khi kết nối Sanity sẽ lưu thẳng vào Studio).",
    });
  } catch {
    return NextResponse.json(
      { error: "Không thể gửi bình luận lúc này." },
      { status: 500 }
    );
  }
}
