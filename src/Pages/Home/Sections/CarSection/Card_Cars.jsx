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
    <div className="w-[320px] lg:w-[300px] cursor-pointer shadow border overflow-hidden border-gray-300 rounded-xl hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-b from-[#D9E0E4] to-white rounded-t-xl p-2">
        <img
          src={vehicle?.images?.[0] || vehicle?.thumbnail}
          className="object-cover w-full rounded-t-xl h-48"
          alt={vehicle?.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </div>
      <div className="flex flex-col gap-1 px-3">
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold truncate">{vehicle?.name}</p>
          <p className="text-gray-700 truncate">{vehicle?.model}</p>
        </div>
        <div className="flex gap-1 items-center justify-between text-xs text-[#727373] font-semibold flex-wrap">
          <p className="bg-[#F5F5F5] px-2 py-1 rounded-sm">
            {vehicle?.totalKmDriven?.toLocaleString()} km
          </p>
          <p className="bg-[#F5F5F5] px-2 py-1 rounded-sm">{vehicle?.fuelType}</p>
          <p className="bg-[#F5F5F5] px-2 py-1 rounded-sm capitalize">
            {vehicle?.transmission}
          </p>
          <p className="bg-[#F5F5F5] px-2 py-1 rounded-sm">{vehicle?.owners}</p>
        </div>
        <div className="flex justify-between pt-1">
          <div>
            <p className="font-semibold border-b border-dashed">
              {vehicle?.year || "N/A"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-end text-green-700">
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
        {vehicle?.assured && (
          <div className="flex gap-2 bg-[#F5F5F5] p-1 px-2 rounded-sm items-center">
            <img className="size-4" src={checklist} alt="" />
            <p className="text-[#7E7F7F] text-xs font-semibold">KARLO Assured</p>
          </div>
        )}
        <div className="flex gap-1 bg-[#FEF4EC] p-1 px-1 rounded-xl items-center ml-auto">
          <img className="size-4" src={autonaut} alt="" />
          <p className="text-[#EF6E0B] text-xs font-bold">Highlights</p>
          <ChevronDown className="size-4 text-[#7E7F7F]" />
        </div>
      </div>
      <div className="flex gap-1 items-center px-2 py-2 rounded-b-xl bg-[#F5F5F5]">
        <MapPin className="size-3 text-[#7E7F7F]" />
        <p className="text-sm text-center font-normal text-[#7E7F7F] truncate">
          {vehicle?.location?.slice(0, 40) || "Location not specified"}
        </p>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const CardSkeleton = () => (
  <div className="w-[320px] lg:w-[300px] shadow border overflow-hidden border-gray-300 rounded-xl animate-pulse">
    <div className="bg-gray-200 h-48 rounded-t-xl"></div>
    <div className="p-3 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-5 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
    <div className="h-10 bg-gray-100 mt-2"></div>
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
