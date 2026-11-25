"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { RouteStop } from "@/types/content";

interface TravelMapClientProps {
  stops: RouteStop[];
  title: string;
  totalDistanceKm?: number;
}

export default function TravelMapClient({
  stops,
  title,
  totalDistanceKm,
}: TravelMapClientProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!mapContainerRef.current || stops.length === 0) return;

    // Clean up any prior instance (StrictMode safety)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 16,
    }).addTo(map);

    const coords: L.LatLngExpression[] = stops.map((s) => [s.lat, s.lng]);

    // Dashed Terracotta Route Polyline
    L.polyline(coords, {
      color: "#C2593F",
      weight: 3.5,
      dashArray: "7 6",
      opacity: 0.9,
    }).addTo(map);

    // Custom Terracotta Numbered Markers
    markersRef.current = stops.map((stop, idx) => {
      const icon = L.divIcon({
        className: "vetnang-pin",
        html: `<div style="
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: #C2593F;
          color: #FAF8F5;
          border: 2.5px solid #FAF8F5;
          box-shadow: 0 4px 12px rgba(28,25,23,0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        ">${idx + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const popupEl = document.createElement("div");
      popupEl.style.minWidth = "160px";
      const dayEl = document.createElement("div");
      dayEl.style.cssText =
        "font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#C2593F;font-weight:700";
      dayEl.textContent = stop.dayLabel;
      const titleEl = document.createElement("div");
      titleEl.style.cssText =
        "font-weight:700;font-size:13px;margin-top:2px;color:#1C1917";
      titleEl.textContent = stop.title;
      popupEl.appendChild(dayEl);
      popupEl.appendChild(titleEl);

      const marker = L.marker([stop.lat, stop.lng], { icon })
        .addTo(map)
        .bindPopup(popupEl);

      marker.on("click", () => setSelectedIdx(idx));
      return marker;
    });

    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [36, 36] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [stops]);

  const handleSelectStop = (idx: number) => {
    setSelectedIdx(idx);
    const stop = stops[idx];
    const map = mapInstanceRef.current;
    const marker = markersRef.current[idx];
    if (map && stop) {
      map.flyTo([stop.lat, stop.lng], 11, { duration: 0.7 });
      marker?.openPopup();
    }
  };

  if (stops.length === 0) return null;
  const activeStop = stops[selectedIdx] || stops[0];

  return (
    <section
      id="ban-do"
      className="mb-12 scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] px-5 py-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--terra)]">
            Bản đồ lộ trình tương tác (OpenStreetMap)
          </span>
          <h2 className="font-editorial mt-0.5 text-xl font-bold text-[var(--ink)]">
            {title}
            {totalDistanceKm ? ` — ${totalDistanceKm} km` : ""}
          </h2>
        </div>
        <span className="text-xs text-[var(--muted)]">
          Bấm vào số thứ tự trên bản đồ để phóng tới điểm dừng
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-7">
          <div
            ref={mapContainerRef}
            className="h-[320px] w-full md:h-[360px]"
            aria-label="Bản đồ lộ trình chuyến đi"
          />
        </div>

        <div className="flex flex-col justify-between border-t border-[var(--border)] bg-[var(--surface)] p-5 md:col-span-5 md:border-l md:border-t-0">
          <div className="space-y-2.5">
            <span className="inline-block rounded-full bg-[var(--terra-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--terra)]">
              {activeStop.dayLabel}
              {activeStop.distance ? ` · ${activeStop.distance}` : ""}
            </span>
            <h3 className="font-editorial text-xl font-bold text-[var(--ink)]">
              {activeStop.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {activeStop.description}
            </p>
            {(activeStop.altitude || activeStop.highlight) && (
              <div className="space-y-1 pt-2 text-xs text-[var(--muted)]">
                {activeStop.altitude && (
                  <div>
                    <strong className="text-[var(--ink)]">Độ cao:</strong>{" "}
                    {activeStop.altitude}
                  </div>
                )}
                {activeStop.highlight && (
                  <div>
                    <strong className="text-[var(--ink)]">Điểm nhấn:</strong>{" "}
                    {activeStop.highlight}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-4">
            {stops.map((stop, idx) => (
              <button
                key={`${stop.title}-${idx}`}
                type="button"
                onClick={() => handleSelectStop(idx)}
                className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                  idx === selectedIdx
                    ? "bg-[var(--terra)] text-white"
                    : "bg-[var(--tint)] text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {idx + 1}. {stop.dayLabel.replace("Ngày ", "N")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
