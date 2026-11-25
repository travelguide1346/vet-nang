import { defineField, defineType } from "sanity";

export const videoEmbedType = defineType({
  name: "videoEmbed",
  title: "Video YouTube / TikTok",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Đường link YouTube hoặc TikTok",
      type: "url",
      description:
        "Dán link YouTube thường (16:9), YouTube Shorts (9:16), TikTok hoặc link rút gọn vt.tiktok.com.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tiêu đề ngắn (tùy chọn)",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Chú thích hiển thị cạnh video",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "featuredOnHome",
      title: "Hiển thị trong dải Video nổi bật ở Trang chủ?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "url" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Video nhúng (YouTube / TikTok)",
        subtitle: subtitle || "Chưa có đường link",
      };
    },
  },
});
