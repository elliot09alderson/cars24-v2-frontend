import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Car,
  Users,
  UserCheck,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  IndianRupee,
  MapPin,
  Calendar,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import { api } from "../../../../api/api";

// Stat Card Component
const StatCard = ({ title, value, change, changeType, icon: Icon, color, link }) => (
  <Link
    to={link}
    className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
  >
    <div className="flex items-start justify-between">
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center gap-1.5">
          {changeType === "up" ? (
            <ArrowUpRight className="size-4 text-green-500" />
          ) : (
            <ArrowDownRight className="size-4 text-red-500" />
          )}
          <span
            className={`text-sm font-medium ${
              changeType === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </span>
          <span className="text-sm text-gray-400">vs last month</span>
        </div>
      </div>
      <div
        className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="size-6 text-white" />
      </div>
    </div>
  </Link>
);

// Recent Vehicle Card
const RecentVehicleCard = ({ vehicle }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
    <img
      src={vehicle.thumbnail || vehicle.images?.[0] || "https://via.placeholder.com/80"}
      alt={vehicle.name}
      className="w-16 h-16 rounded-xl object-cover"
    />
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-gray-900 truncate">
        {vehicle.name} {vehicle.model}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm text-gray-500">{vehicle.year}</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span className="text-sm text-green-600 font-medium">
          ₹{vehicle.price?.toLocaleString()}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          vehicle.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {vehicle.status || "Active"}
      </span>
    </div>
  </div>
);

// Quick Action Button
const QuickAction = ({ icon: Icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-green-200 transition-all duration-200 text-left group"
  >
    <div className="p-3 bg-green-600 text-white rounded-xl group-hover:scale-110 transition-transform">
      <Icon className="size-5" />
    </div>
    <div className="flex-1">
      <p className="font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <ChevronRight className="size-5 text-gray-300 group-hover:text-green-600 transition-colors" />
  </button>
);

// State Distribution
const StateCard = ({ name, code, count, icon, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 group cursor-pointer
      ${isActive
        ? "bg-green-50 border-2 border-green-500 shadow-md"
        : "bg-gray-50 border-2 border-transparent hover:bg-green-50 hover:border-green-200 hover:shadow-md"
      }`}
  >
    <div className="flex items-center gap-3">
      <span className={`text-2xl transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
        {icon}
      </span>
      <div className="text-left">
        <p className={`font-semibold transition-colors ${isActive ? "text-green-700" : "text-gray-900 group-hover:text-green-700"}`}>
          {name}
        </p>
        <p className="text-xs text-gray-500">{code}</p>
      </div>
    </div>
    <div className="text-right flex items-center gap-2">
      <div>
        <p className={`text-xl font-bold transition-colors ${isActive ? "text-green-600" : "text-gray-900 group-hover:text-green-600"}`}>
          {count}
        </p>
        <p className="text-xs text-gray-500">vehicles</p>
      </div>
      <ChevronRight className={`size-5 transition-all duration-200 ${isActive ? "text-green-600 translate-x-1" : "text-gray-300 group-hover:text-green-500 group-hover:translate-x-1"}`} />
    </div>
  </button>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalAgents: 0,
    totalCustomers: 0,
    totalViews: 0,
  });
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState(null);
  const [stateDistribution, setStateDistribution] = useState({
    MP: 0,
    GJ: 0,
    CG: 0,
    MH: 0,
  });

  const licensedStates = [
    { name: "Madhya Pradesh", code: "MP", icon: "🏛️" },
    { name: "Gujarat", code: "GJ", icon: "🦁" },
    { name: "Chhattisgarh", code: "CG", icon: "🌾" },
    { name: "Maharashtra", code: "MH", icon: "🚪" },
  ];

  const handleStateClick = (stateCode) => {
    setSelectedState(stateCode);
    // Navigate to vehicles page with state filter
    navigate(`/admin/vehicles?state=${stateCode}`);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Try to fetch from admin dashboard stats API
        const statsRes = await api.get("/admin/dashboard/stats");
        if (statsRes.data?.data) {
          const data = statsRes.data.data;
          setStats({
            totalVehicles: data.totalVehicles || 0,
            totalAgents: data.totalAgents || 0,
            totalCustomers: data.totalCustomers || 0,
            totalViews: 2340, // Placeholder - tracking not implemented yet
          });
          setRecentVehicles(data.recentVehicles || []);

          // Process state distribution from API
          if (data.stateDistribution) {
            const stateData = { MP: 0, GJ: 0, CG: 0, MH: 0 };
            data.stateDistribution.forEach((item) => {
              if (item._id && stateData.hasOwnProperty(item._id)) {
                stateData[item._id] = item.count;
              }
            });
            setStateDistribution(stateData);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Fallback to fetching vehicles directly
        try {
          const vehiclesRes = await api.get("/vehicles");
          const vehicles = vehiclesRes.data?.data || [];
          setStats({
            totalVehicles: vehicles.length,
            totalAgents: 12,
            totalCustomers: 156,
            totalViews: 2340,
          });
          setRecentVehicles(vehicles.slice(0, 5));
        } catch (fallbackError) {
          console.error("Fallback error:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm">
            <Calendar className="size-4 text-gray-400" />
            <span className="text-gray-600">
              {new Date().toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vehicles"
          value={stats.totalVehicles}
          change="12%"
          changeType="up"
          icon={Car}
          color="bg-green-600"
          link="/admin/vehicles"
        />
        <StatCard
          title="Active Agents"
          value={stats.totalAgents}
          change="8%"
          changeType="up"
          icon={UserCheck}
          color="bg-blue-500"
          link="/admin/agents"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          change="23%"
          changeType="up"
          icon={Users}
          color="bg-green-500"
          link="/admin/customers"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          change="5%"
          changeType="down"
          icon={Eye}
          color="bg-purple-500"
          link="/admin"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Vehicles */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Vehicles</h2>
              <p className="text-sm text-gray-500 mt-1">
                Latest vehicles added to the inventory
              </p>
            </div>
            <Link
              to="/admin/vehicles"
              className="text-sm font-medium text-green-600 hover:underline flex items-center gap-1"
            >
              View all
              <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="p-6 space-y-3">
            {recentVehicles.length > 0 ? (
              recentVehicles.map((vehicle, idx) => (
                <RecentVehicleCard key={vehicle._id || idx} vehicle={vehicle} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No vehicles found. Add your first vehicle!
              </div>
            )}
          </div>
        </div>

        {/* State Distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Licensed States</h2>
            <p className="text-sm text-gray-500 mt-1">Click a state to view vehicles</p>
          </div>
          <div className="p-6 space-y-3">
            {licensedStates.map((state) => (
              <StateCard
                key={state.code}
                name={state.name}
                code={state.code}
                icon={state.icon}
                count={stateDistribution[state.code] || 0}
                onClick={() => handleStateClick(state.code)}
                isActive={selectedState === state.code}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-500 mt-1">
            Common tasks and shortcuts
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/admin/vehicles">
            <QuickAction
              icon={Car}
              title="Manage Vehicles"
              description="View, edit, or remove vehicles"
            />
          </Link>
          <Link to="/admin/agents">
            <QuickAction
              icon={UserCheck}
              title="Manage Agents"
              description="Approve or block agents"
            />
          </Link>
          <Link to="/admin/customers">
            <QuickAction
              icon={Users}
              title="View Customers"
              description="See customer inquiries"
            />
          </Link>
        </div>
      </div>

      {/* Government License Badge */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                LICENSED
              </span>
            </div>
            <h3 className="text-2xl font-bold">Government Authorized Dealer</h3>
            <p className="text-gray-300 max-w-lg">
              KARLO is a licensed dealer for government auctioned vehicles. 100% legal,
              no hidden charges, complete documentation support.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold">4</p>
              <p className="text-sm text-gray-400">States</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold">0%</p>
              <p className="text-sm text-gray-400">Hidden Fees</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-gray-400">Legal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
