import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { admin_logout } from "../../../../rtk/slices/authSlice";
import {
  LayoutDashboard,
  Car,
  Users,
  UserCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Shield,
  Loader2,
  ArrowLeft,
  Palette,
  Check,
} from "lucide-react";
import logo from "/logo/karlo.png";
import { api } from "../../../../api/api";
import { useTheme, themes } from "../../../context/ThemeContext";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);
  const { theme, setTheme, currentTheme } = useTheme();

  const themeOptions = [
    { key: "green", name: "Green", color: "bg-green-600" },
    { key: "white", name: "Light", color: "bg-gray-300" },
    { key: "black", name: "Dark", color: "bg-zinc-800" },
  ];

  // Dynamic theme classes
  const getSidebarBg = () => {
    switch (theme) {
      case "green":
        return "bg-gradient-to-b from-green-700 to-green-800";
      case "white":
        return "bg-gradient-to-b from-gray-100 to-gray-200";
      case "black":
        return "bg-gradient-to-b from-zinc-900 to-black";
      default:
        return "bg-gradient-to-b from-green-700 to-green-800";
    }
  };

  const getSidebarTextColor = () => {
    switch (theme) {
      case "white":
        return "text-gray-700";
      default:
        return "text-white";
    }
  };

  const getActiveNavClass = () => {
    switch (theme) {
      case "green":
        return "bg-white text-green-700";
      case "white":
        return "bg-gray-800 text-white";
      case "black":
        return "bg-white text-zinc-900";
      default:
        return "bg-white text-green-700";
    }
  };

  const getInactiveNavClass = () => {
    switch (theme) {
      case "white":
        return "text-gray-600 hover:bg-gray-300 hover:text-gray-900";
      default:
        return "text-gray-100 hover:bg-white/10 hover:text-white";
    }
  };

  const getAccentColor = () => {
    switch (theme) {
      case "green":
        return "bg-green-600 hover:bg-green-700";
      case "white":
        return "bg-gray-700 hover:bg-gray-800";
      case "black":
        return "bg-zinc-700 hover:bg-zinc-600";
      default:
        return "bg-green-600 hover:bg-green-700";
    }
  };

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ vehicles: [], agents: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setSearchLoading(true);
        try {
          // Search vehicles and agents in parallel
          const [vehiclesRes, agentsRes] = await Promise.all([
            api.get(`/vehicles?search=${encodeURIComponent(searchQuery)}`).catch(() => ({ data: { data: [] } })),
            api.get(`/admin/agents?search=${encodeURIComponent(searchQuery)}`).catch(() => ({ data: { data: [] } })),
          ]);

          setSearchResults({
            vehicles: vehiclesRes.data?.data?.slice(0, 5) || [],
            agents: agentsRes.data?.data?.slice(0, 5) || [],
          });
          setShowSearchResults(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSearchResults({ vehicles: [], agents: [] });
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const handleSearchResultClick = (type, item) => {
    setShowSearchResults(false);
    setSearchQuery("");
    if (type === "vehicle") {
      navigate(`/admin/vehicles?highlight=${item._id}`);
    } else if (type === "agent") {
      navigate(`/admin/agents?highlight=${item._id}`);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Vehicles",
      path: "/admin/vehicles",
      icon: Car,
    },
    {
      name: "Agents",
      path: "/admin/agents",
      icon: UserCheck,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: Users,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(admin_logout()).unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    }
    navigate("/admin/login");
  };

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 ${getSidebarBg()} ${getSidebarTextColor()} transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center justify-between h-20 px-6 border-b ${theme === "white" ? "border-gray-300" : "border-white/10"}`}>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="KARLO" className="h-8" />
            <span className={`text-sm font-medium ${theme === "white" ? "text-gray-500" : "text-gray-400"}`}>Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${theme === "white" ? "hover:bg-gray-300" : "hover:bg-white/10"}`}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? `${getActiveNavClass()} font-semibold shadow-lg`
                    : getInactiveNavClass()
                }`}
              >
                <Icon className="size-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${theme === "white" ? "border-gray-300 bg-gray-100" : "border-white/10 bg-black/20"}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
              theme === "white"
                ? "text-red-600 hover:bg-red-100 bg-white"
                : "text-red-300 hover:bg-red-500/20 bg-red-500/10"
            }`}
          >
            <LogOut className="size-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-20 px-6">
            {/* Left - Mobile Menu & Search */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu className="size-6" />
              </button>
              <div className="hidden md:block relative" ref={searchRef}>
                <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2.5 w-80">
                  {searchLoading ? (
                    <Loader2 className="size-5 text-gray-400 animate-spin" />
                  ) : (
                    <Search className="size-5 text-gray-400" />
                  )}
                  <input
                    type="text"
                    placeholder="Search vehicles, agents..."
                    className="bg-transparent flex-1 outline-none text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && (
                  <div className="absolute top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                    {searchResults.vehicles.length === 0 && searchResults.agents.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <Search className="size-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No results found for "{searchQuery}"</p>
                      </div>
                    ) : (
                      <>
                        {/* Vehicles Results */}
                        {searchResults.vehicles.length > 0 && (
                          <div>
                            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                              <p className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                                <Car className="size-3" />
                                Vehicles ({searchResults.vehicles.length})
                              </p>
                            </div>
                            {searchResults.vehicles.map((vehicle) => (
                              <button
                                key={vehicle._id}
                                onClick={() => handleSearchResultClick("vehicle", vehicle)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left"
                              >
                                <img
                                  src={vehicle.thumbnail || vehicle.images?.[0] || "https://via.placeholder.com/40"}
                                  alt={vehicle.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {vehicle.name} {vehicle.model}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {vehicle.year} • ₹{vehicle.price?.toLocaleString()}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Agents Results */}
                        {searchResults.agents.length > 0 && (
                          <div>
                            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                              <p className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                                <UserCheck className="size-3" />
                                Agents ({searchResults.agents.length})
                              </p>
                            </div>
                            {searchResults.agents.map((agent) => (
                              <button
                                key={agent._id}
                                onClick={() => handleSearchResultClick("agent", agent)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left"
                              >
                                <img
                                  src={agent.avatar || `https://ui-avatars.com/api/?name=${agent.name}&background=16a34a&color=fff`}
                                  alt={agent.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{agent.name}</p>
                                  <p className="text-xs text-gray-500 truncate">{agent.email}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  agent.status === "verified"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}>
                                  {agent.status}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right - Theme, Notifications & Profile */}
            <div className="flex items-center gap-2">
              {/* Theme Switcher */}
              <div className="relative">
                <button
                  onClick={() => {
                    setThemeDropdown(!themeDropdown);
                    setProfileDropdown(false);
                  }}
                  className="flex items-center gap-2 p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
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
                            theme === option.key
                              ? "bg-gray-100"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full ${option.color} flex items-center justify-center`}>
                            {theme === option.key && (
                              <Check className="size-3 text-white" />
                            )}
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

              {/* Notifications */}
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="size-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdown(!profileDropdown);
                    setThemeDropdown(false);
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <div className={`w-10 h-10 text-white rounded-xl flex items-center justify-center ${
                    theme === "green" ? "bg-green-600" : theme === "black" ? "bg-zinc-700" : "bg-gray-700"
                  }`}>
                    <Shield className="size-5" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {userInfo?.name || "Admin"}
                    </p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown
                    className={`size-4 text-gray-400 transition-transform ${
                      profileDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{userInfo?.name || "Admin"}</p>
                      <p className="text-sm text-gray-500">{userInfo?.email}</p>
                    </div>
                    <Link
                      to="/admin/settings"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="size-4 text-gray-400" />
                      <span className="text-sm">Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        setProfileDropdown(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="size-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Dropdown Overlay */}
      {(profileDropdown || themeDropdown) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setProfileDropdown(false);
            setThemeDropdown(false);
          }}
        />
      )}

      {/* Floating Back Button */}
      {location.pathname !== "/admin" && (
        <button
          onClick={() => navigate(-1)}
          className={`fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2 px-4 py-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group ${getAccentColor()}`}
          title="Go Back"
        >
          <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}
    </div>
  );
};

export default AdminLayout;
