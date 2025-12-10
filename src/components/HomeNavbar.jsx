import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Palette, Check } from "lucide-react";
import karlo from "/logo/karlo.png";
import { useSelector, useDispatch } from "react-redux";
import { customer_logout } from "../../rtk/slices/authSlice";
import { useTheme } from "../context/ThemeContext";

const HomeNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((slice) => slice.auth);
  const { theme, setTheme } = useTheme();
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const themeOptions = [
    { key: "green", name: "Green", color: "bg-gray-900" },
    { key: "white", name: "Light", color: "bg-gray-300" },
    { key: "black", name: "Dark", color: "bg-zinc-800" },
  ];

  async function logout() {
    setProfileDropdown(false);
    try {
      await dispatch(customer_logout()).unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    }
    navigate("/");
  }

  return (
    <div>
      <div className="flex fixed top-4 left-4 right-4 lg:flex-row flex-col h-[80px] z-100 backdrop-blur-xl rounded-2xl bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 items-center justify-between lg:px-12 px-6">
        <div className="flex gap-2 ">
          <Link to={"/"} className="lg:text-3xl text-lg font-bold">
            <h1>KARLO</h1>
          </Link>
        </div>
        <div className="flex lg:gap-4 gap-2 text-sm items-center">
          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeDropdown(!themeDropdown);
                setProfileDropdown(false);
              }}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Change Theme"
            >
              <Palette className="size-5 text-gray-600" />
            </button>

            {themeDropdown && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="p-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 px-2">Theme</p>
                </div>
                <div className="p-2 space-y-1">
                  {themeOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => {
                        setTheme(option.key);
                        setThemeDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        theme === option.key ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full ${option.color} flex items-center justify-center`}>
                        {theme === option.key && <Check className="size-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/agent/post/vehicle"
            className="py-3 lg:px-8 px-6 text-white rounded-2xl text-sm lg:text-base font-medium bg-gray-900 hover:bg-black shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all duration-300 cursor-pointer"
          >
            Sell
          </Link>
          <Link
            to="/ads"
            className="py-3 lg:px-8 px-6 text-white rounded-2xl text-sm lg:text-base font-medium bg-gray-900 hover:bg-black shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all duration-300 cursor-pointer"
          >
            See Ads
          </Link>

          {/* User Menu */}
          {userInfo ? (
            <div className="relative">
              <div
                onClick={() => {
                  setProfileDropdown(!profileDropdown);
                  setThemeDropdown(false);
                }}
                className="relative cursor-pointer"
              >
                {userInfo.avatar ? (
                  <img
                    src={userInfo.avatar}
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 hover:border-orange-500 transition-colors"
                    alt="Profile"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-200 hover:border-orange-500 transition-colors">
                    {userInfo.name?.slice(0, 2).toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              {profileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      {userInfo.avatar ? (
                        <img
                          src={userInfo.avatar}
                          className="h-12 w-12 rounded-xl object-cover"
                          alt="Profile"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold">
                          {userInfo.name?.slice(0, 2).toUpperCase() || "U"}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate capitalize">
                          {userInfo.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userInfo.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        userInfo.role === "agent"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {userInfo.role === "agent" ? "Agent" : "Customer"}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={userInfo?.role === "agent" ? "/agent/myads" : "/profile"}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                    onClick={() => setProfileDropdown(false)}
                  >
                    <svg className="size-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              className="py-3 lg:px-8 px-6 text-gray-800 rounded-2xl bg-white border border-gray-200 font-medium text-sm w-fit lg:text-base hover:bg-gray-50 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>

        {/* Overlay for dropdowns */}
        {(themeDropdown || profileDropdown) && (
          <div
            className="fixed inset-0 z-20"
            onClick={() => {
              setThemeDropdown(false);
              setProfileDropdown(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HomeNavbar;
