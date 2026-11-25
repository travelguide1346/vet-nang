import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { getAllPosts } from "@/lib/content";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const lora = Lora({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vệt Nắng — Nhật Ký Hành Trình & Đánh Giá Sản Phẩm",
    template: "%s | Vệt Nắng",
  },
  description:
    "Website cá nhân phong cách tạp chí chia sẻ đánh giá sản phẩm thực tế, nhật ký hành trình kèm bản đồ lộ trình và video YouTube / TikTok.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Vệt Nắng",
    title: "Vệt Nắng — Nhật Ký Hành Trình & Đánh Giá Sản Phẩm",
    description:
      "Ghi chép chậm rãi về những chuyến đi và đánh giá chân thật những món đồ đồng hành.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getAllPosts();
  const searchablePosts = posts.map((p) => ({
    slug: p.slug,
    kind: p.kind,
    title: p.title,
    meta: p.kind === "review" ? `${p.brand} · ${p.score}/10` : `${p.destination} · ${p.duration}`,
    excerpt: p.excerpt,
  }));

  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--paper)] text-[var(--ink)]">
        <SiteShell searchablePosts={searchablePosts}>{children}</SiteShell>
      </body>
    </html>
  );
}
