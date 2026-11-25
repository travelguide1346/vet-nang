"use client";

import React, { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

interface ShareBarProps {
  title: string;
}

export function ShareBar({ title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    const quote = encodeURIComponent(title);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
      "_blank",
      "noopener,noreferrer,width=640,height=480"
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition hover:border-[var(--terra)]"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-[var(--sage)]" />
            <span className="text-[var(--sage)]">Đã sao chép</span>
          </>
        ) : (
          <>
            <Link2 className="h-3.5 w-3.5 text-[var(--muted)]" />
            <span>Sao chép link</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleFacebookShare}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition hover:border-[var(--terra)]"
      >
        <Share2 className="h-3.5 w-3.5 text-[var(--muted)]" />
        <span>Facebook</span>
      </button>
    </div>
  );
}
