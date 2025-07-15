import { BadgeInfo, ChevronDown, ChevronUp, Key } from "lucide-react";
import React, { useState } from "react";

import regyear from "/public/image/reg-year.jpg";
import fuel from "/public/image/fuel.jpg";
import odometer from "/public/image/odometer.jpg";
import odometer1 from "/public/image/odometer (1).jpg";
import engine from "/public/image/engine-capacity.jpg";
import ownership from "/public/image/ownership.jpg";
import make from "/public/image/make-year.jpg";
import key from "/public/image/key.jpg";
import rto from "/public/image/rto.jpg";
import insurance1 from "/public/image/insurance.jpg";
import insurance from "/public/image/insurance_type.jpg";
import { useSelector } from "react-redux";
import { formatNumberWithCommas } from "../../../lib/utils";

const Car_overview = ({ data }) => {
  const [updown, setUpDown] = useState(true);
  const { userInfo } = useSelector((slice) => slice.auth);
  console.log(userInfo);
  return (
    <div
      className={`flex gap-3  lg:gap-4 px-2 lg:px-6  py-6  flex-col lg:w-[650px]  relative shadow-xl  rounded-2xl h-auto `}
    >
      {!userInfo && (
        <div
          className={`
         
         h-[400px] z-40 select-none pointer-events-none shadow-xl rounded-2xl w-full absolute top-0 left-0 backdrop-blur-sm`}
        ></div>
      )}
      <div className="flex px-4 lg:px-0 justify-between">
        <p className="text-xl font-semibold"> Car overview</p>
        <ChevronDown
          className={`bg-gray-200 rounded-full p-1 transition-transform duration-300 ${
            updown ? "rotate-180" : ""
          }`}
          onClick={() => setUpDown((prev) => !prev)}
        />
        {/* <ChevronUp /> */}
      </div>
      {updown ? (
        <div className="flex justify-between lg:w-[650px]   overflow-hidden">
          <div className="flex flex-col lg:w-[600px]">
            <div className="flex justify-between h-18 border-b   border-gray-300  lg:w-[600px] overflow-hidden ">
              <div className="flex items-center gap-4">
                <div>
                  <img
                    className={`size-6 lg:flex hidden`}
                    src={regyear}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">Reg. year</p>
                  <p className="lg:text-lg text-sm font-semibold">Feb 2015</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <img className={`size-6 lg:flex hidden`} src={fuel} alt="" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">Fule</p>
                  <p className="lg:text-lg text-sm font-semibold">
                    {data?.fuelType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <img
                    className={`size-6 lg:flex hidden`}
                    src={odometer}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">KM driven</p>
                  <p className="lg:text-lg text-sm font-semibold">
                    {formatNumberWithCommas(data?.totalKmDriven)} km
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between h-18  border-b  border-gray-300  lg:w-[600px] overflow-hidden ">
              <div className="flex items-center  gap-4">
                <div>
                  <img
                    className={`size-6 lg:flex hidden`}
                    src={odometer1}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">Transmission</p>
                  <p className="lg:text-lg text-sm font-semibold">
                    {data.transmission ? data.transmission : "Manual"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <img
                    className={`size-6 lg:flex hidden`}
                    src={engine}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">Engine capacity</p>
                  <p className="lg:text-lg text-sm font-semibold">1497cc</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <img
                    className={`size-6 lg:flex hidden`}
                    src={ownership}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">Ownership</p>
                  <p className="lg:text-lg text-sm font-semibold">2nd</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between h-18  border-b border-gray-300 lg:w-[600px] overflow-hidden ">
              <div className="flex items-center  gap-4">
                <div>
                  <img className={`size-6 lg:flex hidden`} src={make} alt="" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">Make year</p>
                  <p className="lg:text-lg text-sm font-semibold">
                    {data.year}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <img className={`size-6 lg:flex hidden`} src={key} alt="" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">Spare key</p>
                  <p className="lg:text-lg text-sm font-semibold">No</p>
                </div>
              </div>
              <div className="flex items-center  gap-4">
                <div>
                  <img className={`size-6 lg:flex hidden`} src={rto} alt="" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">Reg number</p>
                  <p className="lg:text-lg text-sm font-semibold">KA04**6437</p>
                </div>
              </div>
            </div>

            <div className="flex lg:gap-22 h-18  lg:w-[600px] overflow-hidden ">
              <div className="flex items-center  gap-4">
                <div>
                  <img
                    className={`size-6 lg:flex hidden`}
                    src={insurance1}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <p className="text-[#B0B0B0] text-xs">Insurance</p>
                    <BadgeInfo className="lg:size-4 size-3 bg-gray-500 text-white rounded-full " />
                  </div>
                  <div>
                    <p className="lg:text-lg text-sm font-semibold">
                      Need renewal
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center  gap-4">
                <div>
                  <img
                    className={`size-6 lg:flex hidden`}
                    src={insurance}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[#B0B0B0] text-xs">insurance</p>
                  <p className="lg:text-lg text-sm font-medium">Plans from</p>
                  <p className="lg:text-lg text-sm font-medium">₹3,796/y</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[#B0B0B0] lg:text-lg text-sm">
          View car details like registration number, ownership, model year,
          insurance, fuel type, and more.
        </div>
      )}
    </div>
  );
};

export default Car_overview;
