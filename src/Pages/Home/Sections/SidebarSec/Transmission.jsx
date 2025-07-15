import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Transmission = () => {
  const [dropDown, setDropDown] = useState(false);

  const TransmissionData = [
    {
      name: "Manual",
      icon: "https://media.cars24.com/india/buy/facets_v5/transmission/manual.svg?w=32&dpr=3",
      checked: false,
      count: "15",

      featureData: [
        {
          transName: "Regular (Manual)",
          checked: false,
          transCount: "46",
        },
        {
          transName: "iMT (Intelligent Manual Transmission)",
          checked: false,
          transCount: "0",
        },
      ],
    },
    {
      name: "Automatic",
      icon: "	https://media.cars24.com/india/buy/facets_v5/transmission/automatic.svg?w=32&dpr=3",
      checked: false,
      count: "23",

      featureData: [
        {
          transName: "AMT (Automated Manual Transmission)",
          checked: false,
          transCount: "25",
        },
        {
          transName: "TC (Torque Converter)",
          checked: false,
          transCount: "14",
        },
        {
          transName: "CVT (Continuously Variable Transmission)",
          checked: false,
          transCount: "26",
        },
        {
          transName: "DCT (Dual-Clutch Transmission)",
          checked: false,
          transCount: "34",
        },
        {
          transName: "IVT (Intelligent Variable Transmission)",
          checked: false,
          transCount: "12",
        },
      ],
    },
  ];

  const [openIdx, setOpenIdx] = useState(null);
  const [checkedIdx, setCheckedIdx] = useState(null);

  return (
    <div>
      <div
        className="py-6 flex justify-between"
        onClick={() => setDropDown((prev) => !prev)}
      >
        <p className="text-lg font-semibold">Transmission</p>
        <ChevronDown
          className={`bg-gray-100 rounded-full p-1 transition-transform duration-300 ${
            dropDown ? "rotate-180" : ""
          }`}
        />
      </div>
      {dropDown ? (
        <div>
          <p className="text-xs text-gray-400 font-semibold">Transmission</p>
          <div>
            {TransmissionData.map((item, idx) => (
              <div key={idx + "carss"}>
                <div className="flex justify-between pt-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={
                        checkedIdx == idx && item.featureData.includes(true)
                          ? true
                          : false
                      }
                      className="size-4 "
                    />
                    <img className="size-6" src={item.icon} alt="" />
                    <p>{item.name}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm">({item.count})</p>
                    <ChevronDown
                      className={` p-1 cursor-pointer duration-300 ${
                        idx === openIdx ? "rotate-180 text-blue-500" : ""
                      }`}
                      onClick={() =>
                        setOpenIdx((prev) => (prev != null ? null : idx))
                      }
                    />
                  </div>
                </div>
                <div
                  className={` ${
                    idx == openIdx ? "flex" : " hidden "
                  }  py-4  pl-4 flex-col gap-2`}
                >
                  {item.featureData?.map(
                    ({ transName, checked, transCount }, idx) => (
                      <div
                        key={idx + "ASssdas"}
                        className="flex justify-between"
                      >
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCheckedIdx(idx);
                              }
                            }}
                            className=" "
                          />
                          <p>{transName}</p>
                        </div>
                        <p className="text-sm">({transCount})</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-b border-gray-200"></div>
      )}
    </div>
  );
};

export default Transmission;
