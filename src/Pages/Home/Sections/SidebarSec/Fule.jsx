import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Fule = () => {
  const fuleData = [
    {
      fuleNamne: "Petrol",
      img: "https://media.cars24.com/india/buy/facets_v4/fuel_type/Petrol.png",
      checked: false,
      count: "12",
    },
    {
      fuleNamne: "Diesel",
      img: "	https://media.cars24.com/india/buy/facets_v4/fuel_type/Diesel.png",
      checked: false,
      count: "12",
    },
    {
      fuleNamne: "Hybrid",
      img: "	https://media.cars24.com/india/buy/facets_v4/fuel_type/Hybrid.png",
      checked: false,
      count: "12",
    },
    {
      fuleNamne: "Electric",
      img: "https://media.cars24.com/india/buy/facets_v4/fuel_type/Electric.png",
      checked: false,
      count: "12",
    },
    {
      fuleNamne: "CNG",
      img: "https://media.cars24.com/india/buy/facets_v4/fuel_type/CNG.png",
      checked: false,
      count: "12",
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col ">
      <div
        className="flex justify-between py-6"
        onClick={() => setOpen((prev) => !prev)}
      >
        <p className="text-lg font-semibold">Fule</p>
        <ChevronDown
          className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open ? (
        <div className="flex flex-col gap-2   ">
          {fuleData.map((item, idx) => (
            <div className="flex items-center gap-2 bg-gray-50  justify-between py-2 px-2 rounded-lg">
              <div className="flex items-center gap-2 ">
                <input
                  className="size-4"
                  type="checkbox"
                  checked={item.checked}
                />
                <img className="w-8 h-6 object-cover" src={item.img} alt="" />
                <p className="text-sm">{item.fuleNamne}</p>
              </div>
              <p className="text-gray-400">({item.count})</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-b border border-gray-200"></div>
      )}
    </div>
  );
};

export default Fule;
