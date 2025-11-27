import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component_01/Navbar";
import Footer from "../component_01/Footer";
import CarContainer from "./Home/Sections/CarContainer/CarContainer";
import Sidebar from "./Home/Sections/Sidebar/Sidebar";
import {
  toggleArrayFilter,
  setFilter,
  resetFilters,
} from "../../rtk/slices/vehicleSlice.js";
import { X, RotateCcw } from "lucide-react";

// Active Filters Display Component
const ActiveFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.vehicle);

  const getActiveFilters = () => {
    const active = [];

    if (filters.search) {
      active.push({ type: "search", label: `Search: "${filters.search}"`, value: filters.search });
    }

    filters.brand.forEach((brand) => {
      active.push({
        type: "brand",
        label: `Brand: ${brand.charAt(0).toUpperCase() + brand.slice(1)}`,
        value: brand,
      });
    });

    filters.model.forEach((model) => {
      active.push({ type: "model", label: `Model: ${model}`, value: model });
    });

    filters.fuelType.forEach((fuel) => {
      active.push({ type: "fuelType", label: `Fuel: ${fuel}`, value: fuel });
    });

    filters.transmission.forEach((trans) => {
      active.push({
        type: "transmission",
        label: `Transmission: ${trans.charAt(0).toUpperCase() + trans.slice(1)}`,
        value: trans,
      });
    });

    filters.bodyType.forEach((body) => {
      active.push({
        type: "bodyType",
        label: `Body: ${body.toUpperCase()}`,
        value: body,
      });
    });

    filters.color.forEach((color) => {
      active.push({ type: "color", label: `Color: ${color}`, value: color });
    });

    filters.owners.forEach((owner) => {
      active.push({ type: "owners", label: owner.replace("Owner", " Owner"), value: owner });
    });

    filters.seat.forEach((seat) => {
      active.push({ type: "seat", label: `${seat} Seater`, value: seat });
    });

    return active;
  };

  const activeFilters = getActiveFilters();

  const handleRemoveFilter = (type, value) => {
    if (type === "search") {
      dispatch(setFilter({ key: "search", value: "" }));
    } else {
      dispatch(toggleArrayFilter({ key: type, value }));
    }
  };

  const handleClearAll = () => {
    dispatch(resetFilters());
  };

  if (activeFilters.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-800">Active Filters ({activeFilters.length})</h3>
        <button
          onClick={handleClearAll}
          className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
        >
          <RotateCcw className="size-3.5" />
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <span
            key={`${filter.type}-${filter.value}-${index}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-sm font-medium"
          >
            {filter.label}
            <button
              onClick={() => handleRemoveFilter(filter.type, filter.value)}
              className="p-0.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

const Ads = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full h-full flex lg:flex-row flex-col lg:justify-center gap-4 py-30 px-4">
        {/* Sidebar */}
        <div className="lg:w-80 bg-white h-fit lg:sticky lg:top-24 shadow-lg rounded-lg px-4 py-2">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="lg:flex-1 lg:max-w-5xl min-h-screen">
          <ActiveFilters />
          <CarContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ads;
