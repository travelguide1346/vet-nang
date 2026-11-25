import { defineField, defineType } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Bình luận bạn đọc",
  type: "document",
  fields: [
    defineField({
      name: "postSlug",
      title: "Slug bài viết",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Tên người gửi",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Nội dung bình luận",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approved",
      title: "Duyệt hiển thị công khai?",
      type: "boolean",
      description: "Bật lên để bình luận hiển thị dưới bài viết (chống spam).",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Thời gian gửi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "content",
      approved: "approved",
    },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${approved ? "✅" : "⏳ Chờ duyệt"} · ${title}`,
        subtitle,
      };
    },
  },
});
