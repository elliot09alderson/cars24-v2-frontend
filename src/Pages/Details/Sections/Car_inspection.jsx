import { CarFront, CircleGauge } from "lucide-react";
import React from "react";
import car from "/public/image/car.png";
import badge from "/public/image/badge.png";
import speedometer from "/public/image/speedometer.png";
import report from "/public/image/07984c8a-8f99-400a-9d61-3b6a13c9feedBlurred report12.jpg";
import shield from "/public/image/insurance.png";

const Car_inspection = ({ vehicleDetails }) => {
  return (
    <div className="flex gap-4 lg:px-6 px-4 py-6 flex-col lg:w-[650px] lg:h-[400px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/30">
      <div>
        <p className="lg:text-xl text-lg font-semibold text-gray-900">
          Car inspection report
        </p>
      </div>
      <div className="flex justify-between items-center pt-2  gap-4">
        <div className="flex flex-col gap-3 items-center">
          <img className="size-8  object-cover" src={car} alt="" />
          <p className="text-xs font-semibold">No accident history</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex flex-col gap-2 items-center">
            <img
              className="lg:size-9 size-8 object-cover"
              src={speedometer}
              alt=""
            />
            <p className="text-xs font-semibold">No odometer tampering</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <CarFront className="size-8" />
          <p className="text-xs font-semibold">No water damages</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <img className="size-9" src={badge} alt="" />
          <p className="text-xs font-semibold">140-quality checks</p>
        </div>
      </div>
      <div>
        <img src={report} alt="" />
      </div>
      <div className="flex lg:flex-row lg:gap-0 gap-4  flex-col justify-between">
        <div className="flex items-center gap-2 lg:gap-1">
          <img className="lg:size-6  size-4" src={shield} alt="" />
          <p className="text-sm font-bold">KARLO </p>
          <p className="text-[#717276] text-sm lg:text-sm">
            inspected with 140-quality checks.
          </p>
        </div>
        <div className="bg-[#EF6E0B] p-2.5 px-8 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 cursor-pointer hover:bg-[#d86109]">
          <p className="text-white font-semibold text-center text-sm lg:text-lg">
            View inspection report
          </p>
        </div>
      </div>
    </div>
  );
};

export default Car_inspection;
