import { BadgeCheck, Heart, PhoneCall } from "lucide-react";
import React from "react";
import direct from "/public/image/direct.png";
import checklist from "/public/image/checklist.png";
import { formatNumberWithCommas } from "../../../lib/utils";
import { useSelector } from "react-redux";
const Book_free = ({ data }) => {
  const { userInfo } = useSelector((slice) => slice.auth);
  return (
    <div className="flex gap-4 bg-white rounded-2xl shadow flex-col    lg:w-[500px]  relative">
      <div className="flex flex-col gap-2 px-3 lg:px-6 py-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <p className="lg:text-2xl text-xl font-semibold">
              {formatNumberWithCommas(data?.name)}
            </p>
            {userInfo?.role == "agent" && (
              <div className="h-8 w-fit px-4 flex items-center justify-center text-white bg-red-500 rounded-full text-xs  lg:top-10 absolute xl:top-10 bottom-30 left-5 xl:left-60">
                {data.commision}% commison included
              </div>
            )}
            <p className="lg:text-3xl text-xl">
              {formatNumberWithCommas(data?.serialNo)}
            </p>
          </div>
          <Heart />
        </div>
        <p className="text-2xl font-semibold capitalize">{data.transmission}</p>
        <div className="flex items-center text-[#717272] gap-2 w-full ">
          <p className="py-1 rounded-sm px-1 lg:px-2 bg-[#F5F5F5] font-semibold text-xs lg:text-sm">
            {formatNumberWithCommas(data?.totalKmDriven)} km
          </p>
          <p className="py-1 rounded-sm px-1 lg:px-2 bg-[#F5F5F5]  font-semibold text-xs lg:text-sm">
            {data?.owners}
          </p>
          <p className="py-1 rounded-sm px-1 lg:px-2 bg-[#F5F5F5]  font-semibold text-xs lg:text-sm">
            {data?.transmission ? data.transmission : "mannual"}
          </p>
          <p className="py-1 rounded-sm px-1 lg:px-2 bg-[#F5F5F5]  font-semibold text-xs lg:text-sm">
            {data?.fuelType}
          </p>
          <p className="py-1 rounded-sm px-1 lg:px-2 bg-[#F5F5F5]  font-semibold text-xs lg:text-sm">
            {data?.serialNo}
          </p>
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex items-center gap-2">
            <img className="size-4 text-[#D46231]" src={direct} alt="" />
            <p className="text-[#717272] border-b border-dashed font-semibold text-lg">
              {data?.location}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#D46231]">
            <PhoneCall className="size-4 " />
            <p className="text-[#D46231] font-semibold">Call Hub</p>
          </div>
        </div>
        <div className="flex justify-between rounded-l-lg bg-linear-to-r  from-gray-100 to-white px-2  p-1 ">
          {data?.assured && (
            <div className="flex gap-2 items-center">
              <img className="size-4" src={checklist} alt="" />
              <p>KARLO Assured</p>
            </div>
          )}
          <p className="border-b border-dashed text-xs font-semibold">
            Know benefits
          </p>
        </div>
        <div
          className="flex flex-col rounded-xl 
        p-4 border-gray-200 pt-2 mt-3 border-t border  gap-2"
        >
          <div className="flex bg-[#F5F5F5]  justify-between px-3 items-center py-3 ">
            <div className="flex flex-col gap-2">
              <p className="lg:text-lg   text-sm font-semibold">
                ₹
                {formatNumberWithCommas(
                  data?.price + (data?.price * data.commision) / 100
                )}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                +7,796 other charges
              </p>
            </div>
            <p className="text-sm lg:text-lg font-semibold">Price breakup →</p>
          </div>
          <div className="flex  justify-between px-3 items-center">
            <div className="flex flex-col gap-4">
              <p>EMI starts at</p>
              <p className="text-xl font-semibold">
                ₹{formatNumberWithCommas(Math.round(data?.price / 36))}/mo
              </p>
            </div>
            <p className="text-sm lg:text-lg font-semibold">
              Check eligibility →
            </p>
          </div>
        </div>

        <div className="p-3 text-center bg-[#EF6E0B] rounded-xl mt-34  text-white font-semibold text-lg cursor-pointer hover:bg-[#EF6E0B]/80 duration-400">
          Book free test drive
        </div>
      </div>
    </div>
  );
};

export default Book_free;
