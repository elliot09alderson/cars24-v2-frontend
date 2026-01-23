import React, { useState, useEffect } from "react";
import Sidebar from "./Home/Sections/Sidebar/Sidebar";
import CarContainer from "./Home/Sections/CarContainer/CarContainer";
import Navbar from "../component_01/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel, Keyboard, Navigation, Autoplay, Pagination } from "swiper/modules";
import karlo from "/logo/karlo.png";
import { Link, useNavigate } from "react-router-dom";
import Requirement from "./Home/Sections/Requirement";
import { useDispatch, useSelector } from "react-redux";
import { customer_logout } from "../../rtk/slices/authSlice.js";
import { fetchVehicles } from "../../rtk/slices/vehicleSlice.js";
import Swal from "sweetalert2";
import { Car, Shield, BadgeCheck, Wallet, FileCheck, MapPin, Phone, ArrowRight, Star, Users, Building2, Gavel, CheckCircle, Calendar, Mail } from "lucide-react";

// Featured Cars Data - Premium Dark Theme
const featuredCars = [
  {
    id: 1,
    brand: "Mahindra",
    model: "XUV700",
    year: 2023,
    tag: "Premium",
    description: "The Mahindra XUV700 is a premium SUV with advanced features and powerful performance.",
    hp: "200",
    engine: "2.0L Turbo",
    transmission: "AT",
    price: "₹18,99,000",
    priceLabel: "Starting from",
    location: "Mumbai, MH",
    dealer: "KARLO Mumbai",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1920&q=80",
    features: ["Sunroof", "ADAS", "Premium Audio", "Ventilated Seats"],
  },
  {
    id: 2,
    brand: "Tata",
    model: "Safari",
    year: 2023,
    tag: "Popular",
    description: "The Tata Safari combines style with substance, offering a commanding road presence.",
    hp: "170",
    engine: "2.0L Diesel",
    transmission: "MT/AT",
    price: "₹16,49,000",
    priceLabel: "Starting from",
    location: "Delhi, DL",
    dealer: "KARLO Delhi",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80",
    features: ["7 Seater", "Terrain Modes", "Connected Car", "Air Purifier"],
  },
  {
    id: 3,
    brand: "Hyundai",
    model: "Creta",
    year: 2024,
    tag: "Bestseller",
    description: "The Hyundai Creta continues to dominate with its perfect blend of features and value.",
    hp: "158",
    engine: "1.5L Turbo",
    transmission: "DCT",
    price: "₹14,99,000",
    priceLabel: "Starting from",
    location: "Bangalore, KA",
    dealer: "KARLO Bangalore",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1920&q=80",
    features: ["Panoramic Roof", "ADAS Level 2", "Bose Audio", "Wireless Charging"],
  },
  {
    id: 4,
    brand: "Maruti",
    model: "Grand Vitara",
    year: 2023,
    tag: "Hybrid",
    description: "The Grand Vitara offers exceptional fuel efficiency with strong hybrid technology.",
    hp: "116",
    engine: "1.5L Hybrid",
    transmission: "eCVT",
    price: "₹12,99,000",
    priceLabel: "Starting from",
    location: "Chennai, TN",
    dealer: "KARLO Chennai",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=80",
    features: ["Hybrid Tech", "AllGrip AWD", "Head-Up Display", "360 Camera"],
  },
];

const Home = () => {
  const { userInfo } = useSelector((slice) => slice.auth);
  const { vehicles } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, []);

  function logout() {
    Swal.fire({
      title: "Are you sure ?",
      text: "you will be redirected to login page",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "logout",
          text: "logout successfully.",
          icon: "success",
        });

        dispatch(customer_logout());
      }
    });
  }

  const handleSellCarClick = (e) => {
    e.preventDefault();
    if (userInfo) {
      Swal.fire({
        title: "Logout required",
        text: "You must be logged out to access seller login. Logout now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(customer_logout()).then(() => {
             navigate("/agent/login");
          });
        }
      });
    } else {
      navigate("/agent/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:py-12 w-full max-w-7xl mx-auto px-6 lg:px-12">
      <div className="rounded-4xl shadow-sm flex flex-col bg-white">
        {/* Header */}
        <div className="flex lg:flex-row flex-col h-fit lg:mt-8 mt-4 items-center justify-between py-4 gap-4 px-4">
          <div className="flex gap-2 flex-shrink-0">
            <Link to={"/"} className="lg:text-3xl text-lg font-bold">
              <img src={karlo} alt="karlo" className="w-64" />
            </Link>
          </div>

          {/* Latest Added Car - Center */}
          <div className="hidden lg:flex flex-1 justify-center items-center px-4 overflow-hidden">
            {vehicles && vehicles.length > 0 && (
              <Link to={`/vehicle/detail/${vehicles[0].slug}`} className="bg-white/50 backdrop-blur-md hover:bg-white/80 transition-all border border-gray-200 rounded-full py-2 px-6 flex items-center gap-4 shadow-sm group cursor-pointer max-w-xl w-full justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                    Latest Drop
                  </span>
                  <div className="h-8 w-12 rounded-lg overflow-hidden flex-shrink-0">
                     <img src={vehicles[0].thumbnail} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-gray-900 font-bold text-sm truncate uppercase font-heading tracking-wide">
                      {vehicles[0].brand} {vehicles[0].model}
                    </span>
                    <span className="text-gray-500 text-xs truncate">
                      {vehicles[0].year} • {vehicles[0].transmission}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                   <div className="h-8 w-px bg-gray-300"></div>
                   <span className="text-gray-900 font-bold ml-2">₹ {parseInt(vehicles[0].price).toLocaleString('en-IN')}</span>
                   <ArrowRight className="size-4 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )}
          </div>

          <div className="flex lg:gap-6 gap-2 text-sm items-center mt-4 lg:mt-0 flex-shrink-0">
            <Link
              to="/agent/login"
              onClick={handleSellCarClick}
              className="p-4 lg:px-6 px-4 text-white rounded-xl text-sm lg:text-base font-semibold bg-gray-900 hover:bg-black transition-colors cursor-pointer"
            >
              Sell Car
            </Link>
            <Link
              to="/ads"
              className="p-4 lg:px-6 text-white rounded-xl text-sm lg:text-base font-semibold bg-gray-900 hover:bg-black transition-colors cursor-pointer"
            >
              Buy Cars
            </Link>
            {userInfo ? (
              <div
                className="p-4 px-5 lg:px-6 text-gray-800 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold lg:text-base text-sm cursor-pointer transition-colors"
                onClick={logout}
              >
                Logout
              </div>
            ) : (
              <Link
                to={"/login"}
                className="p-4 lg:px-6 text-gray-800 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold text-sm w-fit lg:text-base cursor-pointer transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl mt-8">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 px-6 lg:px-16 py-16 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-white/80 text-sm font-medium">Government Authorized Dealer</span>
              </div>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                Premium Cars at
                <span className="text-white"> Auction Prices</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
                Get verified government auctioned vehicles at 30-50% below market price.
                100% legal, fully documented, and ready to drive home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/ads"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Explore Cars <ArrowRight className="size-5" />
                </Link>
                <a
                  href="tel:+919993653299"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 border border-white/20"
                >
                  <Phone className="size-5" /> Call Now
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="ml-2">
                    <p className="text-white font-semibold">5000+</p>
                    <p className="text-gray-400 text-sm">Happy Customers</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-white/20 hidden lg:block"></div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="size-5 text-white fill-white" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm ml-2">4.8/5 Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Car Showcase - Dark Theme */}
        <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mt-12">
          <Swiper
            cssMode={true}
            mousewheel={true}
            keyboard={true}
            slidesPerView={1}
            spaceBetween={0}
            navigation={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} !w-8 !h-1 !rounded-full !bg-white/40 [&.swiper-pagination-bullet-active]:!bg-white [&.swiper-pagination-bullet-active]:!w-12"></span>`;
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[Mousewheel, Keyboard, Navigation, Autoplay, Pagination]}
            className="h-full w-full"
          >
            {featuredCars.map((car, index) => (
              <SwiperSlide key={car.id}>
                <div className="relative w-full h-full">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${car.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center max-w-xl">
                      {/* Tag */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-white/80 text-sm font-medium">{car.tag}</span>
                      </div>

                      {/* Brand & Model */}
                      <h1 className="text-5xl lg:text-7xl font-bold text-white mb-2">{car.brand}</h1>
                      <h2 className="text-2xl lg:text-3xl text-white/90 mb-4">{car.model} {car.year}</h2>

                      {/* Description */}
                      <p className="text-white/70 text-sm lg:text-base mb-6 max-w-md">
                        {car.description}
                      </p>

                      {/* Specs */}
                      <div className="flex items-center gap-6 mb-8">
                        <div>
                          <p className="text-2xl font-bold text-white">{car.hp}</p>
                          <p className="text-white/50 text-xs">HP</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">{car.engine}</p>
                          <p className="text-white/50 text-xs">Engine</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">{car.transmission}</p>
                          <p className="text-white/50 text-xs">Trans</p>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex items-center gap-4">
                        <Link
                          to="/ads"
                          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                        >
                          View Details <ArrowRight className="size-4" />
                        </Link>
                        <a href="tel:+918770800807" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-colors">
                          <Phone className="size-4" /> Contact
                        </a>
                      </div>
                    </div>

                    {/* Right Card - Price & Info */}
                    <div className="hidden lg:block bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-80 shadow-2xl">
                      <p className="text-gray-500 text-sm">{car.priceLabel}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{car.price}</p>
                      <p className="text-gray-400 text-xs mb-4">MSRP excluding options</p>

                      <p className="text-gray-900 font-semibold text-sm mb-3">Key Features</p>
                      <div className="space-y-2 mb-4">
                        {car.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <MapPin className="size-4" />
                        <span>{car.location}</span>
                      </div>
                      <p className="text-gray-900 font-semibold text-sm mb-4">{car.dealer}</p>

                      <div className="flex items-center gap-2">
                        <a href="tel:+919993653299" className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                          <Phone className="size-4" /> Call
                        </a>
                        <a href="mailto:karlo.live2694@gmail.com" className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                          <Mail className="size-4" /> Email
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 lg:hidden">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-xs">{car.priceLabel}</p>
                        <p className="text-white text-xl font-bold">{car.price}</p>
                      </div>
                      <Link
                        to="/ads"
                        className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Requirement />

        {/* Promotional Banners Carousel */}
        <div className="py-12 bg-gray-50">
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
              renderBullet: (index, className) => {
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

        {/* Why Choose KARLO Section */}
        <div className="flex flex-col gap-8 py-16 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose KARLO?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Your trusted partner for government auctioned vehicles with complete transparency and legal documentation</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Government Verified */}
            <div className="lg:w-[60%] w-full flex lg:flex-row flex-col items-center justify-between bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl min-h-[400px] p-8 lg:p-12 border border-gray-200 group hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col gap-4 items-start justify-center flex-1">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Shield className="size-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  100% Government Verified
                </h3>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  All vehicles are sourced directly from official government auctions conducted by banks, customs, income tax, and police departments. Every car comes with proper auction release certificates.
                </p>
                <Link to="/ads" className="inline-flex items-center gap-2 text-gray-900 font-semibold mt-2 hover:gap-4 transition-all">
                  Browse Verified Cars <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="lg:w-48 w-32 h-48 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mt-6 lg:mt-0">
                <BadgeCheck className="size-24 text-white" />
              </div>
            </div>

            {/* Best Prices */}
            <div className="lg:w-[40%] w-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col gap-4 items-start rounded-3xl min-h-[400px] p-8 lg:p-12 group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Wallet className="size-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                30-50% Below Market Price
              </h3>
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                Government auctions are designed for quick disposal, not profit. This means you get quality vehicles at significantly lower prices than showroom or used car market rates.
              </p>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">₹2L+</p>
                  <p className="text-gray-400 text-sm">Avg. Savings</p>
                </div>
                <div className="h-12 w-px bg-gray-700"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">0%</p>
                  <p className="text-gray-400 text-sm">Hidden Fees</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col gap-6 items-stretch">
            {/* Complete Documentation */}
            <div className="lg:w-[40%] w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col gap-4 items-start rounded-3xl min-h-[400px] p-8 lg:p-12 border border-gray-300 group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FileCheck className="size-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Complete Documentation
              </h3>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Receive all essential documents including RC transfer, auction release certificate, NOC from concerned authority, and complete ownership transfer paperwork.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["RC Transfer", "Auction Certificate", "NOC", "Insurance"].map((doc) => (
                  <span key={doc} className="px-3 py-1.5 bg-gray-900/10 text-gray-700 rounded-full text-sm font-medium">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* 150+ Point Inspection */}
            <div className="lg:w-[60%] w-full flex lg:flex-row flex-col items-center justify-between bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl min-h-[400px] p-8 lg:p-12 border border-gray-200 group hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col gap-4 items-start justify-center flex-1">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Car className="size-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  150+ Point Inspection
                </h3>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Every vehicle undergoes a comprehensive quality check covering engine, transmission, electrical systems, body condition, and more. We provide detailed condition reports with complete transparency.
                </p>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-700 font-medium">Engine Check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-700 font-medium">Body Inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-700 font-medium">Test Drive</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-48 w-32 h-48 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mt-6 lg:mt-0 relative">
                <span className="text-6xl font-bold text-white">150+</span>
                <span className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">PASSED</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-16 px-4 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-500">Simple 4-step process to own your dream car</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Browse Cars", desc: "Explore our wide selection of government auctioned vehicles", icon: Car },
              { step: "02", title: "Inspect Vehicle", desc: "Visit our yard for physical inspection and test drive", icon: Shield },
              { step: "03", title: "Complete Payment", desc: "Pay securely via bank transfer, UPI, or get loan assistance", icon: Wallet },
              { step: "04", title: "Drive Home", desc: "We handle all paperwork, you receive complete documentation", icon: FileCheck },
            ].map((item, idx) => (
              <div key={idx} className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-4 mt-4 group-hover:bg-gray-200 transition-colors">
                  <item.icon className="size-7 text-gray-600 group-hover:text-gray-900 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="my-20">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                  Trusted by <span className="text-white">Thousands</span> of Buyers
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Join the growing community of smart buyers who save big on their dream cars
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="size-7 text-white" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">50+</h3>
                  <p className="text-gray-400">Cities Covered</p>
                </div>

                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Car className="size-7 text-white" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">200+</h3>
                  <p className="text-gray-400">New Cars Monthly</p>
                </div>

                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="size-7 text-white" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">350+</h3>
                  <p className="text-gray-400">Verified Agents</p>
                </div>

                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="size-7 text-white" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">5</h3>
                  <p className="text-gray-400">Licensed States</p>
                </div>

                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all col-span-2 lg:col-span-1">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <BadgeCheck className="size-7 text-white" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2">100%</h3>
                  <p className="text-gray-400">RTO Verified</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/ads"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Start Exploring Cars <ArrowRight className="size-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
