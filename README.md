# Vệt Nắng — Website Review Sản Phẩm & Nhật Ký Hành Trình

Website cá nhân phong cách tạp chí hiện đại (tông **Trắng ngà `#FAF8F5` + Cam đất nung `#C2593F`**), xây dựng bằng **Next.js (App Router)**, **Tailwind CSS**, **Sanity CMS** và **Leaflet (OpenStreetMap)**.

## Tính năng chính

- **Review sản phẩm (`/reviews`):** Thẻ thông tin nhanh, Hộp tóm tắt điểm `/10`, Ưu/Nhược điểm, Phù hợp với ai, và nút liên kết nơi mua / Affiliate.
- **Nhật ký hành trình (`/journeys`):** Tổng quan chuyến đi, **Bản đồ lộ trình tương tác OpenStreetMap (Leaflet)**, lộ trình từng ngày (Timeline), thư viện ảnh phóng to **Lightbox kèm thông số EXIF**, và mục **"Đồ mình mang theo"** liên kết thẳng sang bài Review sản phẩm.
- **Nhúng YouTube & TikTok "chỉ cần dán link":**
  - Tự động nhận diện `youtube.com/watch`, `youtu.be` (`16:9` ngang), `youtube.com/shorts` (`9:16` dọc), và `tiktok.com` kể cả link rút gọn `vt.tiktok.com` / `vm.tiktok.com` (qua API `/api/video/resolve`).
  - Cơ chế **lazy-load** chỉ tải ảnh bìa trước, bấm phát mới tải trình phát video để trang luôn nhẹ.
- **Tương tác độc giả:** Tìm kiếm nhanh toàn trang, lọc theo thẻ/chuyên mục, Mục lục tự động (TOC), chia sẻ nhanh, và **Bình luận tích hợp Sanity** (không cần đăng nhập, chống spam honeypot + duyệt thủ công trong Studio).

## Chạy thử ngay trên máy

```bash
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`. Website đã có sẵn dữ liệu mẫu đầy đủ nên bạn có thể xem và trải nghiệm ngay trước khi kết nối Sanity CMS.

## Kết nối Sanity CMS miễn phí (để tự viết và đăng bài tại `/studio`)

1. Truy cập [sanity.io/manage](https://www.sanity.io/manage) và tạo 1 dự án miễn phí (dataset: `production`).
2. Trong mục **API → CORS origins**, thêm `http://localhost:3000` (và tên miền Vercel sau này) kèm bật **Allow credentials**.
3. Sao chép `.env.example` thành `.env.local` và điền `NEXT_PUBLIC_SANITY_PROJECT_ID` (và tùy chọn `SANITY_API_WRITE_TOKEN` quyền Editor để lưu bình luận bạn đọc vào Sanity).
4. Khởi động lại `npm run dev` và truy cập `/studio` để bắt đầu viết bài Review, Hành trình, dán link YouTube/TikTok và duyệt bình luận.

## Triển khai miễn phí lên Vercel

1. Đẩy mã nguồn lên GitHub.
2. Vào [vercel.com](https://vercel.com), chọn **Import Project**, thêm các biến môi trường từ `.env.local`, và bấm **Deploy**.
