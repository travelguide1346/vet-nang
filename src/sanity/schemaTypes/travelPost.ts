import { defineArrayMember, defineField, defineType } from "sanity";

export const travelPostType = defineType({
  name: "travelPost",
  title: "Bài Hành Trình & Chuyến Đi",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề hành trình",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn (Slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Ngày đăng",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      title: "Thời gian đọc",
      type: "string",
      initialValue: "8 phút đọc",
    }),
    defineField({
      name: "excerpt",
      title: "Mô tả ngắn",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Ảnh bìa chuyến đi",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "Thẻ (Tags)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    // Trip Overview
    defineField({ name: "destination", title: "Điểm đến", type: "string" }),
    defineField({
      name: "region",
      title: "Khu vực (VD: Đông Bắc, Tây Nguyên, Miền Trung)",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Thời lượng (VD: 4 Ngày 3 Đêm)",
      type: "string",
    }),
    defineField({
      name: "bestSeason",
      title: "Thời điểm đẹp nhất",
      type: "string",
    }),
    defineField({
      name: "estimatedBudget",
      title: "Chi phí ước tính",
      type: "string",
    }),
    defineField({
      name: "totalDistanceKm",
      title: "Tổng quãng đường (km)",
      type: "number",
    }),
    // Interactive Map Stops
    defineField({
      name: "routeStops",
      title: "Các điểm dừng trên bản đồ lộ trình",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "dayLabel", title: "Ngày (VD: Ngày 01)", type: "string" }),
            defineField({ name: "distance", title: "Quãng đường (VD: 55 km)", type: "string" }),
            defineField({ name: "title", title: "Tên điểm dừng", type: "string" }),
            defineField({ name: "description", title: "Ghi chú ngắn", type: "text", rows: 2 }),
            defineField({ name: "lat", title: "Vĩ độ (Latitude)", type: "number" }),
            defineField({ name: "lng", title: "Kinh độ (Longitude)", type: "number" }),
            defineField({ name: "altitude", title: "Độ cao (tùy chọn)", type: "string" }),
            defineField({ name: "highlight", title: "Điểm nhấn", type: "string" }),
          ],
        }),
      ],
    }),
    // Day-by-Day Timeline
    defineField({
      name: "timeline",
      title: "Lộ trình theo từng ngày",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "dayNumber", title: "Ngày (VD: Ngày 01)", type: "string" }),
            defineField({ name: "routeTitle", title: "Chặng đường", type: "string" }),
            defineField({ name: "headline", title: "Tiêu đề ngày", type: "string" }),
            defineField({ name: "story", title: "Câu chuyện", type: "text", rows: 4 }),
            defineField({ name: "video", title: "Video đính kèm ngày này (tùy chọn)", type: "videoEmbed" }),
          ],
        }),
      ],
    }),
    // Magazine Photo Gallery
    defineField({
      name: "gallery",
      title: "Thư viện ảnh (Lightbox)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Ảnh",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "caption", title: "Chú thích", type: "string" }),
            defineField({
              name: "exif",
              title: "Thông số máy ảnh / EXIF (tùy chọn)",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    // Cross-link to Product Reviews
    defineField({
      name: "gearUsed",
      title: "Đồ mình mang theo (Liên kết bài Review)",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "reviewPost" }],
        }),
      ],
    }),
    // Additional Portable Text content
    defineField({
      name: "body",
      title: "Nội dung mở rộng (tùy chọn)",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
        defineArrayMember({ type: "videoEmbed" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      destination: "destination",
      duration: "duration",
      media: "mainImage",
    },
    prepare({ title, destination, duration, media }) {
      return {
        title,
        subtitle: `${destination || "Hành trình"} · ${duration || ""}`,
        media,
      };
    },
  },
});
