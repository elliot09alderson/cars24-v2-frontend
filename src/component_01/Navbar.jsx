import { ChevronDown, Menu, Phone, X, MapPin, Car, Store, Palette, Check } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customer_logout } from "../../rtk/slices/authSlice";
import { setFilter } from "../../rtk/slices/vehicleSlice";
import { useTheme } from "../context/ThemeContext";
import logo from "/logo/karlo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((slice) => slice.auth);
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [statesDropdown, setStatesDropdown] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);

  const themeOptions = [
    { key: "green", name: "Green", color: "bg-gray-900" },
    { key: "white", name: "Light", color: "bg-gray-300" },
    { key: "black", name: "Dark", color: "bg-zinc-800" },
  ];

  // Licensed States Data
  const licensedStates = [
    { name: "Madhya Pradesh", code: "MP", icon: "🏛️" },
    { name: "Gujarat", code: "GJ", icon: "🦁" },
    { name: "Chhattisgarh", code: "CG", icon: "🌾" },
    { name: "Maharashtra", code: "MH", icon: "🚪" },
  ];

  const handleStateClick = (stateCode) => {
    dispatch(setFilter({ key: "search", value: stateCode }));
    navigate("/ads");
    setStatesDropdown(false);
    setMobileMenu(false);
  };

  async function logout() {
    setOpen(false);
    try {
      await dispatch(customer_logout()).unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    }
    navigate("/");
  }

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 backdrop-blur-xl rounded-2xl bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className="h-10 lg:h-12 w-auto" src={logo} alt="KARLO" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {/* States Dropdown */}
            <div className="relative">
              <button
                onClick={() => setStatesDropdown(!statesDropdown)}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                <MapPin className="size-4" />
                <span className="font-medium">Our Locations</span>
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${
                    statesDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {statesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Licensed States
                    </p>
                  </div>
                  {licensedStates.map((state) => (
                    <button
                      key={state.code}
                      onClick={() => handleStateClick(state.code)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all duration-200 group"
                    >
                      <span className="text-xl">{state.icon}</span>
                      <div className="text-left">
                        <p className="font-semibold">{state.name}</p>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300">
                          Cars in {state.code}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy Cars Link */}
            <Link
              to="/ads"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <Car className="size-4" />
              <span className="font-medium">Buy Cars</span>
            </Link>

            {/* Sell Cars Link */}
            <Link
              to="/agent/post/vehicle"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <Store className="size-4" />
              <span className="font-medium">Sell Cars</span>
            </Link>

            {/* Call Button */}
            <a
              href="tel:+918770800807"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold transition-all duration-300 shadow-lg shadow-gray-600/30 hover:shadow-gray-600/50"
            >
              <Phone className="size-4" />
              <span>8770800807</span>
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => {
                  setThemeDropdown(!themeDropdown);
                  setStatesDropdown(false);
                  setOpen(false);
                }}
                className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
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
                        {theme === option.key && (
                          <span className="ml-auto text-xs text-gray-400">Active</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Agent My Ads Button */}
            {userInfo && userInfo.role === "agent" && (
              <Link
                to="/agent/myAds"
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
              >
                My Ads
              </Link>
            )}

            {/* User Menu */}
            {userInfo ? (
              <div className="relative">
                <div
                  onClick={() => setOpen(!open)}
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
                {open && (
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
                      onClick={() => setOpen(false)}
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
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl font-medium text-gray-700 border-2 border-gray-200 hover:border-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl font-medium bg-gray-900 text-white hover:bg-black transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {mobileMenu ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden mt-2 mx-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="px-4 py-4 space-y-2">
            {/* States Section */}
            <div className="pb-3 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Our Licensed Locations
              </p>
              <div className="grid grid-cols-2 gap-2">
                {licensedStates.map((state) => (
                  <button
                    key={state.code}
                    onClick={() => handleStateClick(state.code)}
                    className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-900 hover:text-white transition-all duration-200"
                  >
                    <span>{state.icon}</span>
                    <span className="font-medium text-sm">{state.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <Link
              to="/ads"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-200"
            >
              <Car className="size-5" />
              <span className="font-medium">Buy Cars</span>
            </Link>

            <Link
              to="/agent/post/vehicle"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-200"
            >
              <Store className="size-5" />
              <span className="font-medium">Sell Cars</span>
            </Link>

            {/* Call Button */}
            <a
              href="tel:+918770800807"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-900 text-white font-semibold"
            >
              <Phone className="size-5" />
              <span>Call: 8770800807</span>
            </a>

            {/* Theme Switcher for Mobile */}
            <div className="pb-3 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Theme
              </p>
              <div className="flex gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setTheme(option.key);
                      setMobileMenu(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                      theme === option.key
                        ? "bg-gray-200 ring-2 ring-gray-400"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${option.color}`}></div>
                    <span className="text-sm font-medium">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Buttons for Mobile */}
            {!userInfo && (
              <div className="flex gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="flex-1 text-center py-3 rounded-xl font-medium border-2 border-gray-600 text-orange-500"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenu(false)}
                  className="flex-1 text-center py-3 rounded-xl font-medium bg-gray-900 text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay for dropdowns */}
      {(statesDropdown || open || themeDropdown) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setStatesDropdown(false);
            setOpen(false);
            setThemeDropdown(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
