import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const BodyType = () => {
  const [open, setOpen] = useState(false);

  const BodyTypeData = [
    {
      bodyName: "SUV",
      count: 15,
      img: "	https://media.cars24.com/india/buy/facets_v4/body_type/22072024/SUV.png",
      checked: false,
    },
    {
      bodyName: "Sedan",
      count: 15,
      img: "	https://media.cars24.com/india/buy/facets_v4/body_type/22072024/Sedan.png",
      checked: false,
    },
    {
      bodyName: "Hatchback",
      count: 15,
      img: "	https://media.cars24.com/india/buy/facets_v4/body_type/22072024/Hatchback.png",
      checked: false,
    },
  ];

  return (
    <div className="flex flex-col ">
      <div
        className="flex justify-between py-6 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <p className="text-lg font-semibold">Body Type</p>
        <ChevronDown
          className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open ? (
        <div className="flex flex-wrap gap-2 items-center  ">
          {BodyTypeData.map((item, idx) => (
            <div className="w-28 items-center py-4 bg-gray-200 rounded-lg ">
              <div className="flex gap-2 items-center flex-col">
                <img className="w-20 h-8" src={item.img} alt="" />
                <p className="text-sm font-semibold ">{item.bodyName}</p>
                <p className="text-sm text-gray-400">({item.count})</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-b border border-gray-200"></div>
      )}
    </div>
  );
};

export default BodyType;
