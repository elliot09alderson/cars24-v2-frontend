import React, { useEffect } from "react";

import Car_overview from "./Sections/Car_overview";
import Carousel from "./Sections/Carousel";
import Great_things from "./Sections/Great_things";
import Car_inspection from "./Sections/Car_inspection";
import Book_free from "./Sections/Book_free";
import Navbar from "../../component_01/Navbar.jsx";
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
      <div>
        <Navbar />
        <div className="w-full lg:py-20 py-12 bg-[#F5F5F5]  lg:px-0 px-4 h-auto flex lg:flex-row flex-col justify-center gap-10">
          <div className="flex flex-col gap-10  mt-12 ">
            <Carousel data={vehicleDetails?.images} />
            <Great_things />
            <Car_overview data={vehicleDetails} />
            <Car_inspection data={vehicleDetails} />
          </div>
          <div className="relative mt-12">
            <Book_free data={vehicleDetails} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;
