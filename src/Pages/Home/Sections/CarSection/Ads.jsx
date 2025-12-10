import { Search, BadgeCheck, Shield, Wallet, Car, ArrowRight, Phone, Percent, FileCheck, Gavel } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel, Keyboard, Navigation, Autoplay, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds } from "../../../../../rtk/slices/adSlice.js";
import { Link } from "react-router-dom";
import { searchVehicle } from "../../../../../rtk/slices/vehicleSlice.js";

// Promotional Banners Data - Dark Theme
const promoBanners = [
  {
    id: 1,
    title: "Government Auctioned Cars",
    subtitle: "100% Legal & Verified",
    description: "Get premium vehicles at 30-50% below market price from official auctions",
    icon: Gavel,
    bgGradient: "from-gray-900 via-gray-800 to-gray-900",
    accentColor: "red",
  },
  {
    id: 2,
    title: "150+ Point Inspection",
    subtitle: "Quality Assured",
    description: "Every vehicle undergoes thorough inspection before listing",
    icon: Shield,
    bgGradient: "from-gray-800 via-gray-900 to-gray-800",
    accentColor: "white",
  },
  {
    id: 3,
    title: "Easy EMI Options",
    subtitle: "0% Processing Fee",
    description: "Get instant loan approval with our banking partners",
    icon: Percent,
    bgGradient: "from-gray-900 via-gray-800 to-gray-900",
    accentColor: "red",
  },
  {
    id: 4,
    title: "200+ Cars Available",
    subtitle: "New Stock Monthly",
    description: "Wide selection of sedans, SUVs, hatchbacks & luxury cars",
    icon: Car,
    bgGradient: "from-gray-800 via-gray-900 to-gray-800",
    accentColor: "white",
  },
  {
    id: 5,
    title: "Complete Documentation",
    subtitle: "Hassle-Free Transfer",
    description: "RC transfer, NOC, and all paperwork handled by us",
    icon: FileCheck,
    bgGradient: "from-gray-900 via-gray-800 to-gray-900",
    accentColor: "red",
  },
  {
    id: 6,
    title: "RTO Verified",
    subtitle: "100% Authentic",
    description: "All vehicles verified with Regional Transport Office",
    icon: BadgeCheck,
    bgGradient: "from-gray-800 via-gray-900 to-gray-800",
    accentColor: "white",
  },
];

// Group banners into pairs for 2 per slide
const bannerPairs = [];
for (let i = 0; i < promoBanners.length; i += 2) {
  bannerPairs.push(promoBanners.slice(i, i + 2));
}

const Ads = () => {
  const { ads, loading } = useSelector((slice) => slice.ad);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, []);

  const [search, setSearch] = useState("");

  return (
    <>
      {/* Promotional Banners - 2 per slide - Dark Theme */}
      <div className="relative w-full h-[280px] lg:h-[320px] rounded-3xl overflow-hidden mt-4 lg:mt-0">
        <Swiper
          cssMode={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={1}
          spaceBetween={0}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} !w-2 !h-2 !rounded-full !bg-white/40 [&.swiper-pagination-bullet-active]:!bg-white [&.swiper-pagination-bullet-active]:!w-6"></span>`;
            },
          }}
          modules={[Mousewheel, Keyboard, Navigation, Autoplay, Pagination]}
          className="h-full w-full"
        >
          {bannerPairs.map((pair, slideIndex) => (
            <SwiperSlide key={slideIndex}>
              <div className="flex h-full gap-4 p-2">
                {pair.map((banner) => (
                  <div
                    key={banner.id}
                    className={`flex-1 bg-gradient-to-br ${banner.bgGradient} rounded-2xl p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${banner.accentColor === 'red' ? 'bg-red-500' : 'bg-white/10'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <banner.icon className={`size-6 lg:size-7 ${banner.accentColor === 'red' ? 'text-white' : 'text-white'}`} />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                        {banner.title}
                      </h3>
                      <p className={`text-sm font-semibold mb-2 ${banner.accentColor === 'red' ? 'text-red-400' : 'text-gray-400'}`}>
                        {banner.subtitle}
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed hidden lg:block">
                        {banner.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="relative z-10 mt-4">
                      <Link
                        to="/ads"
                        className={`inline-flex items-center gap-2 ${banner.accentColor === 'red' ? 'text-red-400 hover:text-red-300' : 'text-white hover:text-gray-300'} font-semibold text-sm transition-colors`}
                      >
                        Learn More <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Decorative accent */}
                    <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${banner.accentColor === 'red' ? 'bg-red-500' : 'bg-white/40'}`}></div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Search Bar - Dark Theme */}
      <div className="mt-6 px-4 lg:px-0">
        <div className="relative bg-white flex items-center shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
          <Search className="absolute size-5 left-4 text-gray-400" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full select-none outline-none text-sm font-medium h-14 pl-12 pr-4 placeholder:text-gray-400"
            type="text"
            placeholder="Search by brand, model, or location..."
          />
          <button
            className="h-14 px-8 bg-gray-900 hover:bg-black text-white font-semibold transition-colors cursor-pointer flex items-center gap-2"
            onClick={() => dispatch(searchVehicle(search))}
          >
            Search
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Quick Stats Bar - Dark Theme */}
      <div className="px-4 lg:px-0 py-6">
        <div className="bg-gray-900 rounded-2xl p-4 flex flex-wrap items-center justify-around gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <BadgeCheck className="size-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">100%</p>
              <p className="text-gray-400 text-xs">RTO Verified</p>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-700 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="size-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">150+</p>
              <p className="text-gray-400 text-xs">Point Check</p>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-700 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Wallet className="size-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">0%</p>
              <p className="text-gray-400 text-xs">Hidden Fees</p>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-700 hidden sm:block"></div>
          <a href="tel:+918770800807" className="flex items-center gap-3 bg-white hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors">
            <Phone className="size-4 text-gray-900" />
            <span className="text-gray-900 font-semibold text-sm">Call Now</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Ads;
