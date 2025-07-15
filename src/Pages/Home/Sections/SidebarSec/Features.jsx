import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Features = () => {
  const [dropDown, setDropDown] = useState(false);

  const PremiumFeatures = [
    {
      name: "Infotainment System",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/monitor.svg",
      count: 14,
    },
    {
      name: "Rear AC",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/rear_ac.svg",
      count: 14,
    },
    {
      name: "Sunroof",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/solar.svg",
      count: 14,
    },
    {
      name: "Leather Upholstery",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/leatherSeats.svg",
      count: 14,
    },
    {
      name: "Alloy Wheels",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/new_tyres.svg",
      count: 14,
    },
    {
      name: "Bluetooth",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/bluetooth.svg",
      count: 14,
    },
  ];

  const SmartData = [
    {
      name: "Carplay",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/android.svg",
      count: 0,
    },
    {
      name: "Parking Assist",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/car_profile.svg",
      count: 0,
    },
    {
      name: "Cruise Control",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/speedometer.svg",
      count: 0,
    },
    {
      name: "Push Button Start",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/key.svg",
      count: 0,
    },
  ];

  const VipData = [
    {
      name: "Special Number",
      checked: false,
      icon: "		https://media.cars24.com/india/buy/facets_v4/icons/v2/name_tag.svg",
      count: 14,
    },
    {
      name: "Top Model",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/medal.svg",
      count: 14,
    },
  ];

  const OthersData = [
    {
      name: "360 Camera",
      checked: false,
      icon: "		https://media.cars24.com/india/buy/facets_v4/icons/v2/camera.svg",
      count: 14,
    },
    {
      name: "Ventilated Seats",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/ventilation.svg",
      count: 14,
    },
    {
      name: "GPS Navigation",
      checked: false,
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/gps.svg",
      count: 14,
    },
    {
      name: "TPMS",
      checked: false,
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/gps.svg",
      count: 14,
    },
  ];
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer py-6"
        onClick={() => setDropDown((prev) => !prev)}
      >
        <p className="text-lg font-semibold">Features</p>
        <ChevronDown
          className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
            dropDown ? "rotate-180" : ""
          }`}
        />
      </div>
      {dropDown ? (
        <div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#0F0F10] font-semibold">
              Premium Features
            </p>
            <div className="flex flex-col gap-4 pb-4 ">
              {PremiumFeatures.map((item, idx) => (
                <div className="flex justify-between bg-gray-50 rounded-lg p-2 items-center">
                  <div className="flex  gap-3 items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      className="size-5 "
                    />
                    <img className="size-6" src={item.icon} alt="" />
                    <p className="text-[#4E5765] font-semibold text-sm">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">({item.count})</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#0F0F10] font-semibold">
              Smart Features
            </p>
            <div className="flex flex-col gap-4 ">
              {SmartData.map((item, idx) => (
                <div
                  key={idx + "uu"}
                  className="flex justify-between bg-gray-50 rounded-lg p-2 items-center"
                >
                  <div className="flex  gap-3 items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      className="size-5 "
                    />
                    <img className="size-6" src={item.icon} alt="" />
                    <p className="text-[#4E5765] font-semibold text-sm">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">({item.count})</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#0F0F10] font-semibold">VIP Features</p>
            <div className="flex flex-col gap-4 ">
              {VipData.map((item, idx) => (
                <div className="flex justify-between bg-gray-50 rounded-lg p-2 items-center">
                  <div className="flex  gap-3 items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      className="size-5 "
                    />
                    <img className="size-6" src={item.icon} alt="" />
                    <p className="text-[#4E5765] font-semibold text-sm">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">({item.count})</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#0F0F10] font-semibold">Others</p>
            <div className="flex flex-col gap-4 ">
              {OthersData.map((item, idx) => (
                <div className="flex justify-between bg-gray-50 rounded-lg p-2 items-center">
                  <div className="flex  gap-3 items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      className="size-5 "
                    />
                    <img className="size-6" src={item.icon} alt="" />
                    <p className="text-[#4E5765] font-semibold text-sm">
                      {item.name}
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

export default Features;
