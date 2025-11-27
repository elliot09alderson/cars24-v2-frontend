import React, { useEffect, useState } from "react";
import {
  Search,
  Users,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  MoreVertical,
  XCircle,
  User,
} from "lucide-react";
import { api } from "../../../../api/api";

// Customer Row Component
const CustomerRow = ({ customer, onViewDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}&background=000&color=fff`}
            alt={customer.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">{customer.name}</p>
            <p className="text-sm text-gray-500">ID: {customer._id?.slice(-8) || "N/A"}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Mail className="size-4 text-gray-400" />
          <span className="text-sm text-gray-600">{customer.email}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-gray-400" />
          <span className="text-sm text-gray-600">{customer.phoneNumber || "Not provided"}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          {new Date(customer.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            customer.isActive !== false
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.isActive !== false ? "Active" : "Inactive"}
        </span>
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
                <button
                  onClick={() => {
                    onViewDetails(customer);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="size-4 text-gray-400" />
                  <span className="text-sm">View Details</span>
                </button>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

// Customer Details Modal
const CustomerDetailsModal = ({ customer, onClose }) => {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Customer Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <XCircle className="size-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <img
              src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}&background=000&color=fff&size=96`}
              alt={customer.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
              <p className="text-gray-500">{customer.email}</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium">{customer.phoneNumber || "Not provided"}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  customer.isActive !== false
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {customer.isActive !== false ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Member Since</span>
              <span className="font-medium">
                {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-500">Customer ID</span>
              <span className="font-mono text-sm">{customer._id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/customers");
      setCustomers(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      // Set dummy data for demo if API fails
      setCustomers([
        {
          _id: "cust1",
          name: "Sanjay Verma",
          email: "sanjay@example.com",
          phoneNumber: "9876543220",
          isActive: true,
          createdAt: new Date("2024-02-10"),
        },
        {
          _id: "cust2",
          name: "Neha Gupta",
          email: "neha@example.com",
          phoneNumber: "9876543221",
          isActive: true,
          createdAt: new Date("2024-03-15"),
        },
        {
          _id: "cust3",
          name: "Rajesh Kumar",
          email: "rajesh@example.com",
          phoneNumber: "9876543222",
          isActive: true,
          createdAt: new Date("2024-04-20"),
        },
        {
          _id: "cust4",
          name: "Anita Shah",
          email: "anita@example.com",
          phoneNumber: "9876543223",
          isActive: false,
          createdAt: new Date("2024-01-05"),
        },
        {
          _id: "cust5",
          name: "Vikram Singh",
          email: "vikram@example.com",
          phoneNumber: "9876543224",
          isActive: true,
          createdAt: new Date("2024-05-12"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phoneNumber?.includes(searchQuery)
    );
  });

  // Paginate
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">
            View and manage customer accounts
          </p>
        </div>
        <button
          onClick={fetchCustomers}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {customers.filter((c) => c.isActive !== false).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-2xl font-bold text-blue-600">
            {
              customers.filter((c) => {
                const thisMonth = new Date();
                const customerDate = new Date(c.createdAt);
                return (
                  customerDate.getMonth() === thisMonth.getMonth() &&
                  customerDate.getFullYear() === thisMonth.getFullYear()
                );
              }).length
            }
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Joined
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
                {paginatedCustomers.map((customer) => (
                  <CustomerRow
                    key={customer._id}
                    customer={customer}
                    onViewDetails={setSelectedCustomer}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Users className="size-10 text-gray-400" />
            </div>
            <p className="text-lg font-semibold text-gray-900">No customers found</p>
            <p className="text-gray-500 mt-1">
              Try adjusting your search criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredCustomers.length > customersPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * customersPerPage + 1} to{" "}
              {Math.min(currentPage * customersPerPage, filteredCustomers.length)} of{" "}
              {filteredCustomers.length} customers
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium">
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

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default AdminCustomers;
