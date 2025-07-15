import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Color = () => {
  const [dropDown, setDropDown] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const colorData = [
    {
      name: "Red",
      img: "https://media.cars24.com/india/buy/facets_v4/colour/red.png",
      count: "0",
    },
    {
      name: "Orange",
      img: "	https://media.cars24.com/india/buy/facets_v4/colour/orange.png",
      count: "0",
    },
    {
      name: "Green",
      img: "	https://media.cars24.com/india/buy/facets_v4/colour/green.png",
      count: "0",
    },
    {
      name: "White",
      img: "https://media.cars24.com/india/buy/facets_v4/colour/white.png",
      count: "0",
    },
    {
      name: "Blue",
      img: "	https://media.cars24.com/india/buy/facets_v4/colour/blue.png",
      count: "0",
    },
    {
      name: "Black",
      img: "https://media.cars24.com/india/buy/facets_v4/colour/black.png",
      count: "0",
    },
    {
      name: "Yellow",
      img: "	https://media.cars24.com/india/buy/facets_v4/colour/yellow.png",
      count: "0",
    },
    {
      name: "Purple",
      img: "https://media.cars24.com/india/buy/facets_v4/colour/purple.png",
      count: "0",
    },
    {
      name: "Silver",
      img: "https://media.cars24.com/india/buy/facets_v4/colour/grey.png",
      count: "0",
    },
    {
      name: "Brown",
      img: "https://media.cars24.com/india/buy/facets_v4/colour/brown.png",
      count: "0",
    },
  ];
  return (
    <div>
      <div
        className="flex justify-between items-center py-6 cursor-pointer"
        onClick={() => setDropDown((prev) => !prev)}
      >
        <p className="text-lg font-semibold">Color</p>
        <ChevronDown
          className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
            dropDown ? "rotate-180" : ""
          }`}
        />
      </div>
      {dropDown ? (
        <div className="flex flex-wrap items-center gap-5">
          {colorData.map((item, idx) => (
            <div
              onClick={() => {
                setSelectedColor(idx + 1);
              }}
              className={`flex flex-col duration-500  items-center ${
                idx + 1 === selectedColor && "bg-gray-300 scale-115 "
              } py-4 px-3  rounded-lg bg-gray-200`}
            >
              <img className="w-22 object-cover" src={item.img} alt="" />
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-gray-400 text-sm">({item.count})</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-b border-gray-200"></div>
      )}
    </div>
  );
};

export default Color;
