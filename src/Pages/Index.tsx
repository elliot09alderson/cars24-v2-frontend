import CarShowcase from "@/components/CarShowcase";
import HomeNavbar from "../components/HomeNavbar.jsx";
import Requirement from "./Home/Sections/Requirement.jsx";
import Footer from "../component_01/Footer.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel, Keyboard, Navigation, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Car } from "lucide-react";

export default function Index() {
  return (
    <div>
      <HomeNavbar />
      <CarShowcase />
      <Requirement />

      {/* Promotional Banners Carousel */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">Special Offers & Deals</h2>
          <p className="text-gray-500">Exclusive offers on government auctioned vehicles</p>
        </div>
        <Swiper
          cssMode={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index: number, className: string) => {
              return `<span class="${className} !w-2.5 !h-2.5 !rounded-full !bg-gray-400 [&.swiper-pagination-bullet-active]:!bg-gray-900 [&.swiper-pagination-bullet-active]:!w-8"></span>`;
            },
          }}
          modules={[Mousewheel, Keyboard, Navigation, Autoplay, Pagination]}
          className="w-full rounded-2xl overflow-hidden"
        >
          {/* Banner 1 - Mega Sale */}
          <SwiperSlide>
            <div className="relative h-[200px] lg:h-[280px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-12">
                <div className="max-w-lg">
                  <div className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                    LIMITED TIME OFFER
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                    Mega Year-End Sale
                  </h2>
                  <p className="text-gray-300 text-sm lg:text-base mb-4">
                    Get up to ₹50,000 OFF on select premium vehicles. Don't miss out!
                  </p>
                  <Link to="/ads" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Shop Now <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="hidden lg:flex items-center gap-4">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                    <p className="text-4xl font-bold text-white">₹50K</p>
                    <p className="text-gray-400 text-sm">Max Discount</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Banner 2 - Easy EMI */}
          <SwiperSlide>
            <div className="relative h-[200px] lg:h-[280px] bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-25"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60"></div>
              <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-12">
                <div className="max-w-lg">
                  <div className="inline-flex items-center gap-2 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold mb-3">
                    EASY FINANCE
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                    EMI Starting ₹9,999/mo
                  </h2>
                  <p className="text-gray-300 text-sm lg:text-base mb-4">
                    0% processing fee. Instant approval. Flexible tenure up to 7 years.
                  </p>
                  <Link to="/ads" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Calculate EMI <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="hidden lg:flex items-center gap-3">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                    <p className="text-2xl font-bold text-white">0%</p>
                    <p className="text-gray-400 text-xs">Processing</p>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                    <p className="text-2xl font-bold text-white">7 Yrs</p>
                    <p className="text-gray-400 text-xs">Max Tenure</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Banner 3 - Exchange Bonus */}
          <SwiperSlide>
            <div className="relative h-[200px] lg:h-[280px] bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/75 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-12">
                <div className="max-w-lg">
                  <div className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                    EXCHANGE OFFER
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                    ₹25,000 Exchange Bonus
                  </h2>
                  <p className="text-gray-300 text-sm lg:text-base mb-4">
                    Sell your old car & get extra bonus on your new purchase. Best price guaranteed!
                  </p>
                  <Link to="/ads" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Get Valuation <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-red-500/20 flex items-center justify-center border-4 border-red-500/40">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-white">₹25K</p>
                        <p className="text-red-400 text-xs font-semibold">BONUS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Banner 4 - Free Warranty */}
          <SwiperSlide>
            <div className="relative h-[200px] lg:h-[280px] bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-25"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/50"></div>
              <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-12">
                <div className="max-w-lg">
                  <div className="inline-flex items-center gap-2 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold mb-3">
                    FREE WARRANTY
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                    1 Year Engine Warranty
                  </h2>
                  <p className="text-gray-300 text-sm lg:text-base mb-4">
                    Free 1-year warranty on engine & transmission. Extended warranty available.
                  </p>
                  <Link to="/ads" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                    View Cars <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="hidden lg:flex items-center">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                    <Shield className="size-10 text-white" />
                    <div>
                      <p className="text-2xl font-bold text-white">1 Year</p>
                      <p className="text-gray-400 text-sm">Free Warranty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Banner 5 - SUV Festival */}
          <SwiperSlide>
            <div className="relative h-[200px] lg:h-[280px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-12">
                <div className="max-w-lg">
                  <div className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                    SUV FESTIVAL
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                    Premium SUVs from ₹4.99L
                  </h2>
                  <p className="text-gray-300 text-sm lg:text-base mb-4">
                    XUV700, Safari, Creta, Seltos & more. All inspected & certified.
                  </p>
                  <Link to="/ads" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Explore SUVs <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="hidden lg:flex items-center gap-3">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                    <Car className="size-8 text-white mx-auto mb-1" />
                    <p className="text-gray-400 text-xs">50+ SUVs</p>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                    <p className="text-2xl font-bold text-white">₹4.99L</p>
                    <p className="text-gray-400 text-xs">Starting</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Footer />
    </div>
  );
}
