import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agent_myads } from "../../../../rtk/slices/agentSlice";
import { Link } from "react-router-dom";
import { Car, Plus, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import moment from "moment";

const AgentDashboard = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { myAds, loader } = useSelector((slice) => slice.agent);
  const { userInfo } = useSelector((slice) => slice.auth);

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

  const getAccentText = () => {
    switch (theme) {
      case "green": return "text-orange-500";
      case "white": return "text-gray-700";
      case "black": return "text-zinc-400";
      default: return "text-orange-500";
    }
  };

  const getAccentBgLight = () => {
    switch (theme) {
      case "green": return "bg-orange-100";
      case "white": return "bg-gray-100";
      case "black": return "bg-zinc-800";
      default: return "bg-orange-100";
    }
  };

  const stats = [
    {
      name: "Total Vehicles",
      value: myAds?.length || 0,
      icon: Car,
      bgColor: getAccentBgLight(),
      textColor: getAccentText(),
    },
    {
      name: "Active Listings",
      value: myAds?.filter(ad => ad.status === "active")?.length || myAds?.length || 0,
      icon: CheckCircle,
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      name: "Pending Review",
      value: myAds?.filter(ad => ad.status === "pending")?.length || 0,
      icon: Clock,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className={`${getAccentBg()} rounded-2xl p-6 text-white`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {userInfo?.name || "Agent"}!</h1>
            <p className="text-white/80 mt-1">
              {userInfo?.isVerified
                ? "Your account is verified. Start posting vehicles!"
                : "Complete verification to unlock all features"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {userInfo?.isVerified ? (
              <span className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl">
                <CheckCircle className="size-5" />
                Verified
              </span>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-xl text-yellow-200">
                <AlertCircle className="size-5" />
                Pending Verification
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800 truncate">{userInfo?.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">{userInfo?.phoneNumber || "Not set"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">WhatsApp</p>
            <p className="font-medium text-gray-800">{userInfo?.whatsappNumber || userInfo?.phoneNumber || "Not set"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium text-gray-800">{moment(userInfo?.createdAt).format("MMM YYYY")}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`size-7 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/agent/post/vehicle"
            className={`flex items-center gap-4 p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-400 hover:bg-orange-50 transition-all group`}
          >
            <div className={`w-12 h-12 ${getAccentBg()} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
              <Plus className="size-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Post New Vehicle</p>
              <p className="text-sm text-gray-500">List a new vehicle for sale</p>
            </div>
          </Link>
          <Link
            to="/agent/post/ad"
            className="flex items-center gap-4 p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-400 hover:bg-orange-50 transition-all group"
          >
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <FileText className="size-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Post Banner Ad</p>
              <p className="text-sm text-gray-500">Create promotional content</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Vehicles */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Vehicles</h2>
          <Link
            to="/agent/vehicles"
            className={`text-sm font-medium ${getAccentText()} hover:underline`}
          >
            View All
          </Link>
        </div>

        {loader ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading vehicles...</p>
          </div>
        ) : myAds?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myAds.slice(0, 6).map((vehicle) => (
              <Link
                key={vehicle._id}
                to={`/vehicle/detail/${vehicle.slug}`}
                className="group rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={vehicle.thumbnail || vehicle.images?.[0]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg">
                    {vehicle.commision}% commission
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{vehicle.name} {vehicle.model}</h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    ₹{vehicle.price?.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span>{vehicle.year}</span>
                    <span>•</span>
                    <span>{vehicle.fuelType}</span>
                    <span>•</span>
                    <span>{vehicle.totalKmDriven} km</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Car className="size-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No vehicles listed yet</p>
            <Link
              to="/agent/post/vehicle"
              className={`inline-flex items-center gap-2 mt-4 px-6 py-2 ${getAccentBg()} text-white rounded-xl hover:opacity-90 transition-opacity`}
            >
              <Plus className="size-4" />
              Post Your First Vehicle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
