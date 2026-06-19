"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UserPlus,
  Download,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

const UserManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  const filters = ["All", "Active", "Pending KYC", "Flagged", "Suspended"];

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      let status = "";
      let kycStatus = "";
      if (activeFilter === "Active") status = "active";
      else if (activeFilter === "Suspended") status = "suspended";
      else if (activeFilter === "Flagged") status = "banned";
      else if (activeFilter === "Pending KYC") kycStatus = "pending";

      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pagination.itemsPerPage);
      if (searchQuery) params.append("search", searchQuery);
      if (status) params.append("status", status);
      if (kycStatus) params.append("kycStatus", kycStatus);

      const res = await axiosInstance.get(`/admin/users?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        setUsers(res.data.data.users);
        setPagination(res.data.data.pagination);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchQuery, pagination.itemsPerPage]);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const updateUserStatus = async (userId, updates) => {
    try {
      const res = await axiosInstance.patch(
        `/admin/users/${userId}/status`,
        updates,
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(res.data.message, "success");
        fetchUsers(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Action failed", "error");
    }
  };

  const approveKyc = async (userId) => {
    try {
      const res = await axiosInstance.patch(
        `/admin/users/${userId}/kyc`,
        { status: "approved" },
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(res.data.message, "success");
        fetchUsers(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "KYC approval failed", "error");
    }
  };

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
    document.body.style.overflow = "auto";
  };

  const handleAction = (action, user) => {
    if (action === "suspend") {
      if (confirm(`Suspend user ${user.fullName || user.firstName}?`)) {
        updateUserStatus(user.id, { isSuspended: true });
      }
    } else if (action === "ban") {
      if (confirm(`Ban user ${user.fullName || user.firstName} permanently?`)) {
        updateUserStatus(user.id, { isBanned: true });
      }
    } else if (action === "approveKYC") {
      approveKyc(user.id);
    } 
  };

  // Excel Export Function
  const exportToExcel = async () => {
    setExporting(true);
    try {
      // Fetch all users for export (without pagination)
      let status = "";
      let kycStatus = "";
      if (activeFilter === "Active") status = "active";
      else if (activeFilter === "Suspended") status = "suspended";
      else if (activeFilter === "Flagged") status = "banned";
      else if (activeFilter === "Pending KYC") kycStatus = "pending";

      const params = new URLSearchParams();
      params.append("page", 1);
      params.append("limit", 999999); // Get all users
      if (searchQuery) params.append("search", searchQuery);
      if (status) params.append("status", status);
      if (kycStatus) params.append("kycStatus", kycStatus);
      params.append("export", "true");

      const res = await axiosInstance.get(`/admin/users?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        const allUsers = res.data.data.users;
        
        // Prepare data for Excel
        const excelData = allUsers.map((user, index) => ({
          "SL No": index + 1,
          "Full Name": user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          "First Name": user.firstName || "",
          "Last Name": user.lastName || "",
          "Phone": user.phone,
          "Email": user.email || "N/A",
          "Role": user.role || "user",
          "Plan": user.selectedPlan || "Bronze",
          "Level": user.level || 1,
          "Total Saved (৳)": user.totalSaved || 0,
          "Total Deposits": user.totalDeposits || 0,
          "Total Withdrawals": user.totalWithdrawals || 0,
          "KYC Status": user.kycStatus === "approved" ? "Approved" : user.kycStatus === "pending" ? "Pending" : "Rejected",
          "Account Status": user.isBanned ? "Banned" : user.isSuspended ? "Suspended" : user.accountActive ? "Active" : "Inactive",
          "Division": user.division || "N/A",
          "District": user.district || "N/A",
          "Occupation": user.occupation || "N/A",
          "Income": user.income || "N/A",
          "Referral Code": user.referralCode || "N/A",
          "Joined Date": new Date(user.createdAt).toLocaleDateString("en-GB"),
          "Last Login": user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("en-GB") : "Never",
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        
        // Set column widths
        const colWidths = [
          { wch: 8 },   // SL No
          { wch: 25 },  // Full Name
          { wch: 15 },  // First Name
          { wch: 15 },  // Last Name
          { wch: 15 },  // Phone
          { wch: 25 },  // Email
          { wch: 10 },  // Role
          { wch: 12 },  // Plan
          { wch: 8 },   // Level
          { wch: 15 },  // Total Saved
          { wch: 15 },  // Total Deposits
          { wch: 15 },  // Total Withdrawals
          { wch: 12 },  // KYC Status
          { wch: 15 },  // Account Status
          { wch: 15 },  // Division
          { wch: 15 },  // District
          { wch: 20 },  // Occupation
          { wch: 12 },  // Income
          { wch: 15 },  // Referral Code
          { wch: 12 },  // Joined Date
          { wch: 12 },  // Last Login
        ];
        worksheet["!cols"] = colWidths;

        // Style the header row
        const range = XLSX.utils.decode_range(worksheet["!ref"]);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const address = XLSX.utils.encode_col(C) + "1";
          if (!worksheet[address]) continue;
          worksheet[address].s = {
            font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "059669" }, patternType: "solid" },
            alignment: { horizontal: "center", vertical: "center" }
          };
        }

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users List");

        // Add summary sheet
        const summaryData = [
          ["Report Generated", new Date().toLocaleString()],
          ["Filter Applied", activeFilter],
          ["Search Query", searchQuery || "None"],
          ["Total Users", allUsers.length],
          ["Active Users", allUsers.filter(u => u.accountActive && !u.isBanned && !u.isSuspended).length],
          ["Pending KYC", allUsers.filter(u => u.kycStatus === "pending").length],
          ["Banned Users", allUsers.filter(u => u.isBanned).length],
          ["Suspended Users", allUsers.filter(u => u.isSuspended).length],
        ];
        
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
        summarySheet["!cols"] = [{ wch: 20 }, { wch: 30 }];
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

        // Generate Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        
        // Download file
        const fileName = `amanah-users-${new Date().toISOString().split("T")[0]}.xlsx`;
        saveAs(blob, fileName);
        
        showToastMessage(`✅ Exported ${allUsers.length} users successfully!`, "success");
      }
    } catch (error) {
      console.error("Export error:", error);
      showToastMessage("❌ Failed to export users", "error");
    } finally {
      setExporting(false);
    }
  };

  const getBadgeClass = (type, color) => {
    const classes = {
      ok: "bg-green-500/20 dark:bg-green-500/30 text-green-500 dark:text-green-400",
      warn: "bg-amber-500/20 dark:bg-amber-500/30 text-amber-500 dark:text-amber-400",
      info: "bg-blue-500/20 dark:bg-blue-500/30 text-blue-500 dark:text-blue-400",
      danger: "bg-red-500/20 dark:bg-red-500/30 text-red-500 dark:text-red-400",
      primary: "bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-light",
      warning: "bg-amber-500/20 dark:bg-amber-500/30 text-amber-500 dark:text-amber-400",
      gray: "bg-gray-500/20 dark:bg-gray-500/30 text-gray-500 dark:text-gray-400",
      purple: "bg-purple-500/20 dark:bg-purple-500/30 text-purple-500 dark:text-purple-400",
    };
    return classes[color] || classes.ok;
  };

  const getKycDisplay = (kycStatus) => {
    if (kycStatus === "approved") return { label: "✅ Verified", color: "ok" };
    if (kycStatus === "pending") return { label: "⚠️ Pending", color: "warn" };
    return { label: "🔄 In Review", color: "info" };
  };

  const getStatusDisplay = (user) => {
    if (user.isBanned) return { label: "🚫 Banned", color: "danger" };
    if (user.isSuspended) return { label: "⏸️ Suspended", color: "warning" };
    if (!user.accountActive) return { label: "⏳ Inactive", color: "gray" };
    if (user.kycStatus === "pending") return { label: "KYC Review", color: "info" };
    return { label: "Active", color: "ok" };
  };

  const getPlanDisplay = (plan) => {
    const map = {
      gold: { emoji: "🥇", label: "Gold", color: "warn" },
      silver: { emoji: "🥈", label: "Silver", color: "info" },
      platinum: { emoji: "💎", label: "Platinum", color: "purple" },
      bronze: { emoji: "🥉", label: "Bronze", color: "gray" },
    };
    return map[plan?.toLowerCase()] || map.bronze;
  };

  const getAvatarBg = (index) => {
    const colors = [
      "from-primary to-primary-light",
      "from-blue-500 to-purple-500",
      "from-red-500 to-orange-500",
      "from-purple-500 to-indigo-500",
      "from-green-500 to-teal-500",
      "from-pink-500 to-rose-500",
    ];
    return colors[index % colors.length];
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return "৳0";
    return `৳${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-lg font-bold text-foreground">👥 User Management</h2>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background/80 dark:bg-background/60 backdrop-blur-sm">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder="Search by name, phone, NID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers(1)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); fetchUsers(1); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-primary to-primary-light text-white border-primary shadow-lg shadow-primary/20"
                  : "border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm text-foreground/60 hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {filter}
            </button>
          ))}
          <button
            onClick={exportToExcel}
            disabled={exporting}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
          >
            {exporting ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download size={12} /> Export Excel
              </>
            )}
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-border/50 dark:border-border/30 bg-background/80 dark:bg-background/60">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Member</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Total Saved</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">KYC</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Joined</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-sm text-foreground/50">
                        No users found
                       </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => {
                      const kyc = getKycDisplay(user.kycStatus);
                      const status = getStatusDisplay(user);
                      const plan = getPlanDisplay(user.selectedPlan);
                      const avatar = user.firstName?.[0]?.toUpperCase() || "?";
                      return (
                        <tr key={user.id} className="border-b border-border/50 dark:border-border/30 last:border-0 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getAvatarBg(idx)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                {avatar}
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-foreground">{user.fullName || `${user.firstName} ${user.lastName || ""}`.trim()}</div>
                                <div className="text-xs text-foreground/50">{user.email || "No email"}</div>
                              </div>
                            </div>
                           </td>
                          <td className="px-4 py-3 text-sm text-foreground">{user.phone}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(plan.label, plan.color)}`}>
                              {plan.emoji} {plan.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-primary">{formatCurrency(user.totalSaved)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(kyc.label, kyc.color)}`}>
                              {kyc.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(status.label, status.color)}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-foreground/50">{formatDate(user.createdAt)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => openUserModal(user)} className="p-1.5 rounded-lg border border-border/60 dark:border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300" title="View">
                                <Eye size={14} className="text-foreground/70" />
                              </button>
                              {user.isBanned ? (
                                <button onClick={() => handleAction("suspend", user)} className="p-1.5 rounded-lg border border-green-500/30 text-green-500 hover:bg-green-500/10 transition-all duration-300" title="Unban">
                                  <CheckCircle size={14} />
                                </button>
                              ) : user.kycStatus === "pending" ? (
                                <button onClick={() => handleAction("approveKYC", user)} className="p-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300" title="Approve KYC">
                                  <CheckCircle size={14} />
                                </button>
                              ) : (
                                <button onClick={() => handleAction("suspend", user)} className="p-1.5 rounded-lg border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all duration-300" title="Suspend">
                                  <XCircle size={14} />
                                </button>
                              )}
                              {!user.isBanned && (
                                <button onClick={() => handleAction("ban", user)} className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all duration-300" title="Ban">
                                  <Ban size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-border/50 dark:border-border/30 bg-background/80 dark:bg-background/60">
              <div className="text-xs text-foreground/50">
                Showing {users.length} of {pagination.totalItems} members
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchUsers(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                  className="px-3 py-1 rounded-lg border border-border/60 dark:border-border/40 text-xs font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => fetchUsers(page)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        pagination.currentPage === page
                          ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20"
                          : "border border-border/60 dark:border-border/40 hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => fetchUsers(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-3 py-1 rounded-lg border border-border/60 dark:border-border/40 text-xs font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* User Modal - DARKER */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeUserModal}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white relative">
                <button onClick={closeUserModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300">✕</button>
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getAvatarBg(0)} flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg`}>
                    {selectedUser.firstName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="text-xl font-bold">{selectedUser.fullName || `${selectedUser.firstName} ${selectedUser.lastName || ""}`.trim()}</div>
                  <div className="text-sm text-white/80">{selectedUser.phone} · {selectedUser.email || "No email"}</div>
                  <div className="flex gap-2 mt-3 flex-wrap justify-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20">{getPlanDisplay(selectedUser.selectedPlan).label} Member</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20">{getKycDisplay(selectedUser.kycStatus).label}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20">{getStatusDisplay(selectedUser).label}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5">
                  <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">Account Overview</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">Total Savings</div>
                      <div className="text-lg font-bold text-primary">{formatCurrency(selectedUser.totalSaved)}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">Total Deposits</div>
                      <div className="text-lg font-bold text-foreground">{selectedUser.totalDeposits || 0}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">Total Withdrawals</div>
                      <div className="text-lg font-bold text-foreground">{selectedUser.totalWithdrawals || 0}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">Level</div>
                      <div className="text-lg font-bold text-foreground">{selectedUser.level || 1}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">Member Since</div>
                      <div className="text-sm font-semibold text-foreground">{formatDate(selectedUser.createdAt)}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">Last Login</div>
                      <div className="text-sm font-semibold text-foreground">{formatDate(selectedUser.lastLogin)}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">Division</div>
                      <div className="text-sm font-semibold text-foreground">{selectedUser.division || "N/A"}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">Referral Code</div>
                      <div className="text-sm font-semibold text-foreground">{selectedUser.referralCode || "N/A"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border/50 dark:border-border/30 flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">📧 Message</button>
                <button onClick={() => { handleAction("suspend", selectedUser); closeUserModal(); }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300">⏸️ Suspend</button>
                <button onClick={() => { handleAction("ban", selectedUser); closeUserModal(); }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300">🚫 Ban</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center backdrop-blur-sm ${
              toast.type === "error" ? "bg-red-500/90" : toast.type === "warning" ? "bg-amber-500/90" : toast.type === "info" ? "bg-blue-500/90" : "bg-green-500/90"
            } text-white`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagementPage;