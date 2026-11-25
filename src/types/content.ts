export type PostKind = "review" | "travel";

export interface VideoEmbedBlock {
  _key?: string;
  _type?: "videoEmbed";
  url: string;
  title?: string;
  caption?: string;
  featuredOnHome?: boolean;
}

export interface BuyLink {
  label: string;
  url: string;
  isAffiliate?: boolean;
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  video?: VideoEmbedBlock;
}

export interface ReviewPost {
  _id: string;
  kind: "review";
  title: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  coverImageUrl?: string;
  coverArt?: "camera" | "backpack" | "coffee";
  coverCaption?: string;
  tags: string[];
  brand: string;
  category: string;
  priceRange: string;
  experienceDuration: string;
  score: number;
  verdictLabel: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  buyLinks: BuyLink[];
  relatedJourneySlug?: string;
  relatedJourneyTitle?: string;
  sections?: ArticleSection[];
  // Sanity Portable Text raw blocks when fetched from CMS
  body?: unknown[];
}

export interface RouteStop {
  dayLabel: string;
  distance?: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  altitude?: string;
  highlight?: string;
}

export interface TimelineDay {
  dayNumber: string;
  routeTitle: string;
  headline: string;
  story: string;
  video?: VideoEmbedBlock;
}

export interface GalleryPhoto {
  url?: string;
  art?: "thamma" | "lolochai" | "nhoque" | "dalat-pine" | "dalat-cup" | "dalat-mist";
  caption: string;
  exif?: string;
}

export interface GearSummary {
  slug: string;
  title: string;
  category: string;
  score: number;
  shortNote: string;
}

export interface TravelPost {
  _id: string;
  kind: "travel";
  title: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  coverImageUrl?: string;
  coverArt?: "hagiang" | "dalat";
  tags: string[];
  destination: string;
  region: string;
  duration: string;
  bestSeason: string;
  estimatedBudget: string;
  totalDistanceKm?: number;
  routeStops: RouteStop[];
  timeline: TimelineDay[];
  gallery: GalleryPhoto[];
  gearUsed: GearSummary[];
  introParagraphs?: string[];
  body?: unknown[];
}

export type AnyPost = ReviewPost | TravelPost;

export interface FeaturedVideoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  linkedPostHref: string;
  linkedPostTitle: string;
  durationLabel?: string;
  art?: "hagiang" | "camera" | "dalat";
}

export interface CommentItem {
  _id: string;
  postSlug: string;
  authorName: string;
  content: string;
  approved: boolean;
  createdAt: string;
}
