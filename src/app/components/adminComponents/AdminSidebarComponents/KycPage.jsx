"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Check,
  X,
  Ban,
  FileText,
  Loader2,
} from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://server-amanah-savings.onrender.com/api";

const KycPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  const filters = ["All", "Pending", "Approved", "Rejected"];

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchApplications = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pagination.itemsPerPage);
      if (searchQuery) params.append("search", searchQuery);
      if (activeFilter !== "All") params.append("status", activeFilter.toLowerCase());

      const res = await axios.get(`${API_BASE}/admin/kyc?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        setApplications(res.data.data.applications);
        setPagination(res.data.data.pagination);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Failed to fetch KYC applications", "error");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchQuery, pagination.itemsPerPage]);

  useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications]);

  const updateKycStatus = async (userId, status, rejectionReason = null) => {
    try {
      const payload = { status };
      if (rejectionReason) payload.rejectionReason = rejectionReason;
      const res = await axios.patch(
        `${API_BASE}/admin/users/${userId}/kyc`,
        payload,
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(res.data.message, "success");
        fetchApplications(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "KYC update failed", "error");
    }
  };

  const banUser = async (userId, name) => {
    if (!confirm(`Ban user ${name} permanently?`)) return;
    try {
      const res = await axios.patch(
        `${API_BASE}/admin/users/${userId}/status`,
        { isBanned: true },
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(`🚫 User banned permanently`, "error");
        fetchApplications(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Ban failed", "error");
    }
  };

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const viewDocuments = (kyc) => {
    setSelectedKyc(kyc);
    setShowDocModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeDocModal = () => {
    setShowDocModal(false);
    setSelectedKyc(null);
    document.body.style.overflow = "auto";
  };

  const getBadgeClass = (type, color) => {
    const classes = {
      ok: "bg-green-500/10 text-green-500",
      warn: "bg-amber-500/10 text-amber-500",
      info: "bg-blue-500/10 text-blue-500",
      danger: "bg-red-500/10 text-red-500",
      primary: "bg-primary/10 text-primary",
      warning: "bg-amber-500/10 text-amber-500",
      blue: "bg-blue-500/10 text-blue-500",
      amber: "bg-amber-500/10 text-amber-500",
      red: "bg-red-500/10 text-red-500",
    };
    return classes[color] || classes.ok;
  };

  const getKycStatusDisplay = (status) => {
    if (status === "approved") return { label: "✅ Approved", color: "ok" };
    if (status === "rejected") return { label: "❌ Rejected", color: "danger" };
    return { label: "⏳ Pending", color: "warn" };
  };

  const getAvatarBg = (index) => {
    const colors = [
      "from-primary to-primary-light",
      "from-amber-500 to-orange-500",
      "from-red-500 to-orange-500",
      "from-blue-500 to-purple-500",
      "from-green-500 to-teal-500",
    ];
    return colors[index % colors.length];
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / (1000 * 60 * 60));
    if (diff < 1) return "Just now";
    if (diff < 24) return `${diff} hrs ago`;
    if (diff < 48) return "Yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">🪪 KYC Review Queue</h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">
            {pagination.totalItems} Pending
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder="Search member..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchApplications(1)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); fetchApplications(1); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeFilter === filter
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* KYC Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Applicant</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">NID Number</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Submitted</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">KYC Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Account</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-foreground/50">
                        No KYC applications found
                      </td>
                    </tr>
                  ) : (
                    applications.map((kyc, idx) => {
                      const status = getKycStatusDisplay(kyc.kycStatus);
                      const avatar = kyc.firstName?.[0]?.toUpperCase() || "?";
                      return (
                        <tr key={kyc.id} className="border-b border-border last:border-0 hover:bg-primary/5 transition">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full bg-linear-to-r ${getAvatarBg(idx)} flex items-center justify-center text-white font-bold text-sm`}>
                                {avatar}
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-foreground">{kyc.fullName || `${kyc.firstName} ${kyc.lastName || ""}`.trim()}</div>
                                <div className="text-xs text-foreground/50">{kyc.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground font-mono">{kyc.nidNumber || "N/A"}</td>
                          <td className="px-4 py-3 text-xs text-foreground/50">{formatDate(kyc.kycSubmittedAt || kyc.createdAt)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(status.label, status.color)}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${kyc.accountActive ? getBadgeClass("Active", "ok") : getBadgeClass("Inactive", "gray")}`}>
                              {kyc.accountActive ? "🟢 Active" : "⚪ Inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs font-semibold text-foreground/70 capitalize">{kyc.selectedPlan}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => viewDocuments(kyc)} className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:border-primary transition" title="View Documents">
                                📄 View
                              </button>
                              {kyc.kycStatus !== "approved" && (
                                <button onClick={() => updateKycStatus(kyc.id, "approved")} className="px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition">
                                  ✓ Approve
                                </button>
                              )}
                              {kyc.kycStatus !== "rejected" && (
                                <button onClick={() => {
                                  const reason = prompt("Enter rejection reason:");
                                  if (reason !== null) updateKycStatus(kyc.id, "rejected", reason);
                                }} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition">
                                  ✗ Reject
                                </button>
                              )}
                              <button onClick={() => banUser(kyc.id, kyc.fullName || kyc.firstName)} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition">
                                🚫 Ban
                              </button>
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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-border">
              <div className="text-xs text-foreground/50">
                Showing {applications.length} of {pagination.totalItems} applications
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchApplications(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                  className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition disabled:opacity-50"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => fetchApplications(page)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        pagination.currentPage === page
                          ? "bg-linear-to-r from-primary to-primary-light text-white border-none"
                          : "border border-border hover:border-primary"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => fetchApplications(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {showDocModal && selectedKyc && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={closeDocModal}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">Document Viewer</h3>
                  <button onClick={closeDocModal} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition">✕</button>
                </div>
                <p className="text-sm text-foreground/60 mt-1">{selectedKyc.fullName || selectedKyc.firstName}</p>
                <p className="text-xs text-foreground/50">NID: {selectedKyc.nidNumber || "N/A"}</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <div className="text-5xl mb-2">🪪</div>
                  <div className="font-semibold text-foreground">NID Card</div>
                  <div className="text-xs text-foreground/50 mt-1">Front & Back</div>
                  <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                    {selectedKyc.nidFrontUrl ? (
                      <img src={selectedKyc.nidFrontUrl} alt="NID Front" className="w-full h-32 object-contain rounded-lg" />
                    ) : (
                      <div className="h-32 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-foreground/50">
                        <FileText size={32} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <div className="text-5xl mb-2">🤳</div>
                  <div className="font-semibold text-foreground">Selfie Photo</div>
                  <div className="text-xs text-foreground/50 mt-1">Live capture</div>
                  <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                    {selectedKyc.selfieUrl ? (
                      <img src={selectedKyc.selfieUrl} alt="Selfie" className="w-full h-32 object-contain rounded-lg" />
                    ) : (
                      <div className="h-32 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-foreground/50">
                        <FileText size={32} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-border flex gap-3">
                <button
                  onClick={() => { updateKycStatus(selectedKyc.id, "approved"); closeDocModal(); }}
                  className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold"
                >
                  ✓ Approve KYC
                </button>
                <button
                  onClick={() => {
                    const reason = prompt("Enter rejection reason:");
                    if (reason !== null) { updateKycStatus(selectedKyc.id, "rejected", reason); closeDocModal(); }
                  }}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/70 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  ✗ Reject
                </button>
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
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center ${
              toast.type === "error" ? "bg-red-500" : toast.type === "warning" ? "bg-amber-500" : "bg-green-500"
            } text-white`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KycPage;
