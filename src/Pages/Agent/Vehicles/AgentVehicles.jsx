import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agent_myads } from "../../../../rtk/slices/agentSlice";
import { Link } from "react-router-dom";
import { Car, Plus, MapPin, Calendar, Fuel, Settings2 } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const AgentVehicles = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { myAds, loader } = useSelector((slice) => slice.agent);

  useEffect(() => {
    dispatch(agent_myads());
  }, [dispatch]);

  const getAccentBg = () => {
    switch (theme) {
      case "green": return "bg-gray-900";
      case "white": return "bg-gray-700";
      case "black": return "bg-zinc-700";
      default: return "bg-gray-900";
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  if (loader) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading your vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Vehicles</h1>
          <p className="text-gray-500 mt-1">
            {myAds?.length || 0} vehicles listed
          </p>
        </div>
        <Link
          to="/agent/post/vehicle"
          className={`flex items-center gap-2 px-5 py-2.5 ${getAccentBg()} text-white rounded-xl hover:opacity-90 transition-opacity font-medium`}
        >
          <Plus className="size-5" />
          Add Vehicle
        </Link>
      </div>

      {/* Vehicles Grid */}
      {myAds?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAds.map((vehicle) => (
            <Link
              key={vehicle._id}
              to={`/vehicle/detail/${vehicle.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                <img
                  src={vehicle.thumbnail || vehicle.images?.[0]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg">
                  {vehicle.commision}% commission
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-500 transition-colors">
                  {vehicle.name} {vehicle.model}
                </h3>

                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ₹{formatPrice(vehicle.price)}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="size-4 text-gray-400" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Fuel className="size-4 text-gray-400" />
                    <span>{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Settings2 className="size-4 text-gray-400" />
                    <span>{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="size-4 text-gray-400" />
                    <span className="truncate">{vehicle.location}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {vehicle.totalKmDriven?.toLocaleString()} km • {vehicle.owners}
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    vehicle.status === "active"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {vehicle.status || "Active"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <Car className="size-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Vehicles Yet</h3>
          <p className="text-gray-500 mb-6">Start by adding your first vehicle listing</p>
          <Link
            to="/agent/post/vehicle"
            className={`inline-flex items-center gap-2 px-6 py-3 ${getAccentBg()} text-white rounded-xl hover:opacity-90 transition-opacity font-medium`}
          >
            <Plus className="size-5" />
            Post Your First Vehicle
          </Link>
        </div>
      )}
    </div>
  );
};

export default AgentVehicles;
