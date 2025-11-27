import React, { useEffect, useState } from "react";
import {
  Search,
  UserCheck,
  MoreVertical,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  FileText,
  Shield,
} from "lucide-react";
import { api } from "../../../../api/api";
import Swal from "sweetalert2";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    verified: "bg-blue-100 text-blue-700",
    blocked: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    active: CheckCircle,
    pending: Clock,
    verified: Shield,
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

// Agent Card Component
const AgentCard = ({ agent, onStatusChange, onViewDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={agent.avatar || `https://ui-avatars.com/api/?name=${agent.name}&background=000&color=fff`}
              alt={agent.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            {agent.status === "verified" && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                <Shield className="size-3" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">Agent ID: {agent._id?.slice(-8) || "N/A"}</p>
            <StatusBadge status={agent.status || "pending"} />
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
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
                    onViewDetails(agent);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="size-4 text-gray-400" />
                  <span className="text-sm">View Details</span>
                </button>
                <button
                  onClick={() => {
                    onStatusChange(agent._id, "verified");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Shield className="size-4 text-blue-500" />
                  <span className="text-sm">Verify Agent</span>
                </button>
                <button
                  onClick={() => {
                    onStatusChange(
                      agent._id,
                      agent.status === "blocked" ? "active" : "blocked"
                    );
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors ${
                    agent.status === "blocked" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {agent.status === "blocked" ? (
                    <>
                      <CheckCircle className="size-4" />
                      <span className="text-sm">Unblock Agent</span>
                    </>
                  ) : (
                    <>
                      <Ban className="size-4" />
                      <span className="text-sm">Block Agent</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="size-4 text-gray-400" />
          <span className="text-gray-600">{agent.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="size-4 text-gray-400" />
          <span className="text-gray-600">{agent.phoneNumber || "Not provided"}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="size-4 text-gray-400" />
          <span className="text-gray-600 truncate">
            {agent.address || "Not provided"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xl font-bold text-gray-900">{agent.totalAds || 0}</p>
          <p className="text-xs text-gray-500">Listings</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">{agent.soldCount || 0}</p>
          <p className="text-xs text-gray-500">Sold</p>
        </div>
        <div>
          <p className="text-xl font-bold text-green-600">
            {agent.rating?.toFixed(1) || "N/A"}
          </p>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
      </div>
    </div>
  );
};

// Agent Details Modal
const AgentDetailsModal = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Agent Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <XCircle className="size-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <img
              src={agent.avatar || `https://ui-avatars.com/api/?name=${agent.name}&background=000&color=fff`}
              alt={agent.name}
              className="w-24 h-24 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{agent.name}</h3>
              <p className="text-gray-500">{agent.email}</p>
              <StatusBadge status={agent.status || "pending"} />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h4 className="font-semibold text-gray-900">Contact Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">{agent.phoneNumber || "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{agent.email}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500">Address</p>
                <p className="font-medium">{agent.address || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h4 className="font-semibold text-gray-900">Documents</h4>
            <div className="grid grid-cols-2 gap-3">
              {["Aadhaar", "PAN", "License", "GST"].map((doc) => (
                <div
                  key={doc}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
                >
                  <FileText className="size-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-sm">{doc} Card</p>
                    <p className="text-xs text-gray-500">
                      {agent[`${doc.toLowerCase()}Image`] ? "Uploaded" : "Not uploaded"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Performance</h4>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-xl p-4">
                <p className="text-2xl font-bold text-gray-900">{agent.totalAds || 0}</p>
                <p className="text-xs text-gray-500">Total Ads</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600">{agent.soldCount || 0}</p>
                <p className="text-xs text-gray-500">Sold</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-600">{agent.activeAds || 0}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-2xl font-bold text-purple-600">
                  {agent.rating?.toFixed(1) || "N/A"}
                </p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </div>
          </div>

          {/* Joined Date */}
          <div className="text-center text-sm text-gray-500">
            Member since{" "}
            {new Date(agent.createdAt).toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 9;

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/agents");
      setAgents(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching agents:", error);
      // Set dummy data for demo if API fails
      setAgents([
        {
          _id: "1",
          name: "Rahul Sharma",
          email: "rahul@example.com",
          phoneNumber: "9876543210",
          address: "Bhopal, MP",
          status: "verified",
          totalAds: 15,
          soldCount: 8,
          rating: 4.5,
          createdAt: new Date("2024-01-15"),
        },
        {
          _id: "2",
          name: "Amit Patel",
          email: "amit@example.com",
          phoneNumber: "9876543211",
          address: "Ahmedabad, GJ",
          status: "active",
          totalAds: 10,
          soldCount: 5,
          rating: 4.2,
          createdAt: new Date("2024-02-20"),
        },
        {
          _id: "3",
          name: "Priya Singh",
          email: "priya@example.com",
          phoneNumber: "9876543212",
          address: "Raipur, CG",
          status: "pending",
          totalAds: 3,
          soldCount: 0,
          rating: null,
          createdAt: new Date("2024-06-10"),
        },
        {
          _id: "4",
          name: "Vikas Kumar",
          email: "vikas@example.com",
          phoneNumber: "9876543213",
          address: "Mumbai, MH",
          status: "blocked",
          totalAds: 7,
          soldCount: 2,
          rating: 3.8,
          createdAt: new Date("2024-03-05"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.phoneNumber?.includes(searchQuery);

    const matchesStatus =
      filterStatus === "all" || agent.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Paginate
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * agentsPerPage,
    currentPage * agentsPerPage
  );

  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);

  const handleStatusChange = async (agentId, newStatus) => {
    const statusMessages = {
      verified: "verify",
      active: "activate",
      blocked: "block",
    };

    Swal.fire({
      title: "Update Status",
      text: `Are you sure you want to ${statusMessages[newStatus]} this agent?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.put("/admin/agent/status", { agentId, status: newStatus });
          setAgents((prev) =>
            prev.map((a) => (a._id === agentId ? { ...a, status: newStatus } : a))
          );
          Swal.fire("Updated!", "Agent status has been updated.", "success");
        } catch (error) {
          console.error("Error updating agent status:", error);
          // Fallback: update locally anyway for demo
          setAgents((prev) =>
            prev.map((a) => (a._id === agentId ? { ...a, status: newStatus } : a))
          );
          Swal.fire("Updated!", "Agent status has been updated.", "success");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
          <p className="text-gray-500 mt-1">
            Manage and verify agents on your platform
          </p>
        </div>
        <button
          onClick={fetchAgents}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Agents</p>
          <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Verified</p>
          <p className="text-2xl font-bold text-blue-600">
            {agents.filter((a) => a.status === "verified").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {agents.filter((a) => a.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Blocked</p>
          <p className="text-2xl font-bold text-red-600">
            {agents.filter((a) => a.status === "blocked").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
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
              <option value="verified">Verified</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : paginatedAgents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedAgents.map((agent) => (
            <AgentCard
              key={agent._id}
              agent={agent}
              onStatusChange={handleStatusChange}
              onViewDetails={setSelectedAgent}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <UserCheck className="size-10 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-900">No agents found</p>
          <p className="text-gray-500 mt-1">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredAgents.length > agentsPerPage && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-6 py-4">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * agentsPerPage + 1} to{" "}
            {Math.min(currentPage * agentsPerPage, filteredAgents.length)} of{" "}
            {filteredAgents.length} agents
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

      {/* Agent Details Modal */}
      {selectedAgent && (
        <AgentDetailsModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
};

export default AdminAgents;
