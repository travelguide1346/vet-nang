export type VideoPlatform = "youtube" | "youtube-shorts" | "tiktok" | "tiktok-short";

export interface ParsedVideo {
  platform: VideoPlatform;
  platformLabel: string;
  ratio: "16:9" | "9:16";
  videoId: string;
  handle?: string;
  originalUrl: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  needsServerResolve?: boolean;
}

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

const TIKTOK_FULL_HOSTS = new Set([
  "tiktok.com",
  "www.tiktok.com",
  "m.tiktok.com",
]);

const TIKTOK_SHORT_HOSTS = new Set(["vt.tiktok.com", "vm.tiktok.com"]);

/**
 * Validates that an external link uses http: or https: (blocking javascript:, data:, etc.).
 */
export function isSafeExternalUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL((rawUrl || "").trim());
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * Strict URL parser for YouTube (standard, youtu.be, embed, Shorts) and
 * TikTok (full & vt/vm short links) using `new URL()` hostname allowlisting
 * to prevent SSRF bypasses.
 */
export function parseVideoUrl(rawUrl: string): ParsedVideo | null {
  const input = (rawUrl || "").trim();
  if (!input) return null;

  let urlObj: URL;
  try {
    urlObj = new URL(input);
  } catch {
    return null;
  }

  if (urlObj.protocol !== "https:" && urlObj.protocol !== "http:") {
    return null;
  }

  const host = urlObj.hostname.toLowerCase();
  const path = urlObj.pathname;

  // 1. YouTube hosts
  if (YOUTUBE_HOSTS.has(host)) {
    // youtu.be/<id>
    if (host === "youtu.be") {
      const m = path.match(/^\/([a-zA-Z0-9_-]{6,20})(?:\/|$)/);
      if (!m) return null;
      const id = m[1];
      return {
        platform: "youtube",
        platformLabel: "YouTube",
        ratio: "16:9",
        videoId: id,
        originalUrl: `https://youtu.be/${id}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    }

    // youtube.com/shorts/<id>
    const shortsMatch = path.match(/^\/shorts\/([a-zA-Z0-9_-]{6,20})(?:\/|$)/);
    if (shortsMatch) {
      const id = shortsMatch[1];
      return {
        platform: "youtube-shorts",
        platformLabel: "YouTube Shorts",
        ratio: "9:16",
        videoId: id,
        originalUrl: `https://www.youtube.com/shorts/${id}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    }

    // youtube.com/watch?v=<id>
    if (path === "/watch") {
      const v = urlObj.searchParams.get("v") || "";
      if (!/^[a-zA-Z0-9_-]{6,20}$/.test(v)) return null;
      return {
        platform: "youtube",
        platformLabel: "YouTube",
        ratio: "16:9",
        videoId: v,
        originalUrl: `https://www.youtube.com/watch?v=${v}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${v}?autoplay=1&rel=0`,
        thumbnailUrl: `https://i.ytimg.com/vi/${v}/hqdefault.jpg`,
      };
    }

    // youtube.com/embed/<id>
    const embedMatch = path.match(/^\/embed\/([a-zA-Z0-9_-]{6,20})(?:\/|$)/);
    if (embedMatch) {
      const id = embedMatch[1];
      return {
        platform: "youtube",
        platformLabel: "YouTube",
        ratio: "16:9",
        videoId: id,
        originalUrl: `https://www.youtube.com/watch?v=${id}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    }

    return null;
  }

  // 2. TikTok full URLs: tiktok.com/@user/video/<digits>
  if (TIKTOK_FULL_HOSTS.has(host)) {
    const ttFull = path.match(/^\/@([^/?#]+)\/video\/(\d{6,25})(?:\/|$)/);
    if (!ttFull) return null;
    const handle = `@${ttFull[1]}`;
    const id = ttFull[2];
    return {
      platform: "tiktok",
      platformLabel: "TikTok",
      ratio: "9:16",
      videoId: id,
      handle,
      originalUrl: `https://www.tiktok.com/${handle}/video/${id}`,
      embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
      needsServerResolve: true,
    };
  }

  // 3. TikTok short mobile share links: vt.tiktok.com/<code_alnum> or vm.tiktok.com/<code>
  if (TIKTOK_SHORT_HOSTS.has(host)) {
    const ttShort = path.match(/^\/([a-zA-Z0-9]{4,24})(?:\/|$)/);
    if (!ttShort) return null;
    const code = ttShort[1];
    return {
      platform: "tiktok-short",
      platformLabel: "TikTok",
      ratio: "9:16",
      videoId: code,
      originalUrl: `https://${host}/${code}/`,
      needsServerResolve: true,
    };
  }

  return null;
}
