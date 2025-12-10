import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { customer_logout } from "../../../rtk/slices/authSlice";
import {
  getCustomerProfile,
  updateCustomerProfile,
  getWishlist,
  removeFromWishlist,
  clearMessage,
} from "../../../rtk/slices/customerSlice";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  LogOut,
  Car,
  Heart,
  Settings,
  Edit3,
  X,
  Save,
  MapPin,
  Camera,
  Trash2,
} from "lucide-react";
import Navbar from "../../component_01/Navbar";
import Footer from "../../component_01/Footer";
import moment from "moment";
import { toast } from "react-toastify";
import { formatNumberWithCommas } from "../../lib/utils";

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((slice) => slice.auth);
  const { profile, wishlist, profileLoading, wishlistLoading, successMessage, errorMessage } =
    useSelector((slice) => slice.customer);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.role === "customer") {
      dispatch(getCustomerProfile());
      dispatch(getWishlist());
    } else if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessage());
      setIsEditing(false);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(customer_logout()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("address", formData.address);
    if (avatarFile) {
      data.append("avatar", avatarFile);
    }

    dispatch(updateCustomerProfile(data));
  };

  const handleRemoveFromWishlist = (vehicleId) => {
    dispatch(removeFromWishlist(vehicleId));
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    if (profile) {
      setFormData({
        name: profile.name || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
      });
    }
  };

  if (!userInfo) {
    navigate("/login");
    return null;
  }

  const displayData = profile || userInfo;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="pt-24 pb-12 px-4 lg:px-8 max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/30 overflow-hidden">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-700"></div>

          {/* Profile Info */}
          <div className="px-6 lg:px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 -mt-12">
              {/* Avatar */}
              <div className="relative group">
                <img
                  src={
                    avatarPreview ||
                    displayData?.avatar ||
                    `https://ui-avatars.com/api/?name=${displayData?.name}&background=random&size=120`
                  }
                  alt="Profile"
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white size-8" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Name & Role */}
              <div className="flex-1 pt-4 lg:pt-0 lg:pb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
                  {displayData?.name}
                </h1>
                <p className="text-gray-500 font-medium capitalize">
                  {displayData?.role || "Customer"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all duration-300 shadow-lg shadow-gray-900/20 flex items-center gap-2"
                    >
                      <Edit3 className="size-4" />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit}
                      disabled={profileLoading}
                      className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-600/20 flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save className="size-4" />
                      {profileLoading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                    >
                      <X className="size-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/30 p-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "profile"
                ? "bg-gray-900 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User className="size-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "wishlist"
                ? "bg-gray-900 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart className="size-4" />
            Wishlist ({wishlist?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Personal Information */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/30 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="size-5 text-orange-500" />
                Personal Information
              </h2>
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="Enter phone number"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                      placeholder="Enter your address"
                      rows={3}
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <Mail className="size-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{displayData?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <Phone className="size-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        {displayData?.phoneNumber || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="size-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">
                        {displayData?.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <Calendar className="size-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="font-medium text-gray-900">
                        {moment(displayData?.createdAt).format("MMMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <Shield className="size-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Account Status</p>
                      <p className="font-medium text-green-600">Active</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/30 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="size-5 text-orange-500" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/ads")}
                  className="w-full flex items-center gap-4 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Car className="size-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Browse Cars</p>
                    <p className="text-sm text-gray-500">Explore available vehicles</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("wishlist")}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/30">
                    <Heart className="size-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">My Wishlist</p>
                    <p className="text-sm text-gray-500">
                      {wishlist?.length || 0} saved vehicles
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center shadow-lg shadow-gray-700/30">
                    <Settings className="size-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Account Settings</p>
                    <p className="text-sm text-gray-500">Manage your preferences</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="mt-6">
            {wishlistLoading ? (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/30 p-12">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              </div>
            ) : wishlist && wishlist.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/30 overflow-hidden group hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={vehicle?.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                        alt={vehicle?.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => handleRemoveFromWishlist(vehicle._id)}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {vehicle?.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{vehicle?.model}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">
                          {vehicle?.year}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">
                          {vehicle?.fuelType}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg capitalize">
                          {vehicle?.transmission}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <p className="font-bold text-xl text-gray-900">
                          ₹ {formatNumberWithCommas(vehicle?.price)}
                        </p>
                        <Link
                          to={`/vehicle/detail/${vehicle?.slug}`}
                          className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
                        >
                          View
                        </Link>
                      </div>
                      {vehicle?.location && (
                        <div className="flex items-center gap-1 mt-3 text-gray-500 text-sm">
                          <MapPin className="size-4" />
                          <span className="truncate">{vehicle.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/30 p-12">
                <div className="text-center">
                  <Heart className="size-16 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium text-gray-700 text-lg">Your wishlist is empty</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Start adding cars you like to your wishlist
                  </p>
                  <button
                    onClick={() => navigate("/ads")}
                    className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-all duration-300"
                  >
                    Browse Cars
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CustomerProfile;
