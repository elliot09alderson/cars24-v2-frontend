import React, { useCallback, useEffect, useState } from "react";
import Makemodel from "../SidebarSec/Makemodel";
import ModelYear from "../SidebarSec/ModelYear";
import Fule from "../SidebarSec/Fule";
import BodyType from "../SidebarSec/BodyType";
import Color from "../SidebarSec/Color";
import Transmission from "../SidebarSec/Transmission";
import Features from "../SidebarSec/Features";
import Owners from "../SidebarSec/Owners";
import Seats from "../SidebarSec/Seats";
import Safety from "../SidebarSec/Safety";
import { useDispatch } from "react-redux";
import { filterVehicle } from "../../../../../rtk/slices/vehicleSlice.js";
import PriceRangeSlider from "../SidebarSec/MultiRangeSlider.js";
import { debounce, set } from "lodash";
import { ChevronDown, ToggleLeft, ToggleRight } from "lucide-react";
const Sidebar = () => {
  const [year, setYear] = useState([2000, 2025]);
  const [kms, setKms] = useState([0, 500000]);
  const [seat, setSeat] = useState(undefined);
  const [priceAndYear, setPriceAndYear] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(true);
  const [localValues, setLocalValues] = React.useState([500, 4000000]);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(
  //     filterVehicle({
  //       // brand,
  //       // model,
  //       // color,
  //       minPrice: localValues[0],
  //       maxPrice: localValues[1],
  //       totalKmDriven: kms,
  //       year,
  //       // fuelType,
  //       // owners,
  //       // serialNo,
  //       // transmission,
  //       // seater,
  //     })
  //   );
  // }, [year, kms, localValues]);
  const debouncedFilter = useCallback(
    debounce((values) => {
      dispatch(
        filterVehicle({
          minPrice: values[0],
          maxPrice: values[1],
          minKmDriven: kms[0],
          maxKmDriven: kms[1],
          minYear: year[0],
          maxYear: year[1],
          seater: seat,
        })
      );
    }, 500), // 500ms delay
    [dispatch, kms, year, seat]
  );

  // Update debounced filter when slider changes
  useEffect(() => {
    debouncedFilter(localValues);
  }, [localValues, debouncedFilter]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedFilter.cancel();
    };
  }, [debouncedFilter]);

  return (
    <div className=" border-r border-gray-200 lg:pr-2">
      <div
        className=" flex items-center 
        justify-center  gap-4"
        onClick={() => setToggleFilter((prev) => !prev)}
      >
        <p className="text-xl font-semibold my-2">Search and Filter By Model</p>{" "}
        {toggleFilter ? (
          <ToggleRight className="size-10 text-gray-500" />
        ) : (
          <ToggleLeft className="size-10 text-gray-500" />
        )}
      </div>

      {toggleFilter && (
        <div>
          <Makemodel />
          <div className="flex flex-col  border-gray-200   border-b-2">
            <div
              className="flex justify-between py-6"
              onClick={() => setPriceAndYear((prev) => !prev)}
            >
              <p className="text-lg font-semibold">price and range filters</p>
              <ChevronDown
                className={`bg-gray-100  rounded-full p-1 transition-transform duration-300 ${
                  priceAndYear ? " rotate-180 " : " rotate-0 "
                }`}
              />
            </div>

            {priceAndYear && (
              <div>
                <PriceRangeSlider
                  heading="Price Range"
                  min={500}
                  max={4000000}
                  localValues={localValues}
                  measurementText={"₹"}
                  setLocalValues={setLocalValues}
                />{" "}
                <PriceRangeSlider
                  max={500000}
                  min={0}
                  localValues={kms}
                  setLocalValues={setKms}
                  heading={"Kms Driven"}
                  measurementText={"km"}
                />{" "}
                <PriceRangeSlider
                  max={2025}
                  min={2010}
                  localValues={year}
                  setLocalValues={setYear}
                  heading={"Model Year"}
                  measurementText={"year"}
                />
              </div>
            )}
          </div>

          {/* <ModelYear year={year} setYear={setYear} /> */}
          <Fule />
          <BodyType />
          <Color />
          <Transmission />
          <Features />
          <Owners />
          <Seats seat={seat} setSeat={setSeat} />
          <Safety />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
