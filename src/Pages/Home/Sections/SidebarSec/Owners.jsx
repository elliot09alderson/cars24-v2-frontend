import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Owners = () => {
  const [dropDown, setDropDown] = useState(false);
  const ownersData = [
    {
      name: "First owner",
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/user.svg",
      checked: false,
      count: "12",
    },
    {
      name: "Second owner",
      icon: "	https://media.cars24.com/india/buy/facets_v4/icons/v2/users.svg",
      checked: false,
      count: "12",
    },
    {
      name: "Third owner",
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/group_users.svg",
      checked: false,
      count: "12",
    },
    {
      name: "Fourth owner",
      icon: "https://media.cars24.com/india/buy/facets_v4/icons/v2/group_users_for_4.svg",
      checked: false,
      count: "12",
    },
  ];
  return (
    <div>
      <div
        className="cursor-pointer py-6 flex justify-between items-center"
        onClick={() => setDropDown((prev) => !prev)}
      >
        <p className="text-lg font-semibold">Owners</p>
        <ChevronDown
          className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
            dropDown ? "rotate-180" : ""
          }`}
        />
      </div>
      {dropDown ? (
        <div className="flex flex-col gap-4">
          {ownersData.map((item, idx) => (
            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.checked}
                  className="size-5"
                />
                <img className="size-5" src={item.icon} alt="" />
                <p className="text-[#4E5765] text-sm font-semibold">
                  {item.name}
                </p>
              </div>
              <p className="text-sm text-gray-400">({item.count})</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-b border-gray-200"></div>
      )}
    </div>
  );
};

export default Owners;
