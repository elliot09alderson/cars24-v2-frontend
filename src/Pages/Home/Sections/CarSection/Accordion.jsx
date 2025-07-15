import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Accordion = () => {
  const accordionData = [
    {
      title:
        "What body type for used cars are available under 5 lakhs in Bangalore?",
      subheading:
        "At CARS24, you can select from a wide selection of body types including hatchbacks, sedans, SUVs and MPVs from various brands.",
    },
    {
      title:
        "What body type for used cars are available under 5 lakhs in Bangalore?",
      subheading:
        "At CARS24, you can select from a wide selection of body types including hatchbacks, sedans, SUVs and MPVs from various brands.",
    },
    {
      title:
        "What body type for used cars are available under 5 lakhs in Bangalore?",
      subheading:
        "At CARS24, you can select from a wide selection of body types including hatchbacks, sedans, SUVs and MPVs from various brands.",
    },
    {
      title:
        "What body type for used cars are available under 5 lakhs in Bangalore?",
      subheading:
        "At CARS24, you can select from a wide selection of body types including hatchbacks, sedans, SUVs and MPVs from various brands.",
    },
    {
      title:
        "What body type for used cars are available under 5 lakhs in Bangalore?",
      subheading:
        "At CARS24, you can select from a wide selection of body types including hatchbacks, sedans, SUVs and MPVs from various brands.",
    },
    {
      title:
        "What body type for used cars are available under 5 lakhs in Bangalore?",
      subheading:
        "At CARS24, you can select from a wide selection of body types including hatchbacks, sedans, SUVs and MPVs from various brands.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <div className="lg:w-full h-auto px-4 lg:px-0">
      <p className="lg:font-bold font-semibold text-xl lg:text-2xl py-10">
        Frequently Asked Questions
      </p>
      <div className="flex flex-col gap-3 overflow-y-scroll">
        {accordionData.map((item, idx) => (
          <div
            onClick={() => setOpen((prev) => (prev != null ? null : idx))}
            key={idx + "accordion"}
            className={` flex  flex-col gap-4 bg-[#E5F3FF] p-2 lg:p-4 rounded-xl cursor-pointer`}
          >
            <div className="flex lg:justify-between">
              <div className="flex items-center gap-1 lg:gap-4">
                <h1 className="lg:text-xl text-xs lg:font-semibold">
                  {idx + 1}.
                </h1>
                <p className="lg:text-xl text-xs lg:font-semibold">
                  {item.title}
                </p>
              </div>
              <ChevronDown
                className={`text-xs lg:text-sm ${
                  idx == open ? "rotate-180" : ""
                }`}
              />
            </div>

            <p
              className={`${idx === open ? "flex" : "hidden"}
                 pl-6 lg:text-lg text-xs  text-[#717272]`}
            >
              {item.subheading}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
