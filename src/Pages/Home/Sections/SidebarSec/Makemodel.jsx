import { ChevronDown, Search, ToggleLeft, ToggleRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Hyundai from "/public/Home_image/b62fd2e2-d183-49f0-a09a-c22dfe30f724HYUNDAInew.jpg";
import SPRESSO from "/public/Home_image/12330d28-b357-4010-8d0c-6141a3f82e48MARUTISUZUKI17.jpg";
import honda from "/public/Home_image/b391b164-ebad-421a-9c8d-164c2adfb58dHONDAnew.jpg";
import tata from "/public/Home_image/fdafe75f-62ea-4cb9-8fca-3d57863a1e75TATAnew.jpg";

const Makemodel = () => {
  const brandAndModelName = [
    {
      brandName: "Maruti",
      brandLogo: SPRESSO,
      checked: true,

      models: [
        { checked: false, modelName: "S Presso", count: 18 },
        { checked: false, modelName: "Celerio", count: 11 },
        { checked: false, modelName: "Swift Dezire", count: 45 },
        { checked: false, modelName: "Swift", count: 5 },
        { checked: false, modelName: "Alto", count: 4 },
        { checked: false, modelName: "Baleno", count: 4 },
        { checked: false, modelName: "Ciaz", count: 4 },
      ],
    },

    {
      brandName: "Hyundai",
      brandLogo: Hyundai,
      checked: false,

      models: [
        { checked: false, modelName: "grand i 10", count: 18 },
        { checked: false, modelName: "verna", count: 11 },
        { checked: false, modelName: "i 20", count: 45 },
        { checked: false, modelName: "sentro", count: 5 },
        { checked: false, modelName: "aura", count: 4 },
        { checked: false, modelName: "Venue", count: 4 },
      ],
    },
  ];

  const [updown, setUpDown] = useState(true);
  const [openIdx, setOpenIdx] = useState(null);
  const [checkedIdx, setCheckedIdx] = useState(null);

  return (
    <div className="flex flex-col h-auto ">
      <div
        className="cursor-pointer py-6"
        onClick={() => setUpDown((prev) => !prev)}
      >
        <div className="flex gap-4 pt-4 justify-between">
          <div className="text-xl font-semibold  ">search</div>
          <ChevronDown
            className={` p-1 cursor-pointer duration-300 ${
              updown ? "rotate-180 text-blue-500" : ""
            }`}
          />
        </div>
      </div>

      {updown ? (
        <div>
          <div className="relative flex   items-center ">
            <input
              className="py-2  text-sm font-medium rounded-lg px-8 border  border-gray-300"
              type="text"
              placeholder="Search a brand or model"
            />
            <Search className="text-gray-400  size-5 absolute  left-2" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-400 font-semibold py-4">
              All Brands
            </p>
            <div className="flex flex-wrap gap-2 pb-4">
              <div className="flex gap-1 border rounded-md border-gray-300 w-fit px-2 py-1 items-center ">
                <img className="w-8  object-fill" src={Hyundai} alt="" />
                <p className="text-sm font-semibold">Grand i 10</p>
              </div>{" "}
              <div className="flex gap-1  border rounded-md border-gray-300 w-fit px-2 py-1 items-center ">
                <img className="w-8  object-fill" src={SPRESSO} alt="" />
                <p className="text-sm font-semibold">S PRESSO</p>
              </div>{" "}
              <div className="flex gap-1  border rounded-md border-gray-300 w-fit px-2 py-1 items-center ">
                <img className="w-8  object-fill" src={SPRESSO} alt="" />
                <p className="text-sm font-semibold">Celerio</p>
              </div>{" "}
              <div className="flex gap-1 border rounded-md border-gray-300 w-fit px-2 py-1 items-center ">
                <img className="w-8  object-fill" src={honda} alt="" />
                <p className="text-sm font-semibold">Jazz</p>
              </div>{" "}
              <div className="flex gap-1 border rounded-md border-gray-300 w-fit px-2 py-1 items-center ">
                <img className="w-8  object-fill" src={tata} alt="" />
                <p className="text-sm font-semibold">Tiago</p>
              </div>{" "}
              <div className="flex gap-1 border rounded-md border-gray-300 w-fit px-2 py-1 items-center ">
                <img className="w-8  object-fill" src={Hyundai} alt="" />
                <p className="text-sm font-semibold">NEW SANTRO</p>
              </div>
            </div>
            <div className="border-b  border-gray-300">
              {brandAndModelName.map((brand, idx) => (
                <div key={idx + "ASdas"}>
                  <div className="flex justify-between items-center cursor-pointer">
                    <div className="flex gap-4 p-2">
                      <input
                        className="size-5  border rounded-sm border-gray-300 bg-gray-100"
                        checked={
                          checkedIdx == idx && brand.models.includes(true)
                            ? true
                            : false
                        }
                        type="checkbox"
                      />
                      <img
                        className="w-6 h-4 object-cover "
                        src={brand.brandLogo}
                        alt=""
                      />
                      <p className="text-sm font-semibold text-[#374151]">
                        {brand.brandName}
                      </p>
                    </div>
                    <div>
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
                    {brand.models?.map(({ modelName, count, checked }, id) => (
                      <div
                        key={id + "ASD"}
                        className="flex items-center select-none justify-between gap-4"
                      >
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCheckedIdx(idx);
                              }
                            }}
                          />
                          <h2>{modelName}</h2>
                        </div>
                        <h2>({count})</h2>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* <input className="size-4" type="checkbox" /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="border-b border border-gray-200"></div>
      )}
    </div>
  );
};

export default Makemodel;
