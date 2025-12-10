import React, { useEffect } from "react";

import Car_overview from "./Sections/Car_overview";
import Carousel from "./Sections/Carousel";
import Great_things from "./Sections/Great_things";
import Car_inspection from "./Sections/Car_inspection";
import Book_free from "./Sections/Book_free";
import Navbar from "../../component_01/Navbar.jsx";
import Footer from "../../component_01/Footer.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicleDetail } from "../../../rtk/slices/vehicleSlice";

const VehicleDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { vehicleDetails } = useSelector((slice) => slice.vehicle);
  console.log(vehicleDetails);
  useEffect(() => {
    dispatch(fetchVehicleDetail(slug));
  }, [slug]);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="w-full lg:py-24 py-16 lg:px-8 px-4 h-auto flex lg:flex-row flex-col justify-center gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-8 mt-12 lg:flex-1">
            <Carousel data={vehicleDetails?.images} />
            <Great_things />
            <Car_overview data={vehicleDetails} />
            <Car_inspection data={vehicleDetails} />
          </div>
          <div className="relative mt-12 lg:w-[380px]">
            <Book_free data={vehicleDetails} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default VehicleDetails;
