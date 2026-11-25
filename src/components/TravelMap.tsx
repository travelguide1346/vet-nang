"use client";

import dynamic from "next/dynamic";
import type { RouteStop } from "@/types/content";

const TravelMapClient = dynamic(() => import("./TravelMapClient"), {
  ssr: false,
  loading: () => (
    <div className="mb-12 flex h-[360px] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--tint)] text-xs text-[var(--muted)]">
      Đang tải bản đồ lộ trình OpenStreetMap...
    </div>
  ),
});

interface TravelMapProps {
  stops: RouteStop[];
  title: string;
  totalDistanceKm?: number;
}

export function TravelMap(props: TravelMapProps) {
  return <TravelMapClient {...props} />;
}
