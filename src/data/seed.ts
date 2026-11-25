import type {
  CommentItem,
  FeaturedVideoItem,
  ReviewPost,
  TravelPost,
} from "@/types/content";

export const SEED_REVIEWS: ReviewPost[] = [
  {
    _id: "seed-review-x100vi",
    kind: "review",
    title:
      "Đánh giá Fujifilm X100VI sau 4 tháng đi đường dài: Nhỏ gọn nhưng có đáng mức giá này?",
    slug: "fujifilm-x100vi-sau-4-thang-duong-dai",
    publishedAt: "2026-11-05",
    readTime: "7 phút đọc",
    excerpt:
      "Chống rung IBIS 6 stop, cảm biến 40MP và màu phim JPEG xuất thẳng điện thoại — trải nghiệm thực tế sau những cung đường Tây Bắc và Đà Lạt.",
    coverArt: "camera",
    coverCaption:
      "Fujifilm X100VI bản màu bạc sau 4 tháng đồng hành qua Hà Giang và Đà Lạt.",
    tags: ["MáyẢnh", "Fujifilm", "ĐồDuLịch"],
    brand: "Fujifilm",
    category: "Máy ảnh Compact",
    priceRange: "44 – 48 triệu VNĐ",
    experienceDuration: "4 tháng",
    score: 9.2,
    verdictLabel: "Rất đáng sở hữu",
    pros: [
      "Chống rung trong thân máy IBIS 6 stop cực kỳ hữu ích khi chụp cầm tay lúc chạng vạng và quay clip dọc.",
      "Giả lập màu phim (Classic Neg, Reala Ace) đẹp sẵn từ file JPEG, xuất sang điện thoại đăng bài ngay.",
      "Thiết kế gọn nhẹ, đeo suốt ngày chạy đèo không mỏi cổ và không gây chú ý khi chụp đời thường.",
    ],
    cons: [
      "Ống kính cố định 23mm f/2 (quy đổi 35mm), cần di chuyển bằng chân thay vì zoom quang học.",
      "Pin NP-W126S hao khá nhanh nếu quay nhiều clip 4K, nên mang theo tối thiểu 2 viên dự phòng.",
    ],
    bestFor:
      "Người viết blog du lịch, sáng tạo nội dung ngắn YouTube/TikTok yêu thích sự tối giản và muốn một chiếc máy đủ đẹp để luôn muốn mang theo bên mình.",
    buyLinks: [
      {
        label: "Xem giá tại Fujifilm Việt Nam",
        url: "https://fujifilm-x.com/vi-vn/products/cameras/x100vi/",
        isAffiliate: false,
      },
      {
        label: "Tham khảo gian hàng chính hãng Shopee Mall",
        url: "https://shopee.vn/search?keyword=fujifilm%20x100vi",
        isAffiliate: true,
      },
    ],
    relatedJourneySlug: "ha-giang-mua-hoa-cuc-cam-4n3d",
    relatedJourneyTitle: "Hà Giang mùa hoa cúc cam: 4 ngày đi chậm qua đèo sương",
    sections: [
      {
        id: "cam-giac-cam-nam",
        heading: "1. Cảm giác cầm nắm sau hàng trăm km đường đèo",
        paragraphs: [
          "Điều khiến mình quyết định để lại bộ máy mirrorless thay ống kính ở nhà trong chuyến Hà Giang vừa rồi là sự tĩnh lặng khi chụp. Khi bạn dừng xe bên một vạt hoa cúc cam hay bước vào nhà trình tường ở Lô Lô Chải, một chiếc máy ảnh nhỏ gọn giúp người đối diện thoải mái hơn rất nhiều.",
          "Lớp vỏ nhôm phay xước và vòng xoay tốc độ cơ học tạo cảm giác gắn kết rất thật. Chỉ cần gạt nhẹ nút bật nguồn và nhìn qua kính ngắm lai (Hybrid Viewfinder), bạn sẵn sàng ghi lại khoảnh khắc trong chưa đầy 1 giây.",
        ],
      },
      {
        id: "video-trai-nghiem",
        heading: "2. Video trải nghiệm thực tế (YouTube 16:9 & TikTok 9:16)",
        paragraphs: [
          "Với chống rung IBIS lần đầu xuất hiện trên dòng X100, mình có thể quay những đoạn B-roll cầm tay mượt mà mà không cần gimbal cồng kềnh. Dưới đây là video đánh giá chi tiết quay trực tiếp bằng X100VI:",
        ],
        video: {
          url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
          title: "Trải nghiệm thực tế Fujifilm X100VI trên cung đường đèo",
          caption:
            "Video YouTube ngang (16:9) tự động tải ảnh bìa nhẹ và chỉ tải trình phát khi bạn bấm xem.",
        },
      },
      {
        id: "mau-phim-clip-doc",
        heading: "3. Thử nghiệm giả lập màu phim qua clip dọc 9:16",
        paragraphs: [
          "Điểm mình thích nhất khi làm nội dung đa nền tảng là khả năng chèn nhanh các clip dọc TikTok hoặc YouTube Shorts ngay giữa bài viết để minh họa chuyển động thực tế mà không phá vỡ nhịp đọc tạp chí.",
        ],
        video: {
          url: "https://www.youtube.com/shorts/9bZkp7q19f0",
          title: "So sánh nhanh 2 giả lập màu Classic Neg & Reala Ace",
          caption:
            "Clip dọc 9:16 tự động xếp bố cục 2 cột cạnh chú thích — gọn gàng trên máy tính và vừa vặn trên điện thoại.",
        },
      },
      {
        id: "ket-luan",
        heading: "4. Có nên mua Fujifilm X100VI ở thời điểm hiện tại?",
        paragraphs: [
          "Nếu bạn cần một thiết bị đa dụng cho công việc chụp sự kiện hoặc cần ống kính tele, các dòng X-T5 hay Sony A7C II sẽ hợp lý hơn. Nhưng nếu bạn tìm kiếm niềm vui mỗi khi nhấc máy lên trong những chuyến đi và quán cà phê cuối tuần, X100VI là người bạn đồng hành khó thay thế.",
        ],
      },
    ],
  },
  {
    _id: "seed-review-peakdesign",
    kind: "review",
    title:
      "Balo Peak Design Travel 30L sau 1 năm: Có xứng đáng để bỏ lại vali kéo?",
    slug: "balo-peak-design-travel-30l-sau-1-nam",
    publishedAt: "2026-10-15",
    readTime: "6 phút đọc",
    excerpt:
      "Độ hoàn thiện bền bỉ, mở khóa mặt lưng dạng vỏ sò tiện lợi cho máy ảnh và quần áo, nhưng trọng lượng rỗng có phải rào cản?",
    coverArt: "backpack",
    coverCaption:
      "Peak Design Travel Backpack 30L màu xanh rêu Sage sau 12 tháng di chuyển liên tục.",
    tags: ["ĐồDuLịch", "Balo", "Minimalist"],
    brand: "Peak Design",
    category: "Balo du lịch",
    priceRange: "6,8 – 7,5 triệu VNĐ",
    experienceDuration: "1 năm",
    score: 8.8,
    verdictLabel: "Rất đáng cân nhắc",
    pros: [
      "Mở rộng linh hoạt từ 27L lên 33L, vừa gọn tiêu chuẩn hành lý xách tay máy bay.",
      "Vải canvas tái chế chống nước tốt, đi qua mưa phùn Đà Lạt và sương Hà Giang vẫn khô ráo bên trong.",
      "Quai đeo giấu gọn bằng nam châm thông minh, không bị lùng nhùng khi để lên khoang hành lý.",
    ],
    cons: [
      "Trọng lượng rỗng 1,44 kg nặng hơn các dòng balo hiking siêu nhẹ.",
      "Cần mua thêm Camera Cube riêng nếu muốn chia ngăn chống sốc cho nhiều ống kính.",
    ],
    bestFor:
      "Người đi du lịch ngắn ngày (3–5 ngày) theo phong cách one-bag travel, cần mang cả laptop, máy ảnh và quần áo gọn trong một chiếc balo duy nhất.",
    buyLinks: [
      {
        label: "Xem trên trang chủ Peak Design",
        url: "https://www.peakdesign.com/products/travel-backpack-30l",
        isAffiliate: false,
      },
      {
        label: "Tìm đại lý phân phối tại Việt Nam",
        url: "https://shopee.vn/search?keyword=peak%20design%20travel%2030l",
        isAffiliate: true,
      },
    ],
    relatedJourneySlug: "ha-giang-mua-hoa-cuc-cam-4n3d",
    relatedJourneyTitle: "Hà Giang mùa hoa cúc cam: 4 ngày đi chậm qua đèo sương",
    sections: [
      {
        id: "cau-truc-ngan",
        heading: "1. Trải nghiệm đóng gói cho chuyến đi 4 ngày 3 đêm",
        paragraphs: [
          "Khác với balo truyền thống mở từ phía trên khiến bạn phải lục tung mọi thứ khi cần lấy áo khoác ở đáy, Travel Backpack 30L mở toàn bộ mặt lưng như một chiếc vali mini. Mọi túi đồ Packing Cube và hộp máy ảnh nằm ngay ngắn trước mắt.",
        ],
      },
      {
        id: "do-ben-thoi-tiet",
        heading: "2. Khả năng chống chọi mưa gió ngoài trời",
        paragraphs: [
          "Sau 1 năm quăng quật từ cốp xe khách đêm đến những buổi sáng ẩm sương ở cao nguyên đá, bề mặt vải 400D tái chế gần như không có vết sờn rõ rệt. Khóa kéo UltraZip chống thấm vẫn trơn tru sau hàng trăm lần đóng mở.",
        ],
      },
    ],
  },
];

export const SEED_TRAVELS: TravelPost[] = [
  {
    _id: "seed-travel-hagiang",
    kind: "travel",
    title:
      "Hà Giang mùa hoa cúc cam: 4 ngày đi chậm qua những cung đèo sương sớm",
    slug: "ha-giang-mua-hoa-cuc-cam-4n3d",
    publishedAt: "2026-11-12",
    readTime: "8 phút đọc",
    excerpt:
      "Thay vì chạy vội để check-in đủ mọi điểm nổi tiếng, chuyến đi này là những buổi sáng pha cà phê ven đèo, chuyện trò ở Lô Lô Chải và ghi lại từng khoảnh khắc chậm rãi.",
    coverArt: "hagiang",
    tags: ["HàGiang", "TâyBắc", "ĐiChậm"],
    destination: "Hà Giang (Đồng Văn – Mèo Vạc)",
    region: "Đông Bắc",
    duration: "4 Ngày 3 Đêm",
    bestSeason: "Tháng 10 – Tháng 11",
    estimatedBudget: "~4,5 triệu / người",
    totalDistanceKm: 345,
    introParagraphs: [
      "Mình từng đến Hà Giang một lần cách đây 4 năm theo lịch trình dày đặc của đoàn du lịch. Lần quay lại này, mình chọn đi thật chậm với một chiếc balo 30L, một chiếc máy ảnh nhỏ gọn và nguyên tắc duy nhất: cứ thấy khúc cua nào nắng đẹp thì dừng lại.",
    ],
    routeStops: [
      {
        dayLabel: "Ngày 01",
        distance: "55 km",
        title: "Cổng trời Quản Bạ & Làng Nậm Đăm",
        description:
          "Khởi hành từ TP. Hà Giang lúc 8h sáng, nghỉ đêm đầu tiên tại homestay nhà trình tường người Dao ở làng Nậm Đăm yên tĩnh.",
        lat: 23.0631,
        lng: 104.9912,
        altitude: "~1.500 m",
        highlight: "Sương chiều & tắm lá thuốc Dao đỏ",
      },
      {
        dayLabel: "Ngày 02",
        distance: "88 km",
        title: "Dốc Thẩm Mã & Phố Cáo",
        description:
          "Chạy qua rừng thông Yên Minh, dừng chân ngắm những bờ rào đá xám điểm xuyết sắc hoa cúc cam nở rộ dọc thung lũng Phố Cáo.",
        lat: 23.2045,
        lng: 105.1744,
        altitude: "~1.600 m",
        highlight: "Chợ phiên sớm & hoa cúc cam ven đường",
      },
      {
        dayLabel: "Ngày 03",
        distance: "62 km",
        title: "Đèo Mã Pí Lèng & Hẻm vực Tu Sản",
        description:
          "Thức dậy lúc 5h30 sáng đón biển mây trên tứ đại đỉnh đèo, pha một bình cà phê nóng nhìn xuống dòng Nho Quế xanh ngọc.",
        lat: 23.2292,
        lng: 105.405,
        altitude: "~1.200 m",
        highlight: "Bình minh vắng người & quay Shorts",
      },
      {
        dayLabel: "Ngày 04",
        distance: "140 km",
        title: "Làng Lô Lô Chải → TP. Hà Giang",
        description:
          "Đi dạo giữa những mái ngói âm dương dưới chân cột cờ Lũng Cú, nhâm nhi cà phê Cực Bắc trước khi thong thả quay về thành phố.",
        lat: 23.3627,
        lng: 105.3186,
        altitude: "~1.470 m",
        highlight: "Nhà trình tường cổ & Cà phê Cực Bắc",
      },
    ],
    timeline: [
      {
        dayNumber: "Ngày 01",
        routeTitle: "TP. Hà Giang → Dốc Bắc Sum → Quản Bạ",
        headline: "Rời phố thị để hít thở sương lạnh cao nguyên đá",
        story:
          "Đoạn đường lên Quản Bạ chưa quá dốc nhưng cua tay áo bắt đầu xuất hiện liên tiếp. Dừng ở đỉnh dốc Bắc Sum làm một cốc trà gừng nóng, ngắm mây lững lờ trôi ngang thung lũng trước khi vào làng Nậm Đăm nghỉ đêm.",
      },
      {
        dayNumber: "Ngày 02",
        routeTitle: "Yên Minh → Dốc Thẩm Mã → Phố Cáo → Đồng Văn",
        headline: "Những bờ rào đá xám và vạt hoa cúc cam ven đường",
        story:
          "Tháng 11 ở Phố Cáo không chỉ có tam giác mạch mà còn rực lên sắc cam đất ấm áp của hoa cúc dại mọc dọc vách đá tai mèo — rất hợp với ánh nắng xiên chiều và không khí se lạnh khoảng 14°C.",
      },
      {
        dayNumber: "Ngày 03",
        routeTitle: "Đồng Văn → Đèo Mã Pí Lèng → Sông Nho Quế",
        headline: "6 giờ sáng pha cà phê nhìn xuống hẻm vực Tu Sản",
        story:
          "Rời thị trấn sớm hơn đoàn khách du lịch khoảng 2 tiếng là quyết định đúng đắn nhất chuyến đi. Cả cung đèo Hạnh Phúc vắng lặng, chỉ còn tiếng gió và dòng Nho Quế xanh ngọc bích uốn lượn sâu phía dưới.",
        video: {
          url: "https://www.youtube.com/shorts/9bZkp7q19f0",
          title: "6h sáng trên đỉnh Mã Pí Lèng không một bóng người",
          caption:
            "Khoảnh khắc biển mây tràn qua vách đá — quay trực tiếp bằng máy ảnh cầm tay không dùng gimbal.",
        },
      },
      {
        dayNumber: "Ngày 04",
        routeTitle: "Lô Lô Chải → Quay về TP. Hà Giang",
        headline: "Buổi sáng yên bình dưới mái ngói âm dương",
        story:
          "Kết thúc vòng cung bằng một buổi sáng thật chậm ở Lô Lô Chải, ngắm khói bếp bay lên từ những ngôi nhà trình tường màu đất nung trước khi lên xe về lại Hà Nội.",
      },
    ],
    gallery: [
      {
        art: "thamma",
        caption: "Bình minh dịu nắng trên dốc Thẩm Mã",
        exif: "Fujifilm X100VI · 23mm · f/2.8 · 1/500s · Classic Neg",
      },
      {
        art: "lolochai",
        caption: "Nhà trình tường và hoa cúc cam ở làng Lô Lô Chải",
        exif: "Fujifilm X100VI · 23mm · f/2.0 · 1/250s · Classic Chrome",
      },
      {
        art: "nhoque",
        caption: "Sông Nho Quế xanh ngọc nhìn từ con đường Hạnh Phúc",
        exif: "Fujifilm X100VI · 23mm · f/5.6 · 1/1000s · Reala Ace",
      },
    ],
    gearUsed: [
      {
        slug: "fujifilm-x100vi-sau-4-thang-duong-dai",
        title: "Fujifilm X100VI",
        category: "Máy ảnh",
        score: 9.2,
        shortNote: "Toàn bộ ảnh và clip ngắn trong bài được ghi lại bằng chiếc máy này.",
      },
      {
        slug: "balo-peak-design-travel-30l-sau-1-nam",
        title: "Peak Design Travel 30L",
        category: "Balo du lịch",
        score: 8.8,
        shortNote: "Gọn nhẹ vừa đủ quần áo ấm 4 ngày, chống sương và mưa phùn tốt.",
      },
    ],
  },
  {
    _id: "seed-travel-dalat",
    kind: "travel",
    title: "3 buổi sáng chỉ uống cà phê và đọc sách giữa rừng thông Đà Lạt",
    slug: "3-buoi-sang-ca-phe-rung-thong-da-lat",
    publishedAt: "2026-10-24",
    readTime: "6 phút đọc",
    excerpt:
      "Tránh xa sự ồn ào quanh chợ đêm, danh sách những góc rừng thông yên tĩnh ở Trại Mát và hồ Tuyền Lâm để thưởng thức một bình pour-over nóng.",
    coverArt: "dalat",
    tags: ["ĐàLạt", "CàPhê", "ĐiChậm"],
    destination: "Đà Lạt, Lâm Đồng",
    region: "Tây Nguyên",
    duration: "3 Ngày 2 Đêm",
    bestSeason: "Tháng 11 – Tháng 3",
    estimatedBudget: "~3,2 triệu / người",
    totalDistanceKm: 68,
    introParagraphs: [
      "Nếu bạn từng cảm thấy Đà Lạt bây giờ quá đông đúc, hãy thử rời trung tâm sớm hơn một chút vào lúc 6h sáng và chạy hướng về phía hồ Tuyền Lâm hoặc Trại Mát. Mùi nhựa thông và tiếng chim buổi sớm vẫn còn nguyên vẹn ở đó.",
    ],
    routeStops: [
      {
        dayLabel: "Ngày 01",
        distance: "12 km",
        title: "Hồ Tuyền Lâm & Đồi Thông Sớm",
        description:
          "Nhận phòng cabin gỗ ven rừng thông, buổi chiều đi bộ quanh bờ hồ ngắm hoàng hôn nhuộm vàng mặt nước.",
        lat: 11.9042,
        lng: 108.4368,
        altitude: "~1.450 m",
        highlight: "Đi bộ rừng thông & hoàng hôn mặt hồ",
      },
      {
        dayLabel: "Ngày 02",
        distance: "24 km",
        title: "Xưởng rang Trại Mát & Cầu Đất",
        description:
          "Thử hạt Arabica Cầu Đất sơ chế honey pha thủ công V60 giữa sương mù bảng lảng.",
        lat: 11.9388,
        lng: 108.5082,
        altitude: "~1.600 m",
        highlight: "Pour-over Cầu Đất & đồi chè sớm",
      },
      {
        dayLabel: "Ngày 03",
        distance: "16 km",
        title: "Tà Nung → Quay lại trung tâm",
        description:
          "Buổi sáng cuối cùng ngồi đọc hết nửa cuốn sách bên hiên gỗ trước khi ra sân bay Liên Khương.",
        lat: 11.9089,
        lng: 108.3562,
        altitude: "~1.300 m",
        highlight: "Đọc sách chậm & cà phê vườn",
      },
    ],
    timeline: [
      {
        dayNumber: "Ngày 01",
        routeTitle: "Trung tâm → Hồ Tuyền Lâm",
        headline: "Tắt thông báo điện thoại và nghe tiếng gió thông",
        story:
          "Mình chọn ở hẳn khu vực gần hồ Tuyền Lâm để buổi sáng chỉ cần mở cửa sổ là thấy sương trôi ngang tán thông. Không lịch trình dày đặc, chỉ có đi bộ và nấu một ấm nước sôi pha cà phê.",
      },
      {
        dayNumber: "Ngày 02",
        routeTitle: "Trại Mát → Đồi chè Cầu Đất",
        headline: "Một tách Arabica Cầu Đất ấm tay lúc 7 giờ sáng",
        story:
          "Khí hậu lạnh buổi sớm khiến hương cam chanh nhẹ của hạt Arabica Cầu Đất bật lên rõ rệt hơn hẳn. Ngồi nói chuyện với anh thợ rang về mùa thu hoạch cuối năm là kỷ niệm đáng nhớ nhất.",
        video: {
          url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
          title: "Nhật ký âm thanh buổi sáng ở xưởng rang Cầu Đất",
          caption:
            "Không nhạc nền ồn ào — chỉ có tiếng nước rót, tiếng gió rừng thông và không khí sớm Đà Lạt.",
        },
      },
    ],
    gallery: [
      {
        art: "dalat-cup",
        caption: "Tách pour-over gốm đất nung bên cửa sổ gỗ lúc 6h30 sáng",
        exif: "Fujifilm X100VI · 23mm · f/2.0 · 1/125s · Classic Neg",
      },
      {
        art: "dalat-pine",
        caption: "Nắng sớm xuyên qua rừng thông ven hồ Tuyền Lâm",
        exif: "Fujifilm X100VI · 23mm · f/4.0 · 1/640s · Reala Ace",
      },
      {
        art: "dalat-mist",
        caption: "Biển sương mỏng trôi ngang thung lũng Trại Mát",
        exif: "Fujifilm X100VI · 23mm · f/5.6 · 1/800s · Classic Chrome",
      },
    ],
    gearUsed: [
      {
        slug: "fujifilm-x100vi-sau-4-thang-duong-dai",
        title: "Fujifilm X100VI",
        category: "Máy ảnh",
        score: 9.2,
        shortNote: "Nhỏ gọn để đặt ngay cạnh tách cà phê mà không chiếm diện tích bàn.",
      },
    ],
  },
];

export const SEED_FEATURED_VIDEOS: FeaturedVideoItem[] = [
  {
    id: "fv-hagiang-yt",
    url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    title: "Vlog Hà Giang: Chạy xe giữa biển mây Mã Pí Lèng",
    caption: "Đính kèm trong bài: Hà Giang mùa hoa cúc cam",
    linkedPostHref: "/journeys/ha-giang-mua-hoa-cuc-cam-4n3d",
    linkedPostTitle: "Đọc nhật ký hành trình →",
    durationLabel: "11:42",
    art: "hagiang",
  },
  {
    id: "fv-x100vi-tiktok",
    url: "https://www.tiktok.com/@vetnang.journal/video/7392817263541209350",
    title: "60s test màu phim Classic Neg trên Fujifilm X100VI",
    caption: "Clip dọc TikTok nhúng mượt 9:16",
    linkedPostHref: "/reviews/fujifilm-x100vi-sau-4-thang-duong-dai",
    linkedPostTitle: "Xem bài review →",
    durationLabel: "0:58",
    art: "camera",
  },
  {
    id: "fv-dalat-shorts",
    url: "https://www.youtube.com/shorts/9bZkp7q19f0",
    title: "Pha pour-over 6h sáng giữa rừng thông Đà Lạt",
    caption: "YouTube Shorts 9:16",
    linkedPostHref: "/journeys/3-buoi-sang-ca-phe-rung-thong-da-lat",
    linkedPostTitle: "Xem chuyến đi →",
    durationLabel: "0:42",
    art: "dalat",
  },
];

export const SEED_COMMENTS: CommentItem[] = [
  {
    _id: "seed-c1",
    postSlug: "fujifilm-x100vi-sau-4-thang-duong-dai",
    authorName: "Minh Quân",
    content:
      "Cảm ơn bài review rất kỹ và chân thật! Mình thích nhất cách bạn nhúng clip dọc test màu ngay giữa bài, xem trên điện thoại rất mượt.",
    approved: true,
    createdAt: "2026-11-18T09:30:00Z",
  },
  {
    _id: "seed-c2",
    postSlug: "fujifilm-x100vi-sau-4-thang-duong-dai",
    authorName: "Lan Anh",
    content:
      "Bạn cho mình hỏi khi đi Hà Giang bạn có gắn thêm filter chống bụi cho ống kính X100VI không ạ?",
    approved: true,
    createdAt: "2026-11-15T14:15:00Z",
  },
  {
    _id: "seed-c3",
    postSlug: "ha-giang-mua-hoa-cuc-cam-4n3d",
    authorName: "Hoàng Nam",
    content:
      "Bản đồ lộ trình 4 ngày chi tiết quá! Tháng sau mình cũng định đi chậm kiểu này và ghé Lô Lô Chải ngủ lại một đêm.",
    approved: true,
    createdAt: "2026-11-19T11:05:00Z",
  },
];
