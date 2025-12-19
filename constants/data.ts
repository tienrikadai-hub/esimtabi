
import { Destination, Review, FAQItem } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Nhật Bản',
    code: 'JP',
    slug: 'nhat-ban',
    shortDesc: 'Mạng Softbank/Docomo 5G cực nhanh.',
    description: 'Tận hưởng kết nối không giới hạn tại xứ sở hoa anh đào. eSIM của chúng tôi sử dụng hạ tầng của Softbank và Docomo, đảm bảo sóng khỏe từ Tokyo đến các vùng nông thôn Hokkaido.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 1240,
    plans: [
      { id: 'jp-1', name: 'Standard Daily', data: '1GB/Ngày', duration: '5 Ngày', price: 190000, originalPrice: 250000, networks: ['Softbank'], features: ['Hotspot', '4G/5G'] },
      { id: 'jp-2', name: 'Premium Unlimited', data: 'Không giới hạn', duration: '7 Ngày', price: 350000, originalPrice: 420000, isPopular: true, networks: ['Docomo', 'Softbank'], features: ['Hotspot', '5G High Speed', 'No FUP'] },
    ]
  },
  {
    id: '2',
    name: 'Hàn Quốc',
    code: 'KR',
    slug: 'han-quoc',
    shortDesc: 'Sóng SK Telecom/KT ổn định nhất.',
    description: 'Trải nghiệm tốc độ internet hàng đầu thế giới tại Hàn Quốc. eSIM hỗ trợ đa mạng, tự động chuyển vùng sang nhà mạng mạnh nhất.',
    imageUrl: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 850,
    plans: [
      { id: 'kr-1', name: 'Lite Pack', data: '3GB Tổng cộng', duration: '5 Ngày', price: 150000, originalPrice: 180000, networks: ['SKT'], features: ['Hotspot'] },
      { id: 'kr-2', name: 'Power Pack', data: '2GB/Ngày', duration: '10 Ngày', price: 390000, originalPrice: 480000, isPopular: true, networks: ['SKT', 'KT'], features: ['Hotspot', '5G Ready'] },
    ]
  },
  {
    id: '6',
    name: 'Châu Âu (35 Nước)',
    code: 'EU',
    slug: 'chau-au',
    shortDesc: 'Một eSIM cho cả lục địa.',
    description: 'Đi du lịch qua Pháp, Ý, Đức... mà không cần đổi SIM. eSIM Châu Âu của Tabi hỗ trợ chuyển vùng miễn phí giữa 35 quốc gia thành viên.',
    imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 2100,
    plans: [
      { id: 'eu-1', name: 'Euro Explorer', data: '10GB', duration: '30 Ngày', price: 490000, originalPrice: 600000, isPopular: true, networks: ['Orange', 'Vodafone', 'O2'], features: ['Hotspot', 'Multi-country'] },
      { id: 'eu-2', name: 'Grand Europe', data: '20GB', duration: '30 Ngày', price: 850000, originalPrice: 1100000, networks: ['Orange', 'Vodafone'], features: ['Hotspot', '5G in major cities'] },
    ]
  }
];

export const FAQS: FAQItem[] = [
  { question: "eSIM là gì và nó hoạt động như thế nào?", answer: "eSIM là SIM kỹ thuật số được tích hợp sẵn trong điện thoại. Bạn chỉ cần quét mã QR để cài đặt mà không cần tháo SIM vật lý." },
  { question: "Điện thoại của tôi có hỗ trợ eSIM không?", answer: "Hầu hết các dòng iPhone từ XS trở lên, Samsung S20 trở lên và Google Pixel 3 trở lên đều hỗ trợ eSIM. Bạn có thể kiểm tra bằng cách soạn *#06# - nếu có EID là có hỗ trợ." },
  { question: "Tôi nên mua eSIM khi nào?", answer: "Bạn nên mua trước chuyến đi khoảng 1-2 ngày. Mã QR sẽ được gửi ngay lập tức nhưng gói cước thường chỉ bắt đầu tính khi bạn đến nơi và có sóng." }
];

export const REVIEWS: Review[] = [
  { id: 'r1', author: 'Nguyễn Minh Anh', rating: 5, content: 'Dùng eSIM ở Nhật rất tốt, vừa xuống sân bay quét mã là có mạng ngay. Sẽ ủng hộ lần sau!', date: '15/05/2024', location: 'Tokyo, Japan' },
  { id: 'r2', author: 'Lê Thu Thảo', rating: 5, content: 'Tư vấn nhiệt tình, giá rẻ hơn hẳn so với mua sim ở sân bay bên kia.', date: '10/06/2024', location: 'Paris, France' },
];
