import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Seats = ({ setSeat, seat }) => {
  const [open, setOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const SeatTypeData = [
    {
      Name: "4 Seater",
      count: 4,
      img: "	https://media.cars24.com/india/buy/facets_v4/seats/4_Seater.png",
      checked: false,
    },
    {
      Name: "5 Seater",
      count: 5,
      img: "		https://media.cars24.com/india/buy/facets_v4/seats/5_Seater.png",
      checked: false,
    },
    {
      Name: "6 Seater",
      count: 6,
      img: "		https://media.cars24.com/india/buy/facets_v4/seats/6_Seater.png",
      checked: false,
    },
    {
      Name: "7 Seater",
      count: 7,
      img: "			https://media.cars24.com/india/buy/facets_v4/seats/7_Seater.png",
      checked: false,
    },
    {
      Name: "8 Seater",
      count: 8,
      img: "		https://media.cars24.com/india/buy/facets_v4/seats/8_Seater.png",
      checked: false,
    },
    {
      Name: "9 Seater",
      count: 9,
      img: "https://media.cars24.com/india/buy/facets_v4/seats/9_Seater.png",
      checked: false,
    },
  ];
  return (
    <div className="flex flex-col ">
      <div
        className="flex justify-between py-6 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <p className="text-lg font-semibold">Seats</p>
        <ChevronDown
          className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open ? (
        <div className="flex flex-wrap gap-4 items-center  ">
          {SeatTypeData.map((item, idx) => (
            <div
              key={idx + "ASDADSADSFADS"}
              className={`w-28 items-center bg-gray-200 duration-500 py-4 ${
                idx + 1 === selectedSeat &&
                " scale-115 bg-gray-300 border border-gray-500"
              }  rounded-lg cursor-pointer `}
              onClick={() => {
                setSeat(SeatTypeData.count), setSelectedSeat(idx + 1);
              }}
            >
              <div className="flex gap-2 items-center flex-col">
                <img className="w-20 h-8" src={item.img} alt="" />
                <p className="text-sm text-[#394252] font-semibold ">
                  {item.Name}
                </p>
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

export default Seats;
