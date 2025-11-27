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

  const themeOptions = [
    { key: "green", name: "Green", color: "bg-green-600" },
    { key: "white", name: "Light", color: "bg-gray-300" },
    { key: "black", name: "Dark", color: "bg-zinc-800" },
  ];

  async function logout() {
    try {
      await dispatch(customer_logout()).unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    }
    navigate("/");
  }
  return (
    <div>
      <div className="flex fixed top-0 left-0 lg:flex-row flex-col  h-[120px] z-100 w-full backdrop-blur-2xl rounded-b-xl bg-white/50 mt-0 items-center justify-between   lg:px-12 py-5">
        <div className="flex gap-2 ">
          {/* <img src="" alt="logo" /> */}
          <Link to={"/"} className="lg:text-3xl text-lg font-bold">
            <h1> KARLO</h1>
            {/* <img src={karlo} alt="karlo image" className="w-64" /> */}
          </Link>
        </div>
        <div className="flex lg:gap-6  gap-2  text-sm items-center">
          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdown(!themeDropdown)}
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
            className="p-4 lg:px-10  px-8  text-white rounded-xl text-sm lg:text-xl bg-black cursor-pointer"
          >
            Sell
          </Link>
          <Link
            to="/ads"
            className="p-4 lg:px-10 text-white rounded-xl text-sm lg:text-xl bg-black cursor-pointer"
          >
            See Ads
          </Link>
          {userInfo ? (
            <div
              className="p-4   px-5 lg:px-10 text-gray-800 rounded-xl bg-gray-300 font-semibiold lg:text-xl text-sm  cursor-pointer"
              onClick={logout}
            >
              Logout
            </div>
          ) : (
            <Link
              to={"/login"}
              className="p-4 lg:px-10 text-gray-800 rounded-xl bg-gray-300 font-semibiold text-sm w-fit lg:text-xl  cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>

        {/* Overlay for dropdown */}
        {themeDropdown && (
          <div
            className="fixed inset-0 z-20"
            onClick={() => setThemeDropdown(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomeNavbar;
