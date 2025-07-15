import React from "react";
import logo from "/logo/karlo.png";
const Footer = () => {
  const footerData = [
    {
      heading: "Company",
      subheading: [
        "About Us",
        "Careers",
        "Press kit",
        "Blog",
        "Article",
        "News",
        "Privacy Policy",
        "Sustainability",
        "Testimonials",
      ],
    },
    {
      heading: "Discover",
      subheading: [
        "Buy used car",
        "Sell used car",
        "Used car valuation",
        "Motor insurance",
        "Check & pay challan",
        "Check vehicle details",
        "Explore new cars",
        "Scrap your car",
      ],
    },
    {
      heading: "Help & support",
      subheading: [
        "FAQs",
        "Security",
        "Contact us",
        "Become a partner",
        "RC transfer status",
        "Terms & conditions",
      ],
    },
  ];

  return (
    <>
      <div className="lg:w-full text-sm lg:text-xl  lg:px-54 border-t border-gray-300 pt-12 px-6  py-6 lg:pt-12  lg:h-[600px] bg-linear-to-t from-[#F0FFF7] to-[#FAFFF5]">
        <div className="flex justify-start items-center gap-3  ">
          <img className="lg:w-64 w-32 " src={logo} alt="Company Logo" />
          <p className="lg:text-xl text-lg text-[#465166] font-semibold border-l-2 pl-3">
            we care your savings
          </p>
        </div>

        <div className="lg:flex lg:justify-between lg:mt-8">
          {footerData.map((item, idx) => (
            <div key={idx} className="flex  gap-4 mt-4 flex-col">
              <h1 className="text-lg  font-semibold uppercase">
                {item.heading}
              </h1>
              <div className="flex flex-col gap-2 lg:gap-3">
                {item.subheading.map((subItem, subIdx) => (
                  <p
                    key={subIdx + "subheading"}
                    className="text-gray-500  font-medium lg:text-lg text-sm hover:text-black cursor-pointer"
                  >
                    {subItem}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <div className=" flex flex-col gap-4">
            <h1 className="text-lg font-semibold uppercase mt-8">
              Social Links
            </h1>
            <div className="flex gap-4  lg:mt-2">
              <img
                className=" cursor-pointer"
                src="https://cdn.cars24.com/qa/cms/2025/01/28/20bc036d-1141-4ebd-8d20-7b1375870066facebook.png"
                alt="Facebook"
              />
              <img
                className=" cursor-pointer"
                src="https://cdn.cars24.com/qa/cms/2025/01/28/710ea14d-190f-4955-bb11-0743e5a3627ex.png"
                alt="Twitter"
              />
              <img
                className=" cursor-pointer"
                src="https://cdn.cars24.com/qa/cms/2025/01/28/744c742a-864f-4616-9a25-c664d0dbb652instragram.png"
                alt="Instagram"
              />
              <img
                className=" cursor-pointer"
                src="https://cdn.cars24.com/qa/cms/2025/01/28/456bd9b6-6fca-4659-8c6c-427c6f571317youtube.png"
                alt="YouTube"
              />
              <img
                className=" cursor-pointer"
                src="https://cdn.cars24.com/qa/cms/2025/01/28/1cf9514f-9a2b-44df-8407-9eb9c5984812linkin.png"
                alt="LinkedIn"
              />
            </div>
            <div className="flex flex-col w-fit lg:flex-row mt-8  gap-2">
              <img
                src="https://cdn.cars24.com/qa/cms/2025/01/28/af06855c-ff0e-4af6-8430-26358b691fe4appstore.png"
                alt=""
              />
              <img
                src="https://cdn.cars24.com/qa/cms/2025/01/28/792eefd8-bb3c-4401-a763-f21806591741playstore.png"
                alt=""
              />
            </div>
            <p className="uppercase font-semibold text-xl mt-2">
              We are global
            </p>
            <div className="flex gap-2 items-center mt-4">
              <img
                src="https://cdn.cars24.com/qa/cms/2025/01/28/6b5b5a14-3e69-4fbb-9827-86ba7eb00521australia.png"
                alt=""
              />
              <p className="text-[#717272] text-lg ">Australia</p>
              <img
                src="https://cdn.cars24.com/qa/cms/2025/01/28/115ef785-4593-4773-90a1-60d8e0f1c6c8uae.png"
                alt=""
              />
              <p className="text-[#717272] text-lg">UAE</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center font-semibold text-gray-600 mb-0">
          <p>© 2025 KARLO India, All rights reserved</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
