
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  MessageCircle,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Wifi,
  History,
  Info,
  ChevronDown,
  Navigation,
  CreditCard,
  Headphones,
  Phone
} from 'lucide-react';
import { DESTINATIONS, REVIEWS, FAQS } from './constants/data.ts';
import { Destination, eSIMPlan } from './types.ts';
import { getTravelAdvice } from './services/geminiService.ts';

// --- UI Components ---

// Fixed Badge component with proper TypeScript types to handle children and key correctly
interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform">T</div>
          <div className="flex flex-col">
            <span className={`text-xl font-extrabold tracking-tighter leading-none ${isScrolled ? 'text-slate-900' : 'text-white'}`}>eSim Tabi</span>
            <span className={`text-[10px] font-medium tracking-[0.2em] uppercase ${isScrolled ? 'text-slate-400' : 'text-slate-300'}`}>International</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Điểm đến', 'Hướng dẫn', 'Blog', 'Check IMEI'].map((item) => (
            <a key={item} href="#" className={`text-sm font-semibold hover:text-blue-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}>{item}</a>
          ))}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-blue-500/20 active:scale-95">
            Quản lý eSIM
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="text-slate-900" /> : <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 right-0 h-screen bg-white p-6 flex flex-col gap-6 z-[60]">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
          </div>
          {['Điểm đến', 'Hướng dẫn', 'Blog', 'Hỗ trợ'].map((item) => (
            <a key={item} href="#" className="text-2xl font-bold text-slate-800 py-2 border-b border-slate-100">{item}</a>
          ))}
          <button className="mt-auto bg-blue-600 text-white py-5 rounded-3xl font-bold text-lg">Đăng nhập / Đăng ký</button>
        </div>
      )}
    </nav>
  );
};

// Fixed Hero component with proper TypeScript types
interface HeroProps {
  onSearch: (val: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden hero-pattern">
      <div className="absolute inset-0 bg-[#0f172a] -z-20"></div>
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-40">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-blue-600/20 rounded-full blur-[160px]"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[140px]"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-8 py-1.5 px-4">
            ⭐️ Đánh giá 4.9/5 bởi 10,000+ du khách
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
            Kết nối Thế giới <br /> 
            <span className="gradient-text">Không cần đổi SIM</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Sử dụng mạng 5G tốc độ cao tại hơn 190+ quốc gia. 
            Cài đặt trong 60 giây, nhận mã QR qua Email tức thì.
          </p>

          <div className="relative group max-w-2xl mx-auto mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[28px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white rounded-[24px] shadow-2xl overflow-hidden p-2">
              <div className="pl-6 text-slate-400">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder="Nhập quốc gia bạn sẽ đến..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 py-5 px-4 text-lg font-medium"
                onChange={(e) => onSearch(e.target.value)}
              />
              <button className="bg-slate-900 hover:bg-blue-600 text-white px-10 py-5 rounded-[20px] font-bold transition-all flex items-center gap-2">
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-10 opacity-70">
            {['No Roaming Fees', 'Instant Activation', '24/7 Support'].map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-white font-semibold text-sm">
                <CheckCircle2 size={18} className="text-blue-500" /> {feat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Fixed DestinationCard component with proper TypeScript types
interface DestinationCardProps {
  destination: Destination;
  onClick: (d: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:border-blue-200 transition-all cursor-pointer p-4 plan-card-premium"
      onClick={() => onClick(destination)}
    >
      <div className="relative h-64 overflow-hidden rounded-[24px] mb-6">
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-slate-900 backdrop-blur shadow-sm py-1">
            <div className="flex items-center gap-1">
              <Star size={12} fill="#f59e0b" className="text-amber-500" />
              {destination.rating}
            </div>
          </Badge>
        </div>
      </div>
      
      <div className="px-2">
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{destination.name}</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">{destination.shortDesc}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giá từ</p>
            <p className="text-xl font-black text-blue-600">{destination.plans[0].price.toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Fixed PlanModal component with proper TypeScript types
interface PlanModalProps {
  destination: Destination;
  onClose: () => void;
}

const PlanModal: React.FC<PlanModalProps> = ({ destination, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden max-h-[95vh]">
        
        {/* Sidebar Info */}
        <div className="md:w-[380px] bg-[#f8fafc] p-10 flex flex-col border-r border-slate-100 overflow-y-auto">
          <button onClick={onClose} className="mb-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-colors">
            <X size={20} />
          </button>
          
          <img src={destination.imageUrl} alt={destination.name} className="w-full h-48 object-cover rounded-3xl mb-8 shadow-2xl shadow-slate-200" />
          
          <div className="mb-8">
            <h2 className="text-4xl font-black text-slate-900 mb-3">{destination.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.floor(destination.rating) ? "#f59e0b" : "none"} className="text-amber-500" />)}
              </div>
              <span className="text-sm font-bold text-slate-500">({destination.reviewsCount} đánh giá)</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">{destination.description}</p>
          </div>

          <div className="space-y-4 mt-auto">
             <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                <Wifi className="text-blue-500 shrink-0" size={18} />
                <div>
                  <p className="text-xs font-bold text-slate-900">Mạng lưới tin cậy</p>
                  <p className="text-[11px] text-slate-500">Tự động kết nối mạng tốt nhất.</p>
                </div>
             </div>
             <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                <Zap className="text-blue-500 shrink-0" size={18} />
                <div>
                  <p className="text-xs font-bold text-slate-900">Giao hàng tức thì</p>
                  <p className="text-[11px] text-slate-500">Mã QR gửi qua email sau 1 phút.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Plans Selection */}
        <div className="flex-1 p-10 overflow-y-auto bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Chọn gói dữ liệu</h3>
              <p className="text-slate-500 text-sm">Tất cả gói đều hỗ trợ Hotspot và cài đặt 1 chạm.</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-slate-100 text-slate-600">eSIM</Badge>
              <Badge className="bg-slate-100 text-slate-600">Trả trước</Badge>
            </div>
          </div>

          <div className="grid gap-6">
            {destination.plans.map(plan => (
              <div key={plan.id} className={`group p-8 rounded-[32px] border-2 transition-all relative overflow-hidden ${plan.isPopular ? 'border-blue-600 bg-blue-50/20' : 'border-slate-100 hover:border-blue-300'}`}>
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest">Bán chạy nhất</div>
                )}
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex-1">
                    <h4 className="text-2xl font-black text-slate-900 mb-4">{plan.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Dung lượng</span>
                        <div className="flex items-center gap-2 font-bold text-slate-800"><Globe size={16} className="text-blue-500"/> {plan.data}</div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Thời hạn</span>
                        <div className="flex items-center gap-2 font-bold text-slate-800"><History size={16} className="text-blue-500"/> {plan.duration}</div>
                      </div>
                      <div className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">Nhà mạng</span>
                        <div className="flex gap-2">
                          {plan.networks?.map(net => <Badge key={net} className="bg-white border border-slate-200 text-slate-500 lowercase font-medium">{net}</Badge>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 pt-6 lg:pt-0 border-slate-200/50">
                    <div className="text-right">
                      <p className="text-sm text-slate-400 line-through font-medium">{plan.originalPrice.toLocaleString('vi-VN')}đ</p>
                      <p className="text-3xl font-black text-slate-900">{plan.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                    <button className="bg-slate-900 hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 hover:shadow-blue-500/30 flex items-center gap-2 active:scale-95">
                      Mua ngay <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex items-center gap-4">
             <Info className="text-blue-500 shrink-0" size={24} />
             <p className="text-xs text-slate-500 leading-relaxed">
               Lưu ý: eSIM của bạn sẽ không bao gồm số điện thoại địa phương. Bạn vẫn có thể sử dụng các ứng dụng như Zalo, WhatsApp, Messenger bình thường qua dữ liệu di động.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-600 mb-4">Giải đáp</Badge>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Câu hỏi thường gặp</h2>
          <p className="text-slate-500">Mọi thứ bạn cần biết về eSIM Tabi.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <button 
                className="w-full flex items-center justify-between p-7 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-lg font-bold text-slate-800">{faq.question}</span>
                <ChevronDown className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openIndex === idx ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-7 pt-0 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Xin chào! Tôi là Tabi AI. Bạn chuẩn bị đi du lịch nước nào để tôi tư vấn gói cước tốt nhất?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getTravelAdvice(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[110]">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[600px] rounded-[40px] shadow-2xl flex flex-col border border-slate-100 overflow-hidden mb-6 animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-[#0f172a] p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Smartphone size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm">Tabi AI Concierge</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tư vấn viên 24/7</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-1.5 p-4 bg-white/50 w-20 rounded-full items-center justify-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-150"></span>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
            <input 
              type="text" 
              placeholder="Bạn cần tư vấn gì?" 
              className="flex-1 text-sm bg-slate-100 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 border-none font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-100 active:scale-95">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : null}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group w-20 h-20 bg-blue-600 text-white rounded-[28px] shadow-2xl shadow-blue-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative"
      >
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-white flex items-center justify-center text-[10px] font-black">1</div>
        <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const filteredDestinations = DESTINATIONS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.slug.includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero onSearch={setSearchQuery} />

      {/* Featured Destinations */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-[0.3em] mb-4">
                <Navigation size={16} /> Thế giới trong tay bạn
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Điểm đến nổi bật nhất</h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm font-medium">Chúng tôi đã chọn lọc những gói cước tốt nhất dựa trên hàng nghìn phản hồi thực tế từ khách du lịch.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredDestinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest} onClick={setSelectedDestination} />
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-32 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                <Search size={40} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Không tìm thấy "{searchQuery}"</h3>
              <p className="text-slate-500">Thử tìm kiếm theo châu lục hoặc liên hệ Tabi AI để được hỗ trợ nhé!</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Marks & Stats */}
      <section className="py-16 bg-[#0f172a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: '190+', label: 'Quốc gia & Vùng lãnh thổ' },
              { val: '10K+', label: 'Du khách tin dùng mỗi tháng' },
              { val: '99.9%', label: 'Độ ổn định đường truyền' },
              { val: '24/7', label: 'Hỗ trợ kỹ thuật chuyên sâu' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-black text-white mb-2">{stat.val}</p>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why eSim Tabi? - Premium Cards */}
      <section className="py-32 bg-[#fcfdfe] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">Tại sao du khách chọn Tabi?</h2>
            <p className="text-lg text-slate-500">Đơn giản hóa trải nghiệm kết nối, để bạn tập trung trọn vẹn vào chuyến đi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <CreditCard />, title: 'Thanh toán linh hoạt', desc: 'Hỗ trợ chuyển khoản, MoMo, thẻ tín dụng. Nhận mã ngay sau khi thanh toán.' },
              { icon: <ShieldCheck />, title: 'An tâm tuyệt đối', desc: 'Chính sách hoàn tiền 100% nếu eSIM lỗi do kỹ thuật. Không rủi ro.' },
              { icon: <Headphones />, title: 'Hỗ trợ người Việt', desc: 'Đội ngũ support người Việt am hiểu các dòng máy, hỗ trợ tận tình qua Zalo.' },
            ].map((item, i) => (
              <div key={i} className="group p-12 rounded-[48px] bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-blue-600 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Sẵn sàng cho chuyến đi?</h2>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium opacity-80">
                Gia nhập cộng đồng 10,000+ du khách thông thái sử dụng eSim Tabi. Kết nối ngay hôm nay.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-blue-600 px-12 py-6 rounded-3xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all">Mua eSIM ngay</button>
                <button className="bg-blue-700 text-white px-12 py-6 rounded-3xl font-black text-lg shadow-xl hover:bg-blue-800 transition-all border border-blue-500/30">Cẩm nang cài đặt</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Professional & Detailed */}
      <footer className="bg-slate-950 text-white pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl">T</div>
                <span className="text-3xl font-black tracking-tighter">eSim Tabi</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8 font-medium">
                Sứ mệnh của chúng tôi là xóa bỏ mọi rào cản kết nối khi bạn khám phá thế giới. eSIM Tabi - Người bạn đồng hành số.
              </p>
              <div className="flex gap-4">
                {[Globe, Smartphone, Zap].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all text-slate-400 hover:text-white">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-blue-500">Sản phẩm</h4>
              <ul className="space-y-4 text-slate-400 font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">eSIM Nhật Bản</a></li>
                <li><a href="#" className="hover:text-white transition-colors">eSIM Hàn Quốc</a></li>
                <li><a href="#" className="hover:text-white transition-colors">eSIM Châu Âu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">eSIM Mỹ / Canada</a></li>
                <li><a href="#" className="hover:text-white transition-colors">eSIM Global</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-blue-500">Hỗ trợ khách hàng</h4>
              <ul className="space-y-4 text-slate-400 font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn cài đặt iOS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn cài đặt Android</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kiểm tra độ tương thích</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chính sách hoàn tiền</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bảo mật thông tin</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-blue-500">Liên hệ</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-blue-500"><Phone size={18} /></div>
                  <span className="font-bold">0123.456.789</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-blue-500"><Globe size={18} /></div>
                  <span className="font-bold">contact@esimtabi.com</span>
                </div>
                <div className="p-6 bg-slate-900 rounded-3xl">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Văn phòng đại diện</p>
                  <p className="text-sm font-bold leading-relaxed">123 Đường Du Lịch, Quận 1, <br />TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <p>© 2024 eSim Tabi. Được thiết kế bởi đội ngũ kỹ thuật Tabi.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white">Điều khoản</a>
              <a href="#" className="hover:text-white">Cookies</a>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & AI */}
      {selectedDestination && (
        <PlanModal 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
        />
      )}
      
      <AIConcierge />
    </main>
  );
}
