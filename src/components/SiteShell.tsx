"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { isSanityConfigured } from "@/sanity/env";

interface SearchablePost {
  slug: string;
  kind: "review" | "travel";
  title: string;
  meta: string;
  excerpt: string;
}

interface SiteShellProps {
  searchablePosts: SearchablePost[];
  children: React.ReactNode;
}

/**
 * Renders the blog Navbar & Footer on all public pages, while yielding
 * full-screen space to embedded Sanity Studio at /studio when configured.
 */
export function SiteShell({ searchablePosts, children }: SiteShellProps) {
  const pathname = usePathname();
  const isLiveStudio = pathname.startsWith("/studio") && isSanityConfigured;

  if (isLiveStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar searchablePosts={searchablePosts} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
