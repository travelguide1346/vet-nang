import { NextRequest, NextResponse } from "next/server";
import { parseVideoUrl } from "@/lib/video";

const ALLOWED_REDIRECT_HOSTS = new Set([
  "tiktok.com",
  "www.tiktok.com",
  "m.tiktok.com",
  "vt.tiktok.com",
  "vm.tiktok.com",
]);

/**
 * Resolves TikTok full or short URLs (vt.tiktok.com / vm.tiktok.com) via TikTok's
 * public oEmbed endpoint with strict hostname allowlisting and manual redirect
 * validation to prevent SSRF.
 */
export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url")?.trim() || "";
  const parsed = parseVideoUrl(rawUrl);

  if (!parsed) {
    return NextResponse.json(
      { error: "URL không phải link YouTube hoặc TikTok hợp lệ." },
      { status: 400 }
    );
  }

  if (parsed.platform === "youtube" || parsed.platform === "youtube-shorts") {
    return NextResponse.json({
      ...parsed,
      resolved: true,
    });
  }

  try {
    let targetUrl = parsed.originalUrl;

    // Safely resolve short mobile links with manual redirect validation (max 2 hops)
    if (parsed.platform === "tiktok-short") {
      let currentUrl = parsed.originalUrl;
      for (let hop = 0; hop < 2; hop++) {
        const res = await fetch(currentUrl, {
          method: "GET",
          redirect: "manual",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; VetNangBot/1.0)",
          },
          signal: AbortSignal.timeout(4500),
        });

        const location = res.headers.get("location");
        if (res.status >= 300 && res.status < 400 && location) {
          const nextObj = new URL(location, currentUrl);
          if (
            nextObj.protocol !== "https:" ||
            !ALLOWED_REDIRECT_HOSTS.has(nextObj.hostname.toLowerCase())
          ) {
            return NextResponse.json(
              { error: "Liên kết chuyển hướng không thuộc TikTok." },
              { status: 400 }
            );
          }
          currentUrl = nextObj.toString();
          if (parseVideoUrl(currentUrl)?.platform === "tiktok") {
            break;
          }
        } else {
          break;
        }
      }
      targetUrl = currentUrl;
    }

    const reparsed = parseVideoUrl(targetUrl);
    if (!reparsed || (reparsed.platform !== "tiktok" && reparsed.platform !== "tiktok-short")) {
      return NextResponse.json({ ...parsed, resolved: false });
    }

    const resolvedId =
      reparsed.platform === "tiktok" ? reparsed.videoId : parsed.videoId;

    const oembedRes = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(reparsed.originalUrl)}`,
      { signal: AbortSignal.timeout(4500) }
    );

    if (oembedRes.ok) {
      const data = (await oembedRes.json()) as {
        title?: string;
        author_name?: string;
        thumbnail_url?: string;
        embed_product_id?: string;
      };
      const videoId =
        data.embed_product_id && /^\d{6,25}$/.test(data.embed_product_id)
          ? data.embed_product_id
          : resolvedId;
      return NextResponse.json({
        ...parsed,
        videoId,
        handle: data.author_name ? `@${data.author_name}` : reparsed.handle,
        title: data.title,
        thumbnailUrl: data.thumbnail_url,
        embedUrl: /^\d{6,25}$/.test(videoId)
          ? `https://www.tiktok.com/embed/v2/${videoId}`
          : undefined,
        resolved: true,
      });
    }

    return NextResponse.json({
      ...parsed,
      videoId: resolvedId,
      embedUrl: /^\d{6,25}$/.test(resolvedId)
        ? `https://www.tiktok.com/embed/v2/${resolvedId}`
        : undefined,
      resolved: false,
    });
  } catch {
    return NextResponse.json({
      ...parsed,
      resolved: false,
    });
  }
}
