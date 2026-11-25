import { defineArrayMember, defineField, defineType } from "sanity";

export const reviewPostType = defineType({
  name: "reviewPost",
  title: "Bài Review Sản Phẩm",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề bài Review",
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
      title: "Thời gian đọc (VD: 7 phút đọc)",
      type: "string",
      initialValue: "6 phút đọc",
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
      title: "Ảnh bìa sản phẩm",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "caption",
          title: "Chú thích ảnh",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Thẻ (Tags)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    // Quick Product Info
    defineField({ name: "brand", title: "Thương hiệu", type: "string" }),
    defineField({
      name: "category",
      title: "Danh mục sản phẩm (VD: Máy ảnh, Balo, Đồ gia dụng)",
      type: "string",
    }),
    defineField({
      name: "priceRange",
      title: "Tầm giá tham khảo",
      type: "string",
    }),
    defineField({
      name: "experienceDuration",
      title: "Thời gian trải nghiệm thực tế (VD: 4 tháng)",
      type: "string",
    }),
    // Verdict Box
    defineField({
      name: "score",
      title: "Điểm đánh giá (thang 10)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: "verdictLabel",
      title: "Nhận xét ngắn gọn (VD: Rất đáng sở hữu)",
      type: "string",
    }),
    defineField({
      name: "pros",
      title: "Ưu điểm",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "cons",
      title: "Nhược điểm",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bestFor",
      title: "Phù hợp với ai?",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "buyLinks",
      title: "Liên kết nơi mua / Affiliate",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Tên nút", type: "string" }),
            defineField({ name: "url", title: "Link sản phẩm", type: "url" }),
            defineField({
              name: "isAffiliate",
              title: "Là link tiếp thị liên kết (Affiliate)?",
              type: "boolean",
              initialValue: false,
            }),
          ],
        }),
      ],
    }),
    // Rich Body with Video Embed
    defineField({
      name: "body",
      title: "Nội dung chi tiết",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "caption", title: "Chú thích", type: "string" }),
          ],
        }),
        defineArrayMember({ type: "videoEmbed" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      brand: "brand",
      score: "score",
      media: "mainImage",
    },
    prepare({ title, brand, score, media }) {
      return {
        title,
        subtitle: `${brand || "Review"} · ${score ? `${score}/10` : "Chưa chấm điểm"}`,
        media,
      };
    },
  },
});
