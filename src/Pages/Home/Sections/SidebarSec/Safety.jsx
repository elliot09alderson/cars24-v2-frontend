import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Safety = () => {
  const [dropDown, setDropDown] = useState(false);

  const PremiumFeatures = [
    {
      name: "ABS",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/safety/brake_assist.png",
      count: 14,
    },
    {
      name: "EBD",
      checked: false,
      icon: "		https://media.cars24.com/india/buy/facets_v4/safety/EBD.png",
      count: 14,
    },
    {
      name: "Traction Control",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/safety/traction_control.png",
      count: 14,
    },
    {
      name: "Hill Hold Control",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/safety/hill_control.png",
      count: 14,
    },
    {
      name: "ISOFIX Child",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/safety/ISOFIX.png",
      count: 14,
    },
  ];

  const AirbagData = [
    {
      airname: "Airbag",
      available: "0",
    },
    {
      airname: "Airbag",
      available: "0",
    },
    {
      airname: "Airbag",
      available: "0",
    },
    {
      airname: "Airbag",
      available: "0",
    },
    {
      airname: "Airbag",
      available: "0",
    },
    {
      airname: "Airbag",
      available: "0",
    },
    {
      airname: "Airbag",
      available: "0",
    },
  ];

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer py-6"
        onClick={() => setDropDown((prev) => !prev)}
      >
        <p className="text-lg font-semibold">Safety</p>
        <ChevronDown
          className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
            dropDown ? "rotate-180" : ""
          }`}
        />
      </div>
      {dropDown ? (
        <div className="flex-col">
          <div className="">
            <p className="text-sm font-semibold text-[#0F0F10]">Airbags</p>
            <div className="flex gap-2 flex-wrap py-6  ">
              {AirbagData.map((air, id) => (
                <div className="flex items-center gap-6 px-3 border-gray-300 border rounded-lg  py-2">
                  <div className="flex items-center gap-1">
                    <p className="text-xs">{id + 1}</p>
                    <p className="text-xs font-semibold text-[#1C1C1D]">
                      {air.airname}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-gray-400 text-xs">({air.available})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-[#0F0F10]">
              Safety Features
            </p>
            <div className="flex flex-col gap-4 ">
              {PremiumFeatures.map((item, idx) => (
                <div
                  key={idx + "ii"}
                  className="flex justify-between bg-gray-50 rounded-lg p-2 items-center"
                >
                  <div className="flex  gap-3 items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      className="size-5 "
                    />
                    <img className="w-12" src={item.icon} alt="" />
                    <p className="text-[#4E5765] font-semibold text-sm">
                      {item.name}.................
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">({item.count})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-b border-gray-200"></div>
      )}
    </div>
  );
};

export default Safety;                                                                          
{
  /* <div className="flex flex-col">
  <p className="text-sm font-semibold text-[#0F0F10]">Airbags</p>
  <div className="flex gap-2 border ">
    {AirbagData.map((air, id) => (
      <div className="flex justify-between ">
        <div className="flex gap-1">
          <p>{idx + 1}</p>
          <p className="text-[#1C1C1D]">{air.name}</p>
        </div>
        <p className="text-gray-300">({air.count})</p>
      </div>
    ))}
  </div>
</div>; */
}
