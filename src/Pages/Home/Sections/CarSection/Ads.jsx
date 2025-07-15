import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Mousewheel, Keyboard, FreeMode, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds } from "../../../../../rtk/slices/adSlice.js";
import { Link } from "react-router-dom";
import { searchVehicle } from "../../../../../rtk/slices/vehicleSlice.js";

const Ads = () => {
  const { ads, loading, successMessage, errorMessage } = useSelector(
    (slice) => slice.ad
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAds());
  }, []);

  const [search, setSearch] = useState("");
  return (
    <>
      <div className="lg:px-0 lg:mt-0 mt-8 px-4">
        <div className="relative bg-[#FFFFFF]  flex items-center justify-center  shadow rounded-xl border-b border-gray-300 ">
          <Search className="absolute size-4 lg:size-5  left-6 top-4 lg:left-4 text-[#294760]" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full border-t border-gray-300 select-none outline-none text-sm lg:text-sm font-semibold  h-12 rounded-l-xl  px-12"
            type="text"
            placeholder="Search for your favourite cars Previous"
          />
          <button
            className=" h-12 w-40 bg-zinc-300 rounded-r-lg  hover:bg-zinc-400 duration-300  hover:text-white cursor-pointer "
            onClick={() => dispatch(searchVehicle(search))}
          >
            Search
          </button>
        </div>
      </div>
      <div className="lg:flex  px-4 lg:px-0 py-10 h-[300px] lg:py-12 select-none">
        <Swiper
          cssMode={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={2}
          spaceBetween={20}
          freeMode={true}
          navigation={true}
          modules={[Mousewheel, Keyboard, FreeMode, Navigation]}
          className="mySwiper "
        >
          {ads.map((item, idx) => (
            <div className=" " key={idx + "ima"}>
              <SwiperSlide key={idx + "SADASDAS"}>
                <Link to={item.url}>
                  <img
                    className="object-cover w-full h-20"
                    src={item.image}
                    alt=""
                  />
                </Link>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Ads;
