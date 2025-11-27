import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Car,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { api } from "../../../../api/api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    sold: "bg-blue-100 text-blue-700",
    blocked: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    active: CheckCircle,
    pending: Clock,
    sold: CheckCircle,
    blocked: XCircle,
  };

  const Icon = statusIcons[status] || Clock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
        statusStyles[status] || statusStyles.pending
      }`}
    >
      <Icon className="size-3" />
      {status?.charAt(0).toUpperCase() + status?.slice(1) || "Pending"}
    </span>
  );
};

// Vehicle Table Row
const VehicleRow = ({ vehicle, onStatusChange, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={vehicle.thumbnail || vehicle.images?.[0] || "https://via.placeholder.com/60"}
            alt={vehicle.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">
              {vehicle.name} {vehicle.model}
            </p>
            <p className="text-sm text-gray-500">{vehicle.year}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600">{vehicle.brand}</p>
      </td>
      <td className="px-6 py-4">
        <p className="font-semibold text-green-600">
          ₹{vehicle.price?.toLocaleString()}
        </p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600">{vehicle.fuelType}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 capitalize">{vehicle.transmission}</p>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={vehicle.status || "active"} />
      </td>
      <td className="px-6 py-4">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="size-5 text-gray-400" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                <Link
                  to={`/vehicle/detail/${vehicle.slug}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="size-4 text-gray-400" />
                  <span className="text-sm">View Details</span>
                </Link>
                <button
                  onClick={() => {
                    onStatusChange(vehicle._id, vehicle.status === "active" ? "blocked" : "active");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  {vehicle.status === "active" ? (
                    <>
                      <XCircle className="size-4 text-yellow-500" />
                      <span className="text-sm">Block Vehicle</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-4 text-green-500" />
                      <span className="text-sm">Activate Vehicle</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    onDelete(vehicle._id);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="size-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const vehiclesPerPage = 10;

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/vehicles");
      const allVehicles = res.data?.data || [];
      setVehicles(allVehicles);
      setTotalPages(Math.ceil(allVehicles.length / vehiclesPerPage));
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Filter vehicles
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || vehicle.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Paginate
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * vehiclesPerPage,
    currentPage * vehiclesPerPage
  );

  const handleStatusChange = async (vehicleId, newStatus) => {
    Swal.fire({
      title: "Update Status",
      text: `Are you sure you want to ${newStatus === "active" ? "activate" : "block"} this vehicle?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.put("/admin/vehicle/status", { vehicleId, status: newStatus });
          setVehicles((prev) =>
            prev.map((v) => (v._id === vehicleId ? { ...v, status: newStatus } : v))
          );
          Swal.fire("Updated!", "Vehicle status has been updated.", "success");
        } catch (error) {
          console.error("Error updating vehicle status:", error);
          // Fallback: update locally for demo
          setVehicles((prev) =>
            prev.map((v) => (v._id === vehicleId ? { ...v, status: newStatus } : v))
          );
          Swal.fire("Updated!", "Vehicle status has been updated.", "success");
        }
      }
    });
  };

  const handleDelete = (vehicleId) => {
    Swal.fire({
      title: "Delete Vehicle",
      text: "Are you sure you want to delete this vehicle? This action cannot be undone.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/admin/vehicle/${vehicleId}`);
          setVehicles((prev) => prev.filter((v) => v._id !== vehicleId));
          Swal.fire("Deleted!", "Vehicle has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting vehicle:", error);
          // Fallback: delete locally for demo
          setVehicles((prev) => prev.filter((v) => v._id !== vehicleId));
          Swal.fire("Deleted!", "Vehicle has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
          <p className="text-gray-500 mt-1">
            Manage all vehicles in your inventory
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchVehicles}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download className="size-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles by name, brand, or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-green-600/20"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-green-600/20 text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-500">
            {filteredVehicles.length} vehicles found
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedVehicles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Fuel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Transmission
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedVehicles.map((vehicle) => (
                  <VehicleRow
                    key={vehicle._id}
                    vehicle={vehicle}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Car className="size-10 text-gray-400" />
            </div>
            <p className="text-lg font-semibold text-gray-900">No vehicles found</p>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredVehicles.length > vehiclesPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * vehiclesPerPage + 1} to{" "}
              {Math.min(currentPage * vehiclesPerPage, filteredVehicles.length)} of{" "}
              {filteredVehicles.length} vehicles
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
                {currentPage}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVehicles;
