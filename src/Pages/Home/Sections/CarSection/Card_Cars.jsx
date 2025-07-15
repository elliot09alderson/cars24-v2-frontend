import React, { useEffect } from "react";
import RightFront from "/public/Home_image/2-Right-Front-Diagonal (1).jpg";
import RightFront2 from "/public/Home_image/2-Right-Front-Diagonal (2).jpg";
import checklist from "/public/image/checklist.png";
import autonaut from "/public/Home_image/autonaut.8a723bda.jpg";
import { ChevronDown, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../../../../rtk/slices/vehicleSlice.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearMessage } from "../../../../../rtk/slices/vehicleSlice.js";
import { formatNumberWithCommas } from "../../../../lib/utils.js";

const Card_Cars = ({ vehicle }) => {
  return (
    <div className=" w-[320px] lg:w-[300px] cursor-pointer  shadow border overflow-hidden border-gray-300 rounded-xl">
      <div className="bg-linear-to-b from-[#D9E0E4] to-white   rounded-t-xl p-2">
        <img
          src={vehicle?.images[0]}
          className="object-cover w-full rounded-t-xl h-48 "
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 px-3">
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold">{vehicle.name} </p>
          <p className="text-gray-700">{vehicle.model}</p>
        </div>
        <div className="flex gap-1 items-center justify-between text-xs text-[#727373] font-semibold">
          <p className="bg-[#F5F5F5]  py-1 rounded-sm">
            {vehicle.totalKmDriven} km
          </p>
          <p className="bg-[#F5F5F5] px-2 py-1 rounded-sm">
            {vehicle.fuelType}
          </p>
          <p className="bg-[#F5F5F5] px-2 py-1 rounded-sm">
            {vehicle?.transmission}
          </p>
          <p className="bg-[#F5F5F5] px-2 py-1 rounded-sm">{vehicle.owners}</p>
        </div>
        <div className="flex justify-between pt-1">
          <div>
            <p className="font-semibold border-b border-dashed">
              {vehicle?.year ? vehicle.year : ""}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-end">
              ₹ {formatNumberWithCommas(vehicle?.price)}
            </p>
            <p className="text-[#787979] text-xs border-b border-dashed font-semibold">
              + other charges
            </p>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 mt-5 border-dashed"></div>
      <div className="flex px-2 justify-between py-2">
        <div className="flex gap-2 bg-[#F5F5F5] p-1 px-2 rounded-sm items-center">
          <img className="size-4" src={checklist} alt="" />
          <p className="text-[#7E7F7F] text-xs font-semibold">KARLO Assured</p>
        </div>
        <div className="flex gap-1 bg-[#FEF4EC] p-1 px-1 rounded-xl items-center">
          <img className="size-4" src={autonaut} alt="" />
          <p className="text-[#EF6E0B] text-xs font-bold">Highlights </p>
          <ChevronDown className="size-4 text-[#7E7F7F]" />
        </div>
      </div>
      <div className="flex gap-1 items-center px-2 py-2 rounded-b-xl bg-[#F5F5F5]">
        <MapPin className="size-3 text-[#7E7F7F]" />
        <p className="text-sm text-center font-normal text-[#7E7F7F]">
          {vehicle.location.slice(0, 40)}
        </p>
      </div>
    </div>
  );
};

const CarList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVehicles());
  }, []);

  const { vehicles, loading, successMessage, errorMessage } = useSelector(
    (slice) => slice.vehicle
  );
  useEffect(() => {
    console.log(vehicles);
    if (errorMessage) {
      toast.error("no such vehicles present");
    }
    dispatch(clearMessage());
  }, [errorMessage, successMessage]);
  return (
    <div className="flex  my-20 min-h-[76vh]   overflow-y-scroll lg:flex-row flex-col lg:flex-wrap gap-20 ">
      {vehicles.map((vehicle, idx) => (
        <Link to={`/vehicle/detail/${vehicle.slug}`}>
          <Card_Cars key={vehicle._id + idx + "ASDADS"} vehicle={vehicle} />
        </Link>
      ))}
    </div>
  );
};

export default CarList;
