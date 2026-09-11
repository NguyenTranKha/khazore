export const CATEGORIES = ["Đọc", "Ở Sài Gòn", "Ghi chép", "Thiết kế"] as const;

export type Category = (typeof CATEGORIES)[number];

export type CoverTone = "moss" | "ink" | "clay" | "tea" | "pine";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: Category;
  date: string;
  dateLabel: string;
  readingMinutes: number;
  image: string;
  imageSrcSet: string;
  imageAlt: string;
  cover: CoverTone;
  featured?: boolean;
};

function unsplash(id: string) {
  const base = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=78`;
  return {
    image: `${base}&w=1400`,
    imageSrcSet: `${base}&w=640 640w, ${base}&w=960 960w, ${base}&w=1400 1400w, ${base}&w=1920 1920w`,
  };
}

export const posts: Post[] = [
  {
    id: "1",
    slug: "viet-ben-ly-den-da",
    title: "Viết bên ly đen đá",
    excerpt:
      "Cà phê đen đá không phải thức uống. Ở Sài Gòn, nó là chỗ ngồi, là khoảng lặng giữa hai việc, là lúc chữ bắt đầu chịu ra.",
    category: "Ghi chép",
    date: "2026-09-04",
    dateLabel: "4 tháng 9, 2026",
    readingMinutes: 8,
    ...unsplash("photo-1495474472287-4d71bcdd2085"),
    imageAlt: "Ly cà phê trên bàn gỗ, ánh sáng buổi sáng",
    cover: "clay",
    featured: true,
    body: [
      "Sài Gòn dạy người ta làm nhiều việc cùng lúc. Xe, điện thoại, nắng, tiếng còi. Ngồi xuống với một ly đen đá là cách tôi xin một khoảng lặng, dù quán vẫn ồn.",
      "Ly thủy tinh mỏng, đá chiếm nửa, cà phê đặc sánh. Không sữa, không đường. Đắng là điểm tựa. Tôi mở sổ, không phải vì đã có ý tưởng, mà vì nếu không mở thì cả buổi sẽ trôi đi như chưa từng có.",
      "Những câu đầu thường vụng. Tôi gạch. Viết lại. Bên ngoài, một người bán vé số đi qua, rồi một xe bún riêu. Thành phố không dừng vì mình đang nghĩ. Đó là điều hay: chữ phải chen được vào đời sống, không cần một căn phòng im.",
      "Tôi không viết mỗi ngày. Có tuần chỉ được vài dòng. Nguyễn Trần Kha tồn tại vì vậy — để những gì đáng nhớ không bị ép thành khuôn đều đặn. Một bài ra đời khi nó chịu ra, không phải khi lịch nhắc.",
      "Nếu bạn đang đọc, cảm ơn vì đã chậm lại. Có ít thứ trên mạng còn yêu cầu điều đó.",
    ],
  },
  {
    id: "2",
    slug: "doc-cham-doc-lai",
    title: "Đọc chậm, đọc lại",
    excerpt:
      "Một cuốn sách hay không cần đọc nhanh. Nó cần chỗ trống giữa các câu, và vài buổi chiều để quay lại trang đã gấp.",
    category: "Đọc",
    date: "2026-08-28",
    dateLabel: "28 tháng 8, 2026",
    readingMinutes: 6,
    ...unsplash("photo-1519682337058-a94d519337bc"),
    imageAlt: "Giá sách gỗ và ánh sáng cửa sổ",
    cover: "ink",
    body: [
      "Người ta khoe số sách đọc trong năm như khoe số kilômét chạy bộ. Tôi không ghét việc đó. Chỉ thấy lạ: đọc đâu phải cuộc đua.",
      "Có những cuốn tôi đọc ba tháng. Không phải vì dày. Vì mỗi chương cần một khoảng lặng — đi dạo, pha trà, để nhân vật ngồi lại trong đầu. Đọc xong một mạch rồi quên ngay thì khác gì lướt tin.",
      "Tôi gấp góc trang khi một câu làm mình dừng lại. Không highlight màu vàng. Gấp góc là cử chỉ nhỏ, gần như bí mật giữa mình với giấy.",
      "Đọc lại còn quý hơn đọc lần đầu. Lần đầu là làm quen. Lần sau là nhận ra mình đã khác, nên câu cũ cũng khác. Sách không đổi. Người đọc thì có.",
    ],
  },
  {
    id: "3",
    slug: "hem-nho-gan-cho-ben-thanh",
    title: "Hẻm nhỏ gần chợ Bến Thành",
    excerpt:
      "Trong hẻm, thời gian đi chậm hơn ngoài đường. Người ta bán chè, sửa xe, phơi áo. Tôi hay đứng đó một lúc trước khi đi tiếp.",
    category: "Ở Sài Gòn",
    date: "2026-08-21",
    dateLabel: "21 tháng 8, 2026",
    readingMinutes: 5,
    ...unsplash("photo-1583417319070-4a69db38a482"),
    imageAlt: "Hẻm phố Việt Nam với đèn và nhà ống",
    cover: "moss",
    body: [
      "Từ Lê Thánh Tôn rẽ vào, tiếng xe giảm đi một nửa. Hẻm đủ rộng cho một xe máy và một người đi bộ, nếu cả hai biết nhường.",
      "Nhà ống hai bên, ban công phơi khăn. Một quán chè không biển hiệu, chỉ có mấy ghế nhựa và nồi trên bếp than. Bà chủ nhớ tôi uống chè đậu xanh ít đường.",
      "Tôi không chụp ảnh hẻm này. Mỗi lần giơ máy, nó thành cảnh. Khi không giơ máy, nó chỉ là chỗ người ta sống — và sống thì không cần khung hình.",
      "Sài Gòn hay bị kể bằng phố lớn, bảng đèn, kẹt xe. Nhưng thành phố này giữ mình trong những đoạn không có tên trên bản đồ du lịch. Hẻm là chỗ đó.",
    ],
  },
  {
    id: "4",
    slug: "so-tay-va-muc-xanh",
    title: "Sổ tay và mực xanh",
    excerpt:
      "Tôi không tin ghi chú trên điện thoại. Chữ viết tay giữ được nhịp thở của buổi đó, kể cả khi nội dung chẳng còn quan trọng.",
    category: "Ghi chép",
    date: "2026-08-14",
    dateLabel: "14 tháng 8, 2026",
    readingMinutes: 5,
    ...unsplash("photo-1455390582262-044cdead277a"),
    imageAlt: "Sổ tay mở và bút máy trên bàn",
    cover: "tea",
    body: [
      "Bút máy, mực xanh lục nhạt. Không phải vì cổ điển. Vì khi viết, tôi buộc phải chậm — mực ướt, không xóa được bằng một phím.",
      "Điện thoại ghi đúng chữ, sai nhịp. Một ý tưởng lúc nửa đêm gõ vào Notes thì phẳng. Cùng ý đó viết vào sổ thì nghiêng, đậm nhạt khác nhau, có chỗ gạch xéo. Đó là dấu vết của lúc viết, không chỉ của nội dung.",
      "Tôi không dùng sổ làm bullet journal. Không sticker, không kẻ bảng thói quen. Chỉ ngày, rồi vài câu. Có trang chỉ có một từ. Có trang chi chít vì mưa, không đi được.",
      "Mực xanh sẽ phai. Tôi biết. Phai cũng là một phần của việc giữ — không phải mọi thứ cần vĩnh viễn mới đáng viết.",
    ],
  },
  {
    id: "5",
    slug: "khoang-trang-cung-la-thiet-ke",
    title: "Khoảng trắng cũng là thiết kế",
    excerpt:
      "Một trang đẹp không phải vì nhồi chữ. Nó đẹp vì biết để yên những chỗ trống, để mắt có chỗ nghỉ.",
    category: "Thiết kế",
    date: "2026-08-07",
    dateLabel: "7 tháng 8, 2026",
    readingMinutes: 7,
    ...unsplash("photo-1499750310107-5fef28a66643"),
    imageAlt: "Bàn làm việc gọn, giấy và tách cà phê",
    cover: "pine",
    body: [
      "Người mới học thiết kế hay sợ chỗ trống. Trống thì phí. Trống thì như chưa xong. Họ nhét icon, nhét màu, nhét chữ cho đầy — rồi lạ là không ai muốn đọc.",
      "Khoảng trắng không phải sự vắng mặt. Nó là nhịp. Như nghỉ trong nhạc. Bỏ nghỉ đi, bản nhạc thành tiếng ồn.",
      "Tôi nhìn báo giấy cũ: cột hẹp, lề rộng, tiêu đề không cần bóng. Mắt biết đi đâu vì trang biết im. Màn hình hiện đại làm ngược lại — mọi thứ cùng kêu, cùng lúc.",
      "Khi làm một trang, tôi hỏi: cái này có cần không? Nếu xóa đi mà ý vẫn rõ, thì xóa. Cái còn lại mới là thiết kế. Phần bỏ đi cũng vậy.",
    ],
  },
  {
    id: "6",
    slug: "nhung-trang-khong-can-gap",
    title: "Những trang không cần gấp",
    excerpt:
      "Có những đoạn văn tôi đọc ba lần. Không phải vì khó. Vì muốn ở lại thêm một chút, như đứng trước cửa sổ mưa.",
    category: "Đọc",
    date: "2026-07-30",
    dateLabel: "30 tháng 7, 2026",
    readingMinutes: 4,
    ...unsplash("photo-1512820790803-83ca734da794"),
    imageAlt: "Sách mở trên đùi, ánh sáng dịu",
    cover: "ink",
    body: [
      "Không phải trang nào cũng đáng gấp góc. Có trang chỉ để đi qua, như hành lang dẫn tới một căn phòng.",
      "Rồi có trang làm mình ngừng. Không phải vì câu hay theo kiểu trích dẫn. Vì nó nói đúng một việc mình chưa biết cách nói. Lúc đó tôi không gấp. Tôi để sách mở, nhìn ra ngoài.",
      "Những trang ấy không cần đánh dấu. Chúng tự tìm lại mình, vài tháng sau, khi một việc xảy ra giống như trong sách. Đọc không phải để nhớ — để nhận ra.",
      "Tôi giữ một chồng sách nhỏ trên bàn. Không quá mười cuốn. Đủ để thỉnh thoảng cầm lên, mở đúng chỗ cũ, đọc lại đoạn không cần gấp.",
    ],
  },
  {
    id: "7",
    slug: "sai-gon-sau-con-mua",
    title: "Sài Gòn sau cơn mưa",
    excerpt:
      "Mưa tạnh, phố bốc hơi. Xe máy len qua vũng nước. Mùi đất và xăng hòa vào nhau — thứ mùi chỉ có ở thành phố này.",
    category: "Ở Sài Gòn",
    date: "2026-07-22",
    dateLabel: "22 tháng 7, 2026",
    readingMinutes: 6,
    ...unsplash("photo-1428592953211-077101b8381b"),
    imageAlt: "Cửa sổ kính ướt mưa, phố mờ phía ngoài",
    cover: "moss",
    body: [
      "Mưa Sài Gòn không báo trước cho tử tế. Trời vẫn sáng, rồi một góc mây kéo tới, rồi cả phố chạy. Người bán hàng kéo bạt. Xe dừng dưới mái hiên.",
      "Tôi thích lúc mưa vừa tạnh hơn lúc mưa. Đường bóng, cây sạch, không khí như được giặt. Người ta ra lại, chậm hơn một nhịp, như vừa được nhắc là mình sống dưới trời.",
      "Vũng nước phản chiếu bảng hiệu, dây điện, một mảnh trời vẫn còn xám. Trẻ con thích dẫm. Người lớn tránh. Tôi đi chậm, nhìn cả hai.",
      "Có người ghét mùa mưa vì kẹt, vì ngập. Tôi hiểu. Nhưng nếu chỉ giữ nắng, thành phố này sẽ thiếu một thứ: sự chịu đựng chung, rất ngắn, giữa những người lạ dưới cùng một mái.",
    ],
  },
  {
    id: "8",
    slug: "viet-khi-thanh-pho-ngu",
    title: "Viết khi thành phố ngủ",
    excerpt:
      "Nửa đêm, máy lạnh kêu nhỏ. Tôi mở sổ. Những câu ban ngày không dám viết thì ban đêm tự đến.",
    category: "Ghi chép",
    date: "2026-07-11",
    dateLabel: "11 tháng 7, 2026",
    readingMinutes: 5,
    ...unsplash("photo-1488190211105-8b0e65b80b4e"),
    imageAlt: "Bàn viết ban đêm dưới ánh đèn",
    cover: "clay",
    body: [
      "Ban ngày chữ bị cắt ngang. Chuông, tin nhắn, việc phải trả lời. Ban đêm thì ít người đòi mình hơn.",
      "Tôi không phải người thức khuya vì phong cách. Chỉ là sau mười một giờ, đầu bớt cãi. Câu nào ban trưa còn vòng vo thì lúc này đi thẳng.",
      "Đèn bàn, một ly nước, điện thoại úp sấp. Không nhạc — nhạc hay kéo mình đi chỗ khác. Tiếng máy lạnh đủ để không im tuyệt đối, đủ để không phải nghĩ.",
      "Sáng hôm sau đọc lại, đôi khi thấy vụng. Không sao. Đêm không phải lúc sửa. Đêm là lúc cho chữ ra. Sửa là việc của ánh sáng.",
    ],
  },
  {
    id: "9",
    slug: "chu-serif-va-su-cham-rai",
    title: "Chữ serif và sự chậm rãi",
    excerpt:
      "Serif không chỉ là chân chữ. Nó là cách nói: hãy đọc chậm, như người ta từng đọc trên giấy.",
    category: "Thiết kế",
    date: "2026-06-29",
    dateLabel: "29 tháng 6, 2026",
    readingMinutes: 7,
    ...unsplash("photo-1456327102063-fb5054efe647"),
    imageAlt: "Chữ đúc chì và bản in thử trên giấy",
    cover: "tea",
    body: [
      "Sans-serif tiện. Nó sạch, hiện đại, hợp nút bấm và bảng điều khiển. Tôi dùng nó cho giao diện. Nhưng khi ngồi đọc một bài dài, tôi muốn serif.",
      "Chân chữ là điểm tựa cho mắt, kéo mình từ chữ này sang chữ kia. Trên giấy, điều đó đã được kiểm chứng vài trăm năm. Trên màn hình, người ta từng sợ serif mờ. Màn hình bây giờ đủ nét. Cái sợ ấy hết hạn.",
      "Chọn font là chọn tốc độ. Một tiêu đề Grotesk lớn nói: nhìn đây, mau. Một tiêu đề serif vừa phải nói: vào đây, ở lại. Nguyễn Trần Kha chọn cái sau — không vì cũ, vì hợp với việc viết chậm.",
      "Tôi không chống sans. Chỉ chống việc mặc định rằng mọi thứ phải cùng một họ chữ, cùng một nhịp. Trang đọc không phải bảng điều khiển. Nó là chỗ ngồi.",
    ],
  },
];

export const featuredPost = posts.find((p) => p.featured) ?? posts[0];

export const recentPosts = posts.filter((p) => !p.featured);

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
