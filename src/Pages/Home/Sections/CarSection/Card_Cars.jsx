import React, { useEffect } from "react";
import checklist from "/public/image/checklist.png";
import autonaut from "/public/Home_image/autonaut.8a723bda.jpg";
import { ChevronDown, MapPin, Car, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearMessage } from "../../../../../rtk/slices/vehicleSlice.js";
import { formatNumberWithCommas } from "../../../../lib/utils.js";

const Card_Cars = ({ vehicle }) => {
  return (
    <div className="w-[320px] lg:w-[300px] cursor-pointer bg-white/90 backdrop-blur-sm overflow-hidden rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100/50 transition-all duration-300 hover:-translate-y-1 group">
      <div className="bg-gradient-to-b from-gray-100 to-white rounded-t-3xl p-3">
        <img
          src={vehicle?.images?.[0] || vehicle?.thumbnail}
          className="object-cover w-full rounded-2xl h-48 group-hover:scale-[1.02] transition-transform duration-300"
          alt={vehicle?.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </div>
      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-gray-900 truncate">{vehicle?.name}</p>
          <p className="text-gray-500 truncate text-sm">{vehicle?.model}</p>
        </div>
        <div className="flex gap-1.5 items-center text-xs text-gray-600 font-medium flex-wrap">
          <p className="bg-gray-100 px-2.5 py-1.5 rounded-xl">
            {vehicle?.totalKmDriven?.toLocaleString()} km
          </p>
          <p className="bg-gray-100 px-2.5 py-1.5 rounded-xl">{vehicle?.fuelType}</p>
          <p className="bg-gray-100 px-2.5 py-1.5 rounded-xl capitalize">
            {vehicle?.transmission}
          </p>
          <p className="bg-gray-100 px-2.5 py-1.5 rounded-xl">{vehicle?.owners}</p>
        </div>
        <div className="flex justify-between items-end pt-2">
          <div>
            <p className="font-semibold text-gray-700 border-b border-dashed border-gray-300">
              {vehicle?.year || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-bold text-xl text-gray-900">
              ₹ {formatNumberWithCommas(vehicle?.price)}
            </p>
            <p className="text-gray-500 text-xs font-medium">
              + other charges
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 mx-4 my-2"></div>
      <div className="flex px-4 justify-between py-2">
        {vehicle?.assured && (
          <div className="flex gap-2 bg-orange-50 p-1.5 px-3 rounded-xl items-center">
            <img className="size-4" src={checklist} alt="" />
            <p className="text-orange-600 text-xs font-semibold">KARLO Assured</p>
          </div>
        )}
        <div className="flex gap-1.5 bg-orange-50 p-1.5 px-3 rounded-xl items-center ml-auto">
          <img className="size-4" src={autonaut} alt="" />
          <p className="text-orange-600 text-xs font-bold">Highlights</p>
          <ChevronDown className="size-4 text-orange-400" />
        </div>
      </div>
      <div className="flex gap-2 items-center px-4 py-3 rounded-b-3xl bg-gray-50/80">
        <MapPin className="size-4 text-gray-400" />
        <p className="text-sm font-medium text-gray-600 truncate">
          {vehicle?.location?.slice(0, 40) || "Location not specified"}
        </p>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const CardSkeleton = () => (
  <div className="w-[320px] lg:w-[300px] overflow-hidden rounded-3xl bg-white/80 border border-gray-100/50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] animate-pulse">
    <div className="bg-gray-100 h-48 rounded-t-3xl m-3 rounded-2xl"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-100 rounded-xl w-3/4"></div>
      <div className="flex gap-2">
        <div className="h-7 bg-gray-100 rounded-xl w-16"></div>
        <div className="h-7 bg-gray-100 rounded-xl w-16"></div>
        <div className="h-7 bg-gray-100 rounded-xl w-16"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-5 bg-gray-100 rounded-xl w-16"></div>
        <div className="h-6 bg-gray-100 rounded-xl w-24"></div>
      </div>
    </div>
    <div className="h-12 bg-gray-50 mt-2 rounded-b-3xl"></div>
  </div>
);

// Empty State Component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <Search className="size-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">No vehicles found</h3>
    <p className="text-gray-600 text-center max-w-md mb-6">
      We couldn't find any vehicles matching your filters. Try adjusting your search
      criteria or clearing some filters.
    </p>
    <div className="flex gap-2 text-sm text-gray-500">
      <Car className="size-5" />
      <span>Try searching for different brands or models</span>
    </div>
  </div>
);

const CarList = () => {
  const dispatch = useDispatch();
  const { vehicles, loading, successMessage, errorMessage, pagination } = useSelector(
    (state) => state.vehicle
  );

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage && vehicles.length > 0) {
      // Optional: show success toast
    }
    dispatch(clearMessage());
  }, [errorMessage, successMessage, dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-wrap gap-6 justify-center lg:justify-start my-8">
        {[...Array(6)].map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!loading && vehicles.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Results header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{vehicles.length}</span>
          {pagination?.total > 0 && ` of ${pagination.total}`} vehicles
        </p>
      </div>

      {/* Vehicle grid */}
      <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
        {vehicles.map((vehicle, idx) => (
          <Link key={vehicle._id || idx} to={`/vehicle/detail/${vehicle.slug}`}>
            <Card_Cars vehicle={vehicle} />
          </Link>
        ))}
      </div>

      {/* Pagination info */}
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center mt-8 text-gray-600">
          Page {pagination.page} of {pagination.totalPages}
        </div>
      )}
    </div>
  );
};

export default CarList;
