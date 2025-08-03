import React from "react";
import Navbar from "../component_01/Navbar";
import CarContainer from "./Home/Sections/CarContainer/CarContainer";
import Sidebar from "./Home/Sections/Sidebar/Sidebar";

const Ads = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full h-full flex lg:flex-row flex-col lg:justify-center gap-4 py-30">
        <div className="lg:w-1/6   bg-white  h-auto shadow-lg rounded-lg px-2  cursor-pointer">
          <Sidebar />
        </div>

        <div className="lg:w-4/6  min-h-screen scrollbar-hide">
          <CarContainer />
        </div>
      </div>
    </div>
  );
};

export default Ads;
