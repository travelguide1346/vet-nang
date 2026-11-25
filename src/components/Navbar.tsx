"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";

interface SearchablePost {
  slug: string;
  kind: "review" | "travel";
  title: string;
  meta: string;
  excerpt: string;
}

interface NavbarProps {
  searchablePosts?: SearchablePost[];
}

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/reviews", label: "Review sản phẩm" },
  { href: "/journeys", label: "Hành trình" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/studio", label: "Studio & Video", accentDot: true },
];

export function Navbar({ searchablePosts = [] }: NavbarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const results = searchablePosts.filter((p) => {
    if (!trimmed) return true;
    return (
      p.title.toLowerCase().includes(trimmed) ||
      p.meta.toLowerCase().includes(trimmed) ||
      p.excerpt.toLowerCase().includes(trimmed)
    );
  });

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--paper)]/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="group flex items-baseline gap-2.5">
            <span className="font-editorial text-2xl font-bold tracking-[0.04em] text-[var(--ink)]">
              VỆT NẮNG
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] sm:inline">
              Hành trình &amp; Review
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 py-1 transition-colors ${
                    active
                      ? "text-[var(--ink)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.accentDot && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--terra)]" />
                  )}
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[var(--terra)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSearchOpen(true);
              }}
              aria-label="Tìm kiếm bài viết"
              className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)] transition hover:border-[var(--terra)] hover:text-[var(--ink)]"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tìm bài viết, địa điểm...</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Mở menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="border-t border-[var(--border)] bg-[var(--paper)] px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-3 py-2 text-sm font-medium ${
                      active
                        ? "bg-[var(--terra-soft)] text-[var(--terra)]"
                        : "text-[var(--muted)] hover:bg-[var(--tint)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/45 px-4 pt-20 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--paper)] p-5 shadow-2xl">
            <div className="mb-3 flex items-center gap-3 border-b border-[var(--border)] pb-3">
              <Search className="h-4 w-4 text-[var(--muted)]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm bài viết, sản phẩm, địa điểm (VD: Fujifilm, Hà Giang)..."
                className="w-full bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-lg px-2 py-1 text-xs text-[var(--muted)] hover:bg-[var(--tint)]"
              >
                Đóng
              </button>
            </div>

            <div className="max-h-80 space-y-1.5 overflow-y-auto">
              {results.length > 0 ? (
                results.map((post) => (
                  <Link
                    key={`${post.kind}-${post.slug}`}
                    href={
                      post.kind === "review"
                        ? `/reviews/${post.slug}`
                        : `/journeys/${post.slug}`
                    }
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-[var(--tint)]"
                  >
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--terra)]">
                        {post.kind === "review" ? "Review" : "Hành trình"} ·{" "}
                        {post.meta}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-[var(--ink)]">
                        {post.title}
                      </div>
                    </div>
                    <span className="text-xs text-[var(--muted)]">→</span>
                  </Link>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-[var(--muted)]">
                  Không tìm thấy bài viết nào khớp với &ldquo;{query}&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
