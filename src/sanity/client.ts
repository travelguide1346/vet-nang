import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
    })
  : null;

export const sanityWriteClient =
  isSanityConfigured && process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: sanityApiVersion,
        useCdn: false,
        token: process.env.SANITY_API_WRITE_TOKEN,
      })
    : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source: unknown, width = 1200): string | undefined {
  if (!builder || !source) return undefined;
  try {
    return builder.image(source as Parameters<typeof builder.image>[0]).width(width).auto("format").url();
  } catch {
    return undefined;
  }
}
