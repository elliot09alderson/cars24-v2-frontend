import React, { useEffect } from "react";

import Front from "/public/image/1-Front.jpg";
import first from "/public/image/2-Right-Front-Diagonal.jpg";
import third from "/public/image/3-Right-Side-View.jpg";
import forth from "/public/image/4-Right-Back-Diagonal.jpg";
import five from "/public/image/5-Rear-View.jpg";
import six from "/public/image/8-Left-Back-Diagonal.jpg";
import seven from "/public/image/7-Left-Side-View.jpg";
import eight from "/public/image/6-Left-Front-Diagonal.jpg";
import nine from "/public/image/Roof-23.jpg";
import ten from "/public/image/Engine-Full-View-With-Bonnet-Open-13.jpg";
import one_one from "/public/image/Engine-Right-Aligned--11.jpg";
import one_two from "/public/image/Engine-Left-Aligned-12.jpg";
import one_three from "/public/image/Front-Windshield-9.jpg";
import one_fore from "/public/image/Engine-10.jpg";
import one_five from "/public/image/Dashboard-26.jpg";
import one_six from "/public/image/Cluster-Meter.jpg";
import one_seven from "/public/image/Steering-wheel-close-up-29.jpg";
import one_eight from "/public/image/Gear-Lever-30.jpg";
import one_nine from "/public/image/Pedals-31.jpg";
import one_zero from "/public/image/Front-Cabin-View.jpg";
import two_one from "/public/image/Rear-Cabin-View.jpg";
import two_two from "/public/image/Driver-side-door-panel-control-39.jpg";
import two_three from "/public/image/Driver-side-adjustment-panel-40.jpg";
import two_fore from "/public/image/Boot-Zoomed-View-42.jpg";
import two_five from "/public/image/Boot-Open-Top-Half-View-43.jpg";
import two_six from "/public/image/Keys-44.jpg";
import two_seven from "/public/image/RHS-Rear-Door-Open-33.jpg";
import two_eight from "/public/image/LHS-Rear-Door-Open.jpg";
import two_nine from "/public/image/LHS-Front-Door-Open.jpg";
import two_zero from "/public/image/Boot-Open-View-41.jpg";
import three_one from "/public/image/RHS-Front-Door-Open-32.jpg";
import three_two from "/public/image/Cruise-Control-48.jpg";
import three_three from "/public/image/Engine-Right-Aligned--11.jpg";
import three_fore from "/public/image/Center-console---infotainment-28.jpg";
import three_five from "/public/image/LHS-Rear-Door-36.jpg";
import three_six from "/public/image/LHS-Rear-Door-36 (1).jpg";
import three_seven from "/public/image/RHS-Front-Door-34.jpg";
import three_eight from "/public/image/RHS-Front-Door-34 (1).jpg";
import three_nine from "/public/image/RHS-Front-Door-34 (2).jpg";
import three_zero from "/public/image/RHS-Rear-Door-35.jpg";
import fore_one from "/public/image/Exterior-4.jpg";
import fore_two from "/public/image/LHS-Fender.jpg";
import fore_three from "/public/image/RHS-Fender.jpg";
import fore_fore from "/public/image/LHS-Quarter-Panel.jpg";
import fore_five from "/public/image/LHS-Quarter-Panel (1).jpg";
import fore_six from "/public/image/LHS-Quarter-Panel (2).jpg";
import fore_seven from "/public/image/RHS-Quarter-Panel.jpg";
import fore_eight from "/public/image/RHS-Running-Board.jpg";
import fore_nine from "/public/image/RHS-Running-Board (1).jpg";
import fore_zero from "/public/image/RHS-ORVM.jpg";
import five_one from "/public/image/RHS-ORVM (1).jpg";
import five_two from "/public/image/RHS-Front-Wheel-14.jpg";
import five_three from "/public/image/RHS-Rear-Wheel-15.jpg";
import five_fore from "/public/image/LHS-Front-Wheel-16.jpg";
import five_five from "/public/image/LHS-Rear-Wheel-17.jpg";
import five_six from "/public/image/Spare-Tyre-22.jpg";
import five_seven from "/public/image/RHS-Front-Tyre-Tread-18 copy.jpg";
import five_eight from "/public/image/RHS-Rear-Tyre-Tread-19.jpg";
import five_nine from "/public/image/LHS-Front-Tyre-Tread-20.jpg";
import five_zero from "/public/image/LHS-Rear-Tyre-Tread-21.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Mousewheel, Keyboard, FreeMode, Navigation } from "swiper/modules";
import { BadgeCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
const Carousel = ({ data }) => {
  const imageData = [
    { img: first },
    { img: Front },
    { img: third },
    { img: forth },
    { img: five },
    { img: six },
    { img: seven },
    { img: eight },
    { img: nine },
    { img: ten },
    { img: one_one },
    { img: one_two },
    { img: one_three },
    { img: one_fore },
    { img: one_five },
    { img: one_six },
    { img: one_seven },
    { img: one_eight },
    { img: one_nine },
    { img: one_zero },
    { img: two_one },
    { img: two_two },
    { img: two_three },
    { img: two_fore },
    { img: two_five },
    { img: two_six },
    { img: two_seven },
    { img: two_eight },
    { img: two_nine },
    { img: two_zero },
    { img: three_one },
    { img: three_two },
    { img: three_three },
    { img: three_fore },
    { img: three_five },
    { img: three_six },
    { img: three_seven },
    { img: three_eight },
    { img: three_nine },
    { img: three_zero },
    { img: fore_one },
    { img: fore_two },
    { img: fore_three },
    { img: fore_fore },
    { img: fore_five },
    { img: fore_six },
    { img: fore_seven },
    { img: fore_eight },
    { img: fore_nine },
    { img: fore_zero },
    { img: five_one },
    { img: five_two },
    { img: five_three },
    { img: five_fore },
    { img: five_five },
    { img: five_six },
    { img: five_seven },
    { img: five_eight },
    { img: five_nine },
    { img: five_zero },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch();
  }, []);
  const { ads } = useSelector((slice) => slice.ad);

  console.log(ads);
  return (
    <div className="">
      <div className="flex select-none  relative flex-col overflow-hidden lg:w-[650px]  rounded-2xl lg:h-[450px]">
        <Swiper
          cssMode={true}
          mousewheel={true}
          keyboard={true}
          freeMode={true}
          autoplay={true}
          navigation={true}
          modules={[Mousewheel, Keyboard, FreeMode, Navigation]}
          className="mySwiper"
        >
          {data &&
            data.map((item, idx) => (
              <SwiperSlide key={idx + "Carousel"}>
                <img className="object-ccover  rounded-t" src={item} alt="" />
              </SwiperSlide>
            ))}
        </Swiper>
        {/* <div className="border bg-linear-to-t from-black to-[#171716] h-20 p-6"></div> */}
        <div className="flex z-10 absolute top-3 left-3 border rounded-2xl w-fit items-center gap-1 bg-black py-0.5 px-2 ">
          <BadgeCheck className="bg-blue-600   size-5 rounded-full" />
          <p className="text-white text-xs font-semibold">CARS24 ASSURED</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
