import React from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { urlForImage } from "@/sanity/client";
import { VideoEmbed } from "./VideoEmbed";

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const text =
        value?.children?.map((c) => ("text" in c ? c.text : "")).join("") || "";
      return <h2 id={slugifyHeading(text)}>{children}</h2>;
    },
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value, 1200);
      if (!src) return null;
      return (
        <figure className="my-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={value.caption || "Ảnh minh họa bài viết"}
            loading="lazy"
            className="w-full rounded-xl border border-[var(--border)] object-cover"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-xs text-[var(--muted)]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoEmbed: ({ value }) => {
      if (!value?.url) return null;
      return (
        <VideoEmbed
          url={value.url}
          title={value.title}
          caption={value.caption}
        />
      );
    },
  },
};

export function extractHeadingsFromPortableText(
  blocks?: unknown[]
): Array<{ id: string; text: string }> {
  if (!Array.isArray(blocks)) return [];
  const headings: Array<{ id: string; text: string }> = [];
  for (const b of blocks) {
    const block = b as {
      _type?: string;
      style?: string;
      children?: Array<{ text?: string }>;
    };
    if (block._type === "block" && block.style === "h2") {
      const text = (block.children || []).map((c) => c.text || "").join("");
      if (text.trim()) {
        headings.push({ id: slugifyHeading(text), text });
      }
    }
  }
  return headings;
}

export function PortableBody({ value }: { value: unknown[] }) {
  return (
    <div className="prose-editorial">
      <PortableText
        value={value as TypedObject[]}
        components={components}
      />
    </div>
  );
}
