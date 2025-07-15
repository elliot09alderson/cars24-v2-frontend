import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
const ModelYear = ({ year, setYear, kms, setkms }) => {
  const [updown, setUpDown] = useState(true);

  return (
    <div>
      <div className="flex px-4 py-6 lg:px-0 justify-between  border-t-[2px] border-gray-200 ">
        <p className="text-lg font-semibold ">Model year</p>
        <ChevronDown
          className={`bg-gray-200 rounded-full p-1 transition-transform duration-300 ${
            updown ? "rotate-180" : ""
          }`}
          onClick={() => setUpDown((prev) => !prev)}
        />
        {/* <ChevronUp /> */}
      </div>

      {updown ? (
        <div className="py-5">
          <div className="pl-2  flex gap-2">
            <span>2010</span>

            <input
              type="range"
              className="w-full "
              min={2010}
              max={2025}
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
            <span>2025</span>
          </div>
          <h2 className="flex items-center justify-center text-sm font-semibold">
            {year}
          </h2>
        </div>
      ) : (
        <div className="border border-b border-gray-200"></div>
      )}
    </div>
  );
};

export default ModelYear;
